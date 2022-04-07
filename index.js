const isSvg = require("is-svg");
const nanofy = require("nanosvg");
const tmp = require("tmp");
const fs = require("fs");
const path = require("path");

module.exports = (options) => (buffer) => {
	return new Promise((resolve) => {
		if (!isSvg(buffer)) {
			return resolve(buffer);
		}

		if (Buffer.isBuffer(buffer)) {
			buffer = buffer.toString();
		}

		// "what the hell are they doing here, you ask", I ask vecta.io the same - Part I
		// nanofy expects the input, AND output paths to be relative to the current directory
		// it simply refuses to take absolute paths, such as /tmp
		const inputFile = tmp.fileSync({
			tmpdir: "./",
			postfix: ".svg",
		});
		const outputDir = tmp.dirSync({ tmpdir: "./", unsafeCleanup: true }).name;

		// nanofy doesn't accept buffers as direct input, so we need to create a temporary file it can read from
		// very efficient.
		fs.writeSync(inputFile.fd, buffer);

		// "what the hell are they doing here, you ask", I ask vecta.io the same - Part II
		// The promise of "nanofy" below resolves BEFORE the output file is actually written, forcing us to watch manually for an output
		fs.watch(outputDir, {}, (eventType, fileName) => {
			if (eventType === "rename") {
				const result = fs.readFileSync(path.join(outputDir, fileName));
				// since we can't write to /tmp, we need to force a cleanup of the temp files
				tmp.setGracefulCleanup();
				resolve(Buffer.from(result));
			}
		});

		nanofy(
			path.basename(inputFile.name),
			path.join("./", path.basename(outputDir)),
			options
		).then(() => {});
	});
};
