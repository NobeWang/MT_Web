// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const { remote } = require('electron')

window.electron = require('electron')
function renderInit()
{
  console.log("=============================》》》：这里是render.js       "+window.electron, remote);
}

renderInit();

const fs = require("fs");
const path = require("path");


window.fs = fs;
window.path = path;