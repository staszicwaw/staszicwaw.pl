import { sqlAll } from "../db/util";
import { db } from "../db";
import express from "express";
import { IPost } from "../types/chan";
import { formatDate } from "../other/util";

export const path = "/chan";
export const method = "get";

export async function handler(req: express.Request, res: express.Response) {
	let currPage = req.query.page ? parseInt(req.query.page as string) : 1;
	const numPages = 1;

	const posts = await sqlAll("SELECT * FROM posts ORDER BY id DESC LIMIT 10 OFFSET ?", [(currPage - 1) * 10]) as IPost[];
	const formatedPosts: IPost[] = [];

	for (const post of posts) {
		formatedPosts.push({
			...post,
			date: formatDate(new Date(parseInt(post.date)))
		});
	}

	res.render("chan", {
		currPage: currPage,
		numPages: numPages,
		posts: formatedPosts,
	});
}