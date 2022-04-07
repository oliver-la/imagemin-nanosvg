const test = require("ava");
const imageminNanoSvg = require("./index.js");

test("optimize a SVG", async (t) => {
	const data = (
		await imageminNanoSvg()(
			'<svg><rect class="MyClass" x="0" y="0" width="50" height="50"/></svg>'
		)
	).toString();

	t.is(
		data,
		'<svg xmlns="http://www.w3.org/2000/svg"><path d="M0 0h50v50H0z"/></svg>'
	);
});

test("support SVGO options", async (t) => {
	const data = (
		await imageminNanoSvg({
			classes: true,
		})('<svg><rect class="MyClass" x="0" y="0" width="50" height="50"/></svg>')
	).toString();

	t.is(
		data,
		'<svg xmlns="http://www.w3.org/2000/svg"><path class="MyClass" d="M0 0h50v50H0z"/></svg>'
	);
});

test("ignore non valid SVG", async (t) => {
	t.is(await imageminNanoSvg()("<html></html>"), "<html></html>");
});
