document.body.addEventListener("click", function (e) {
	const elem = e.target;
	if (elem.tagName !== "A") {
		return;
	}
	const href = elem.getAttribute("href");
	if (href[0] === "/" && !href.startsWith("/chan") && href != "/") {
		e.preventDefault();
		window.location.href = "https://staszic.waw.pl" + href;
	}
});