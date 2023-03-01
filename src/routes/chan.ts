import express from "express";
import { formatDate } from "../other/util";
import {prisma} from "../db";
import { Post } from "@prisma/client";
import {IPost} from "../types/chan";

export const path = "/chan";
export const method = "get";

export async function handler(req: express.Request, res: express.Response) {
	let currPage = req.query.page ? parseInt(req.query.page as string) : 1;
	const numPages = 1;

	const posts = await prisma.post.findMany({
		take: 10,
		skip: (currPage - 1) * 10
	})

	const formattedPosts: IPost[] = [];

	for (const post of posts) {
		formattedPosts.push({
			...post,
			date: formatDate(post.date)
		});
	}

	res.render("chan", {
		currPage: currPage,
		numPages: numPages,
		posts: formattedPosts,
	});
}