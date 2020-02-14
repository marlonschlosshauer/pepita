const pepita = require("./pepita.js");

if(window != undefined) {
	window.onload = function WindowLoad(event) {
		pepita.run(document);
	}
}
