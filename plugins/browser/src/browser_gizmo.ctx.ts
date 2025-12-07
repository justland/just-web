export const ctx = {
	sessionStorage,
	localStorage,
	navigator,
	location,
	fetch: globalThis.fetch.bind(globalThis),
	addEventListener: addEventListener.bind(window),
	removeEventListener: removeEventListener.bind(window)
}
