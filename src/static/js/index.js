$("a").click(function(event) {
	const href = $(this).attr("href");
	if (href[0] === "/" && !href.beginsWith("/chan")) {
		event.preventDefault();
		window.location.href = "https://staszic.waw.pl" + href;
	}
});