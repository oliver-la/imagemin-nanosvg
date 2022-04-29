const isSvg = require("is-svg");
const nanofy = require("nanosvg");

module.exports = (options) => async (buffer) => {
	if (!isSvg(buffer)) {
		return Promise.resolve(buffer);
	}

	if (!Buffer.isBuffer(buffer)) {
		buffer = Buffer.from(buffer, "utf8");
	}

	return nanofy(buffer, null, { silent: true, ...options }).catch((res) => {
		if (res) {
			console.log(res.error || res.message);
		}
	});
};
