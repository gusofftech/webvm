const color= "\x1b[1;35m";       // magenta bold
const underline= "\x1b[94;4m";   // blue underline
const normal= "\x1b[0m";

export const introMessage = [
	"+~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~+",
	"|                                                                             |",
	"|  Cyber Dojo — Linux PrivEsc Quest                                           |",
	"|                                                                             |",
	"|  This is a sandboxed Linux environment running fully in your browser.       |",
	"|  No backend, no excuses — just you, the shell, and privilege escalation.    |",
	"|                                                                             |",
	"|  🥷 Learn how attackers think. Explore misconfigs, abuse SUID, break sudo.   |",
	"|                                                                             |",
	"+~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~+",
	"",
	"   Welcome, netrunner. If unsure, try these moves:",
	"",
	"     cat /etc/shadow             # (world-readable in this dojo)",
	"     sudo find / -name flag.txt  # sudo misconfig included",
	"     nano /tmp/sneaky.sh         # note: nano has SUID bit ;)",
	"     nice /bin/bash              # nice way to escalate",
	"     cowsay 'hack the planet'    # style matters too",
	""
];

export const errorMessage = [
	color + "Cyber Dojo VM could not start" + normal,
	"",
	"Check the DevTools console for more information",
	"",
	"Works best on recent desktop versions of Chrome, Edge, Firefox or Safari",
	"",
	"Give it a try from a desktop browser!",
	"",
	"Internal dojo error message is:",
	""
];

export const unexpectedErrorMessage = [
	color + "Cyber Dojo VM encountered an unexpected error" + normal,
	"",
	"Check the DevTools console for further information",
	"",
	"Please consider reporting this bug at: " + underline + "https://t.me/cyber_dojo" + normal,
	"",
	"Internal dojo error message is:",
	""
];
