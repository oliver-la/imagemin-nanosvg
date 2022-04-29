# imagemin-nanosvg

> [nanosvg](https://vecta.io/nano) plugin

**WARNING**: You need a valid license which you can purchase from vecta.io/nano to use this.
Be sure to activate your license using "npx nanosvg --activate=LICENSE"

## Install

```
$ npm install @oliver-la/imagemin-nanosvg
```

## Usage

```js
import imagemin from "imagemin";
import imageminNanoSvg from "@oliver-la/imagemin-nanosvg";

(async () => {
	await imagemin(["images/*.svg"], {
		destination: "build/images",
		plugins: [
			imageminNanoSvg({
				precision: 3, // Set the number of decimal places to compress for numerical values, defaults to 3.
				fonts: true, // Enable the embedding of fonts, defaults to true. If enabled, will embed fonts into the SVG, if text and fonts are detected. Fonts must be available on Google fonts.
				classes: false, // Do not modify your classes in the SVG, defaults to false.
				ids: false, // Do not modify your id(s) in the SVG, defaults to false.
				structure: false, // Do not modify your structure in the SVG, defaults to false.
				events: false, // Do not modify your events in the SVG, defaults to false.
				wordpress: false, // Export as WordPress-compatible SVG, defaults to false.
				react: false, // Export as React SVG component in JSX file format, defaults to false.
				// font_path: 'assets/fonts'
			}),
		],
	});

	console.log("Images optimized");
})();
```

## API

### imageminNanoSvg([options])(buffer)

Returns a `Promise<Buffer>`.

#### options

Type: `Object`

Pass options to [nano](https://www.npmjs.com/package/nanosvg).

#### buffer

Type: `Buffer`

Buffer to optimize.

## License

MIT © [imagemin](https://github.com/imagemin)
