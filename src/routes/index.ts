import express from "express";
import { articles } from "..";

export const path = "/";
export const method = "get";

export function handler(req: express.Request, res: express.Response) {
	res.render("staszic", {
		articles: articles
	});
}