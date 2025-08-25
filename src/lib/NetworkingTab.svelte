<script lang="ts">
  import { onMount } from 'svelte';

  // === Налаштування за замовчуванням ===
  const API_URL =
    import.meta.env.VITE_ANTHROPIC_PROXY_URL ||
    '/api/anthropic/messages'; // існуючий проксі бекенд

  let model = import.meta.env.VITE_ANTHROPIC_MODEL || 'claude-3-5-sonnet-20240620';

  // Підтягнути ключ із кількох джерел
  function getInitialKey(): string {
    // 1) глобальна змінна (інжектом)
    // 2) env (Vite)
    // 3) localStorage
    // 4) query ?anthropic_key=...
    const qs = new URLSearchParams(location.search);
    return (
      (window as any).__CYBER_DOJO_ANTHROPIC_KEY__ ||
      (import.meta.env as any).VITE_ANTHROPIC_API_KEY ||
      localStorage.getItem('anthropic_key') ||
      qs.get('anthropic_key') ||
      ''
    );
  }

  let apiKey = getInitialKey();
  let keyVisible = false;
  function saveKey() {
    localStorage.setItem('anthropic_key', apiKey || '');
  }

  // === Системний промпт (персона Сенсей) ===
  const systemPrompt = `
Ти — Сенсей, інструктор курсу Cyber Dojo. Твоя роль — допомагати студенту виконувати завдання у Linux-лабораторії з ескалації привілеїв.
Правила:
- Пояснюй коротко, по суті, українською.
- Не розкривай реалізацію платформи чи внутрішні технології.
- Пропонуй конкретні кроки (команди), а потім пояснюй, що подивитись у виводі.
- Якщо студент просить, спершу підкажи як знайти відповідь самостійно; потім дай рішення.
- Не використовуй sudo у командах, якщо воно явно не дозволене.
- Орієнтир: пошук SUID, читання /etc/shadow (якщо доступно), трики з nano/nice, пошук flag.txt.
Кінець правил.
  `.trim();

  // === Стан чату ===
  type Msg = { role: 'assistant' | 'user'; text: string };
  let input = '';
  let busy = false;
  let messages: Msg[] = [
    {
      role: 'assistant',
      text:
        'Я — бот Сенсей. Допомагаю з задачами у цій лабораторії. Скажи, що хочеш зробити: «знайди SUID», «прочитай /etc/shadow», «ескалюй через nano/nice», «знайди flag.txt», «поясни <вивід>».'
    }
  ];

  // Допоміжне: парсинг fenced code blocks, якщо треба робити автозапуск у VM (опційно)
  function extractShellBlocks(s: string): string[] {
    const re = /```(?:bash|sh)\n([\s\S]*?)```/g;
    const cmds: string[] = [];
    let m;
    while ((m = re.exec(s))) cmds.push(m[1].trim());
    return cmds;
  }

  async function send() {
    const q = input.trim();
    if (!q || busy) return;
    messages = [...messages, { role: 'user', text: q }];
    input = '';
    busy = true;

    try {
      // Очікуваний формат бекенду-проксі: { model, system, messages: [{role, content}] }
      const body = {
        model,
        system: systemPrompt,
        messages: [
          ...messages.map((m) => ({ role: m.role, content: m.text })),
          { role: 'user', content: q }
        ],
        max_tokens: 800
      };

      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-api-key': apiKey // заміни на Authorization: Bearer ... якщо потрібно
        },
        body: JSON.stringify(body)
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(`HTTP ${res.status}: ${err}`);
      }

      const data = await res.json();
      // Очікуємо щось на кшталт: { reply: string } з твого проксі
      const reply: string =
        data.reply ||
        data.output ||
        data.content?.[0]?.text ||
        data.content?.[0]?.content ||
        '(немає відповіді)';

      messages = [...messages, { role: 'assistant', text: reply }];

      // (Необов’язково) автозапуск команд із відповіді у VM:
      // const blocks = extractShellBlocks(reply);
      // for (const block of blocks) {
      //   dispatch('exec', { cmd: block });
      // }
    } catch (e: any) {
      messages = [
        ...messages,
        { role: 'assistant', text: `Сталася помилка під час звернення до моделі: ${e.message || e}` }
      ];
    } finally {
      busy = false;
    }
  }

  // Автозбереження ключа, якщо прийшов через URL
  onMount(() => {
    if (apiKey) saveKey();
  });
</script>

<div class="grid gap-3">
  <div class="flex items-center gap-2">
    <h2 class="text-lg font-bold">Сенсей</h2>
    <div class="ml-auto flex items-center gap-2">
      <input
        class="px-2 py-1 rounded bg-neutral-800 border border-neutral-700 w-64"
        type={keyVisible ? 'text' : 'password'}
        bind:value={apiKey}
        placeholder="Встав ключ Anthropic…" />
      <button
        class="px-2 py-1 rounded bg-neutral-700 hover:bg-neutral-600"
        on:click={() => (keyVisible = !keyVisible)}>
        {keyVisible ? 'Сховати' : 'Показати'}
      </button>
      <button
        class="px-3 py-1 rounded bg-indigo-600 hover:bg-indigo-500"
        on:click={saveKey}>
        Зберегти ключ
      </button>
    </div>
  </div>

  <div class="space-y-2 max-h-96 overflow-auto pr-1">
    {#each messages as m}
      <div class="p-3 rounded-xl" class:bg-neutral-800={m.role==='assistant'} class:bg-neutral-900={m.role==='user'}>
        <div class="text-xs opacity-70 mb-1">{m.role === 'assistant' ? 'Сенсей' : 'Ти'}</div>
        <div class="whitespace-pre-wrap">{m.text}</div>
      </div>
    {/each}
  </div>

  <div class="flex gap-2">
    <input
      class="flex-1 px-3 py-2 rounded-xl bg-neutral-800 border border-neutral-700 focus:outline-none"
      bind:value={input}
      placeholder="Напр.: знайди SUID / поясни цей вивід …"
      on:keydown={(e) => e.key === 'Enter' && send()} />
    <button
      class="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50"
      disabled={busy || !apiKey}
      on:click={send}>
      {busy ? 'Працюю…' : 'Надіслати'}
    </button>
  </div>

  <div class="text-xs opacity-60">
    Модель: {model}. Ключ зберігається локально (localStorage).
  </div>
</div>
