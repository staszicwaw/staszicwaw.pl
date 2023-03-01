import express from "express";
import { prisma } from "../../db";
import { z } from "zod";

export const path = "/chan/post";
export const method = "post";

const REQUEST_SCHEMA = z.object({
    title: z.string().min(1).max(64).trim(),
    content: z.string().max(2048).trim(),
    author: z.string().min(1).max(32).trim().default("Anonim"),
});

export async function handler(req: express.Request, res: express.Response) {
    const parsedPostResult = REQUEST_SCHEMA.safeParse(req.body);

    if (!parsedPostResult.success) {
        return res.status(400).send("Bad request");
    }

    const data = parsedPostResult.data;

    await prisma.post.create({
        data: {
            ...data,
            date: new Date()
        }
    });

    return res.status(200).send("Successfully created post");
}
