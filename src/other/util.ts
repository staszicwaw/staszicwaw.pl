import fs from "fs";
import path from "path";

export function getAllFiles(dir: string): string[] {
	const files = fs.readdirSync(dir);
	const allFiles: string[] = [];
	files.forEach(file => {
		const filePath = path.join(dir, file);
		const stats = fs.statSync(filePath);
		if (stats.isDirectory()) {
			allFiles.push(...getAllFiles(filePath));
		} else {
			allFiles.push(filePath);
		}
	});
	return allFiles;
}

export function formatDate(date: Date): string {
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	let monthName = "";
	switch (month) {
		case 1:
			monthName = "STYCZEŃ";
		break;
		case 2:
			monthName = "LUTY";
		break;
		case 3:
			monthName = "MARZEC";
		break;
		case 4:
			monthName = "KWIECIEŃ";
		break;
		case 5:
			monthName = "MAJ";
		break;
		case 6:
			monthName = "CZERWIEC";
		break;
		case 7:
			monthName = "LIPIEC";
		break;
		case 8:
			monthName = "SIERPIEŃ";
		break;
		case 9:
			monthName = "WRZESIEŃ";
		break;
		case 10:
			monthName = "PAŹDZIERNIK";
		break;
		case 11:
			monthName = "LISTOPAD";
		break;
		case 12:
			monthName = "GRUDZIEŃ";
		break;
	}

	const day = date.getDate();
	const hour = date.getHours();
	const minute = date.getMinutes();
	const second = date.getSeconds();
	
	return `${day} ${monthName} ${year} ${("00" + hour).slice(-2)}:${("00" + minute).slice(-2)}:${("00" + second).slice(-2)}`;
}