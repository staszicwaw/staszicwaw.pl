import express from "express";
import path from "path";
import process from "process";
import fs from "fs";
import https from "https";
import http from "http";
import config from "./config.json";
import { getAllFiles } from "./other/util";
import { IRoute } from "./types/routes";
import bodyParser from "body-parser";
import { parse } from "node-html-parser";
import fetch from "node-fetch";
import cron from "cron";

export let articles = "";
export const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src", "views"));
app.use("/static", express.static(path.join(process.cwd(), "src", "static")));

app.use(bodyParser.urlencoded());

async function fetchArticles() {
	console.log("Fetching articles from staszic.waw.pl...");
	const html = await fetch("https://staszic.waw.pl");
	const text = await html.text();
	const root = parse(text);
	const arts = root.querySelectorAll("article");

	for (const article of arts) {
		articles += article.outerHTML;
	}
}

async function main() {
	fetchArticles();

	new cron.CronJob("0 0 * * *", fetchArticles, null, true, "Europe/Warsaw");
	
	for (const file of getAllFiles(`${__dirname}/routes`)) {
		const route: IRoute = await import(file); // very poor scalability but idc

		if (!route.path || !route.method || !route.handler) {
			console.error(`Invalid route: ${file}`);
			return;
		}

		app[route.method](route.path, route.handler);
	}

	const server = http.createServer(app);
	server.listen(config.port, () => {
		console.log(`HTTP server running on port ${config.port}`);
	});
	if (config.https) {
		const credentials = {
			key: fs.readFileSync(config.httpsKey),
			cert: fs.readFileSync(config.httpsCert),
		};
		const httpsServer = https.createServer(credentials, app);
		httpsServer.listen(config.httpsPort, () => {
			console.log(`HTTPS server running on port ${config.httpsPort}`);
		});
	}
}

main();