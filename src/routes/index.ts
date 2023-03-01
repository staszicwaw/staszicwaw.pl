import express from "express";

export const path = "/";
export const method = "get";

export function handler(req: express.Request, res: express.Response) {
	res.render("staszic");
}