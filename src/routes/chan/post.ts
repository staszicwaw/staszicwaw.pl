import express from "express";
import { prisma } from "../../db";
import {formatDate} from "../../other/util";

export const path = "/chan/:id";
export const method = "get";


export async function handler(req: express.Request, res: express.Response) {
    const id = req.params.id;

    if (!parseInt(id)) {
        return res.redirect('/chan');
    }

    const post = await prisma.post.findUnique({
        where: {
            id: parseInt(id)
        }
    })

    if (post == null) {
        return res.redirect('/chan');
    }

    const formattedPost = {
        ...post,
        date: formatDate(post.date)
    }

    res.render("chanPost", {
        post: formattedPost,
    });
}
