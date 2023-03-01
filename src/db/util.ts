import { db } from ".";

export function sqlAll(query: string, params: any[]): Promise<any[]> {
	return new Promise((resolve, reject) => {
		db.all(query, params, (err, rows) => {
			if (err) {
				reject(err);
			} else {
				resolve(rows);
			}
		});
	});
}

export function sqlGet(query: string, params: any[]): Promise<any> {
	return new Promise((resolve, reject) => {
		db.get(query, params, (err, row) => {
			if (err) {
				reject(err);
			} else {
				resolve(row);
			}
		});
	});
}

export function sqlRun(query: string, params: any[]): Promise<void> {
	return new Promise((resolve, reject) => {
		db.run(query, params, (err) => {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	});
}