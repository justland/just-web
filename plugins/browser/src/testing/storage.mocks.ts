/**
 * Stub localStorage for testing.
 *
 * @example
 * ```ts
 * stubLocalStorage({
 *  setItem() { fail('should not reach') }
 * })
 * ```
 */
export function stubLocalStorage(stub: Partial<Storage>) {
	return new Proxy(localStorage, {
		get(target, p: any) {
			return stub[p] ? stub[p] : target[p]
		}
	})
}

/**
 * Stub sessionStorage for testing.
 *
 * @example
 * ```ts
 * stubSessionStorage({
 *  setItem() { fail('should not reach') }
 * })
 * ```
 */
export function stubSessionStorage(stub: Partial<Storage>) {
	return new Proxy(sessionStorage, {
		get(target, p: any) {
			return stub[p] ? stub[p] : target[p]
		}
	})
}
