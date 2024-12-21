export interface AppResponse {
	success: boolean;
	message?: string;
}

export interface AppContext {
	submitPost: (text: string) => Promise<AppResponse>;
}
