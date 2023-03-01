import { Database } from "sqlite3";
import { createTables } from "./createTables";

export let db: Database;

export function init() {
	db = new Database("./data/db.sqlite3");

	createTables();
}