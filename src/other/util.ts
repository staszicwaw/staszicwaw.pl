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
	const monthsArr = ["STYCZEŃ", "LUTY", "MARZEC", "KWIECIEŃ", "MAJ", "CZERWIEC", "LIPIEC", "SIERPIEŃ", "WRZESIEŃ", "PAŹDZIERNIK", "LISTOPAD", "GRUDZIEŃ"];

	const year = date.getFullYear();
	const monthName = monthsArr[date.getMonth()] || "";

	const day = date.getDate();
	const hour = date.getHours();
	const minute = date.getMinutes();
	const second = date.getSeconds();

	return `${day} ${monthName} ${year} ${("00" + hour).slice(-2)}:${("00" + minute).slice(-2)}:${("00" + second).slice(-2)}`;
}