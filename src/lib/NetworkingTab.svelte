<script>
	import { networkData, updateButtonData, setDojoAuthKey } from '$lib/network.js';
	import { createEventDispatcher } from 'svelte';
	import PanelButton from './PanelButton.svelte';

	const dispatch = createEventDispatcher();
	const connectionState = networkData.connectionState;
	const exitNode = networkData.exitNode;

	function handleConnect() {
		// старий флоу — як і був
		$connectionState = "DOWNLOADING";
		dispatch('connect');
	}

	// NEW: dojo connect — без редіректів: підставляємо ключ і шлемо подію
	function handleConnectDojo() {
		$connectionState = "DOWNLOADING";
		setDojoAuthKey();
		dispatch('connect', { mode: 'dojo' });
	}

	let buttonData = null;
	$: buttonData = updateButtonData($connectionState, handleConnect);
</script>

<h1 class="text-lg font-bold">Мережа</h1>

<!-- Існуюча кнопка (без змін) -->
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

<!-- NEW: Dojo (auth-key) кнопка, без логіну/редіректу -->
<PanelButton
	buttonImage="assets/tailscale.svg"
	clickHandler={handleConnectDojo}
	clickUrl={null}
	rightClickHandler={null}
	buttonTooltip="Connect with Dojo key (no login)"
	buttonText="Connect to Dojo Network" />

{#if $connectionState == "CONNECTED"}
	<p><span class="font-bold">Статус: </span>підключено. Трафік іде через захищений тунель.</p>
{:else if $connectionState == "DOWNLOADING"}
	<p><span class="font-bold">Статус: </span>встановлення захищеного каналу…</p>
{:else}
	<p><span class="font-bold">Статус: </span>офлайн. Натисни «{buttonData.buttonText}» для підключення.</p>
{/if}

<p>Браузери не надають прямого доступу до сирих TCP/UDP-сокетів, тому використовується безпечний транспорт поверх веб-технологій.</p>
<p>Після підключення середовище зможе звертатися до зовнішніх ресурсів зсередини лаби.</p>
