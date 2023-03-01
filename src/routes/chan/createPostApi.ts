import express from "express";
import { prisma } from "../../db";
import { z } from "zod";

export const path = "/chan/post";
export const method = "post";

const REQUEST_SCHEMA = z.object({
    title: z.string().min(1).max(64).trim(),
    content: z.string().max(2048).trim(),
    author: z.string().max(32).trim().default("Anonim"),
});

export async function handler(req: express.Request, res: express.Response) {

    try {
        const data = REQUEST_SCHEMA.parse(req.body);

        await prisma.post.create({
            data: {
                // to jest po to aby prisma sie odpierdolila
                title: data.title ?? '',
                content: data.content ?? '',
                author: data.author != '' ? data.author : 'Anonim' ?? '',
                date: new Date()
            }
        });

        return res.redirect('chan');
    } catch (err) {
        return res.render("chanError", { errorMsg: 'Błąd w tworzeniu posta!' })
    }


}
