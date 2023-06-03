import delay from 'delay'

export async function throwBrowserError(err: unknown = new Error('some error occurred'), timeout = 100) {
	window.setTimeout(() => {
		throw err
	}, 0)
	await delay(timeout)
	return err
}
