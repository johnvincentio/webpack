
/*jshint esnext: true */

'use strict';

require("./style.css");

// require("!style!css!./style.css");

document.writeln("in entry.js.");

document.write(require("./content.js"));

const name = 'Scotch.io';
setTimeout(() => alert(`Hello there from ${name}`), 300);

