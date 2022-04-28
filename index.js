const isSvg = require("is-svg");
const nanofy = require("nanosvg");
const fs = require("fs-extra");
const path = require("path");

module.exports = (options) => async (buffer) => {
	if (!isSvg(buffer)) {
		return Promise.resolve(buffer);
	}

	if (Buffer.isBuffer(buffer)) {
		buffer = buffer.toString();
	}

	const envPaths = await import("env-paths");
	const paths = envPaths.default("imagemin-nanosvg");

	// "what the hell are they doing here, you ask", I ask vecta.io the same - Part I
	// nanofy expects the input, AND output paths to be relative to the current directory
	// it simply refuses to take absolute paths, such as /tmp
	const inputFile = path.join(
		paths.temp,
		"input",
		require("crypto").createHash("md5").update(buffer).digest("hex") + ".svg"
	);

	const outputDir = path.join(paths.temp, "output");
	const outputFile = path.join(outputDir, path.basename(inputFile));

	// nanofy doesn't accept buffers as direct input, so we need to create a temporary file it can read from
	// very efficient.
	return await fs
		.outputFile(inputFile, buffer)
		.then(() => fs.ensureDir(outputDir))
		.then(() => nanofy(inputFile, outputDir, { silent: true, ...options }))
		.catch((res) => {
			if (res) {
				console.log(res.error || res.message);
			}
		})
		.then(() => fs.readFile(outputFile))
		.then((data) => {
			return data;
		});
};
