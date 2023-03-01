import express from "express";
import { prisma } from "../../db";
import {formatDate} from "../../other/util";

export const path = "/chan/post";
export const method = "get";


export async function handler(req: express.Request, res: express.Response) {
    res.render("chanCreate");
}
