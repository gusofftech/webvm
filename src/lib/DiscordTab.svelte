<script>
	import PanelButton from './PanelButton.svelte';
	import DiscordPresenceCount from 'labs/packages/astro-theme/components/nav/DiscordPresenceCount.svelte'
</script>

<h1 class="text-lg font-bold">Discord</h1>
<PanelButton buttonImage="assets/discord-mark-blue.svg" clickUrl="https://discord.gg/99np87gD" buttonText="Приєднатись до Discord">
	<i class='fas fa-circle fa-xs ml-auto text-green-500'></i>
	<span class="ml-1"><DiscordPresenceCount /></span>
</PanelButton>

<p>Є питання по лабораторіям Cyber Dojo чи хакінгу загалом?</p>
<p>Заходь у нашу спільноту — тут ти отримаєш підтримку, поради та нові ідеї від інших нетренерів.</p>
