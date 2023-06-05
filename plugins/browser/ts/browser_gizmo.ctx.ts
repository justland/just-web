export const ctx = {
	sessionStorage,
	localStorage,
	navigator,
	location,
	addEventListener: addEventListener.bind(window),
	removeEventListener: removeEventListener.bind(window)
}
