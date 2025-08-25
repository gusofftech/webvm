const color= "\x1b[1;35m";       // magenta bold
const underline= "\x1b[94;4m";   // blue underline
const normal= "\x1b[0m";

export const introMessage = [
	"+~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~+",
	"|                                                                             |",
	"|   Cyber Dojo — Лаба з ескалації привілеїв                                   |",
	"|                                                                             |",
	"|   Це ізольоване Linux-середовище, що працює прямо у твоєму браузері.        |",
	"|   Жодного бекенду — лише ти, термінал і техніки підняття прав.              |",
	"|                                                                             |",
	"|   🥷 Думай як атакер: досліджуй конфіги, зловживай SUID, ламай обмеження.   |",
	"|                                                                             |",
	"+~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~+",
	"",
	"   Ласкаво просимо, нетренере. Якщо не впевнений — почни з цих ходів:",
	"",
	"      cat /etc/shadow            # файл shadow відкритий для читання",
	"      nano /tmp/sneaky.sh        # nano має встановлений SUID-біт",
	"      nice /bin/bash             # 'nice' теж допоможе ескалувати",
	"      cowsay 'hack the planet'   # стиль теж має значення ;)",
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
