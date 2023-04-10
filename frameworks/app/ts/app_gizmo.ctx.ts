export const ctx = {
	genAppID() {
		return (Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)).substring(0, 15)
	}
}
