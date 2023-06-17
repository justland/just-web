export const ctx = {
	sessionStorage,
	localStorage,
	navigator,
	location,
	fetch,
	addEventListener: addEventListener.bind(window),
	removeEventListener: removeEventListener.bind(window)
}
