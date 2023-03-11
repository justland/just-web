export interface RoutesConfigOptions {
	/**
	 * The initial route. Default to `/`
	 */
	initialRoute: string
}

export interface Route {
	(): void
}
