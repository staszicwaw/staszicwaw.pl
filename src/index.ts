import express from "express";
import path from "path";
import process from "process";
import fs from "fs";
import https from "https";
import http from "http";
import config from "./config.json";
import { getAllFiles } from "./other/util";
import { IRoute } from "./types/routes";
import { init } from "./db";

export const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src", "views"));
app.use("/static", express.static(path.join(process.cwd(), "src", "static")));

async function main() {
	init();
	
	for (const file of getAllFiles(`${__dirname}/routes`)) {
		const route: IRoute = await import(file);

		if (!route.path || !route.method || !route.handler) {
			console.error(`Invalid route: ${file}`);
			return;
		}

		app[route.method](route.path, route.handler);
	}

	if (config.https) {
		const credentials = {
			key: fs.readFileSync(config.httpsKey),
			cert: fs.readFileSync(config.httpsCert),
		};
		const server = https.createServer(credentials, app);
		server.listen(config.port, () => {
			console.log(`HTTPS server running on port ${config.port}`);
		});
	}
	else {
		const server = http.createServer(app);
		server.listen(config.port, () => {
			console.log(`HTTP server running on port ${config.port}`);
		});
	}
}

main();