const color= "\x1b[1;35m";       // magenta bold
const underline= "\x1b[94;4m";   // blue underline
const normal= "\x1b[0m";

export const introMessage = [
	"+~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~+",
	"|                                                                             |",
	"|   Cyber Dojo Basic Box                                                      |",
	"|                                                                             |",
	"|   Це ізольоване Linux-середовище, що працює прямо у твоєму браузері.        |",
	"|   З можливістю підключення до мережі між гравцями Cyber Dojo 🥷             |",
	"|                                                                             |",
	"|   🌙 Зупини подих.                             							   |",
	"|   Кожна команда — як удар пензля                                            |",
	"|   Твоє мистецтво народжується в тиші терміналу                              |",
	"|                                                                             |",
	"+~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~+",
	"",
	"   Ласкаво просимо. Спробуй базові ходи:",
	"",
	"      id                       # дізнайся більше про себе",
	"      nmap 100.81.12.0/24      # знайди інших гравців",
	"      nc -lvnp 1337            # відкрий порт і чекай гостей",
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
