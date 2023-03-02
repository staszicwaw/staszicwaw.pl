$("a").click(function(event) {
	const href = $(this).attr("href");
	if (href[0] === "/" && !href.startsWith("/chan") && href != "/") {
		event.preventDefault();
		window.location.href = "https://staszic.waw.pl" + href;
	}
});