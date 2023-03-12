export function appBuilder({ name }: { name: string }) {
	return {
		async build() {
			return {
				name
			}
		}
	}
}
