'use strict';
module.exports = function (pth, hash) {
	if (arguments.length !== 2) {
		throw new Error('`path` and `hash` required');
	}
	var modifyFilename = require('./modify-filename');
	return modifyFilename(pth, function (filename, ext) {
		return filename + '-' + hash + ext;
	});
};

module.exports.revert = function (pth, hash) {
	if (arguments.length !== 2) {
		throw new Error('`path` and `hash` required');
	}
	var modifyFilename = require('./modify-filename');
	return modifyFilename(pth, function (filename, ext) {
		return filename.replace(new RegExp('-' + hash + '$'), '') + ext;
	});
};
