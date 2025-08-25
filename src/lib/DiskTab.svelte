<script>
	import PanelButton from './PanelButton.svelte';
	import { createEventDispatcher } from 'svelte';
	import { diskLatency } from './activities.js'
	const dispatch = createEventDispatcher();

	let state = "START";

	function handleReset() {
		if (state === "START") state = "CONFIRM";
		else if (state === "CONFIRM") {
			state = "RESETTING";
			dispatch('reset');
		}
	}

	function getButtonText(state) {
		if (state === "START") return "Скинути диск";
		else if (state === "RESETTING") return "Скидання...";
		else return "Скинути диск. Підтвердити?";
	}

	function getBgColor(state) {
		return state === "START" ? undefined : "bg-red-900";
	}

	function getHoverColor(state) {
		return state === "START" ? undefined : "hover:bg-red-700";
	}
</script>

<h1 class="text-lg font-bold">Диск</h1>
<PanelButton
	buttonIcon="fa-solid fa-trash-can"
	clickHandler={handleReset}
	buttonText={getButtonText(state)}
	bgColor={getBgColor(state)}
	hoverColor={getHoverColor(state)}>
</PanelButton>

{#if state == "CONFIRM"}
	<p><span class="font-bold">Увага: </span>середовище буде перезавантажене.</p>
{:else if state == "RESETTING"}
	<p><span class="font-bold">Скидання триває: </span>зачекайте...</p>
{:else}
	<p><span class="font-bold">Затримка дискових операцій: </span>{$diskLatency} мс</p>
{/if}

<p>Всередині — повноцінний Linux. Диск лабораторії ізольований від вашого ПК.</p>
<p>Підтримується файлова система до 2 ГБ; дані підвантажуються за потреби.</p>
<p>Кнопка «Скинути диск» очищає сховище лаби й перезапускає середовище.</p>
