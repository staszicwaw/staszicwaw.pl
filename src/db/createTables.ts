import { db } from ".";

interface IDatabases {
	[name: string]: ITable[]
}

interface ITable {
	name: string;
	columns: {
		name: string,
		type: "NULL" | "INTEGER" | "REAL" | "TEXT" | "BLOB",
		primary?: boolean,
		autoincrement?: boolean,
		canBeNull?: boolean,
		unique?: boolean,
		defaultValue?: any,
		references?: {
			table: string,
			column: string
			onUpdate: "NO ACTION" | "RESTRICT" | "CASCADE" | "SET NULL" | "SET DEFAULT",
			onDelete: "NO ACTION" | "RESTRICT" | "CASCADE" | "SET NULL" | "SET DEFAULT"
		}
	}[]
}

function generateSQL(table: ITable) {
	let sql = `CREATE TABLE IF NOT EXISTS ${table.name} (\n`;
	let foreignKeys = "";
	let i = 1;

	for (const column of table.columns) {
		if (i != 1) {
			sql += ",\n";
		}
		i++;
		sql += `\t${column.name} ${column.type}`;

		if (column.primary) {
			sql += " PRIMARY KEY";
		}
		if (column.autoincrement) {
			sql += " AUTOINCREMENT";
		}
		if (column.unique) {
			sql += " UNIQUE";
		}
		if (!column.canBeNull) {
			sql += " NOT NULL";
		}
		if (column.defaultValue) {
			sql += ` DEFAULT ${column.defaultValue}`;
		}
		
		if (column.references) {
			if (foreignKeys != "")
				foreignKeys += ",\n";
			foreignKeys += `FOREIGN KEY (${column.name})
								REFERENCES ${column.references.table} (${column.references.column})
									ON UPDATE ${column.references.onUpdate}
									ON DELETE ${column.references.onDelete}`;
		}
	}

	if (foreignKeys != "")
		sql += ",\n" + foreignKeys + "\n);";
	else
		sql += "\n);";
	return sql;
}

export function createTables() {
	const databases: IDatabases = {
		"main": [
			{
				name: "posts",
				columns: [
					{
						name: "id",
						type: "INTEGER",
						primary: true,
						autoincrement: true
					},
					{
						name: "title",
						type: "TEXT",
					},
					{
						name: "content",
						type: "TEXT",
					},
					{
						name: "author",
						type: "TEXT",
					},
					{
						name: "date",
						type: "TEXT",
					}
				]
			}
		]
	};

	db.serialize(() => {
		for (const table of databases.main) {
			const sql = generateSQL(table);

			db.run(sql, (err) => {
				if (err) {
					console.log(err);
					console.log(sql);
					process.exit(0);
				}
			});
		}
	});
}