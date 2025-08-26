<script>
	import PanelButton from './PanelButton.svelte';
	import { cpuPercentage } from './activities.js'
</script>

<h1 class="text-lg font-bold">Engine</h1>

<p><span class="font-bold">Віртуальний CPU: </span>{$cpuPercentage}%</p>
<p>Ти працюєш у повноцінному Linux середовищі, яке запускається прямо у браузері.</p>
<p>Тут можна виконувати справжні x86-бінарі, тестувати експлойти і тренувати техніки, не встановлюючи нічого на свій ПК.</p>
<p><em>Це твій особистий тренажер у кібер-додзьо. Використовуй його для практики та експериментів.</em></p>
