<script>
	import { networkData, startLogin, updateButtonData } from '$lib/network.js';
	import { setAuthKey, removeAuthKey, dojoAuthKey } from '$lib/network.js'; // ⬅️ NEW
	import { createEventDispatcher, onMount } from 'svelte';                  // ⬅️ + onMount
	import PanelButton from './PanelButton.svelte';

	const dispatch = createEventDispatcher();
	const connectionState = networkData.connectionState;
	const exitNode = networkData.exitNode;

	// Optional: prefill once with your provided key if nothing saved yet
	const DEFAULT_DOJO_KEY = "tskey-auth-k649fJ4YsA21CNTRL-sAgL4cbsHhdvvadmNwFQhdiCQk7NaVSL"; // ⬅️ NEW
	onMount(() => {
		if (!$dojoAuthKey) {
			// comment this line if you want manual entry only:
			setAuthKey(DEFAULT_DOJO_KEY);
		}
	});

	function handleConnect() {
		connectionState.set("DOWNLOADING");
		dispatch('connect');
	}

	// NEW: connect using auth key; consumer can read networkInterface.authKey
	function handleConnectDojo() {
		connectionState.set("DOWNLOADING");
		dispatch('connect', { mode: 'authkey' });
	}

	let buttonData = null;
	$: buttonData = updateButtonData($connectionState, handleConnect);

	// Simple input model for manual key entry
	let keyInput = "";
</script>

<h1 class="text-lg font-bold">Мережа</h1>

<!-- Existing button (unchanged): "my network" / login-based -->
<PanelButton
	buttonImage="assets/tailscale.svg"
	clickUrl={buttonData.clickUrl}
	clickHandler={buttonData.clickHandler}
	rightClickHandler={buttonData.rightClickHandler}
	buttonTooltip={buttonData.buttonTooltip}
	buttonText={buttonData.buttonText}>
	{#if $connectionState == "CONNECTED"}
		<i
			class='fas fa-circle fa-xs ml-auto {$exitNode ? "text-green-500" : "text-amber-500"}'
			title={$exitNode ? "Готово" : "Без вихідного вузла"}>
		</i>
	{/if}
</PanelButton>

<!-- NEW: dojo network button (auth-key flow) -->
<PanelButton
	buttonImage="assets/tailscale.svg"
	clickHandler={handleConnectDojo}
	clickUrl={null}
	rightClickHandler={null}
	buttonTooltip={$dojoAuthKey ? "Uses saved Dojo key" : "Enter & save your Dojo key below"}
	buttonText="Connect to Dojo Network" />

<!-- NEW: tiny key manager — shows either input+save or remove button -->
{#if !$dojoAuthKey}
	<div class="mt-2 flex gap-2 items-center">
		<input
			class="border rounded px-2 py-1 flex-1"
			type="password"
			placeholder="Enter Dojo auth key (tskey-...)"
			bind:value={keyInput} />
		<button
			class="px-3 py-1 rounded bg-blue-600 text-white"
			on:click={() => { if (keyInput?.trim()) { setAuthKey(keyInput.trim()); keyInput = ""; } }}>
			Save key
		</button>
	</div>
{:else}
	<div class="mt-2">
		<button
			class="px-3 py-1 rounded bg-amber-600 text-white"
			on:click={removeAuthKey}>
			Remove key
		</button>
		<p class="text-sm text-gray-500 mt-1">A Dojo key is saved in your browser. “Connect to Dojo Network” will use it.</p>
	</div>
{/if}

{#if $connectionState == "CONNECTED"}
	<p><span class="font-bold">Статус: </span>підключено. Трафік іде через захищений тунель.</p>
{:else if $connectionState == "DOWNLOADING"}
	<p><span class="font-bold">Статус: </span>встановлення захищеного каналу…</p>
{:else}
	<p><span class="font-bold">Статус: </span>офлайн. Натисни «{buttonData.buttonText}» для підключення.</p>
{/if}

<p>Браузери не надають прямого доступу до сирих TCP/UDP-сокетів, тому використовується безпечний транспорт поверх веб-технологій.</p>
<p>Після підключення середовище зможе звертатися до зовнішніх ресурсів зсередини лаби.</p>
