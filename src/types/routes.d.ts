export interface IRoute {
	path: string,
	method: "get" | "post" | "put" | "delete",
	handler: (req: any, res: any) => void
}