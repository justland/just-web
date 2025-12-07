/**
 * Type of Fetch API.
 *
 * This improves over the default signature.
 *
 * The `Request` class has the same problem,
 * but it is not possible to fix from outside.
 * Use the `new Request(url|string, init?)` signature.
 *
 * ```ts
 * fetch('http://abc.com', { method: 'POST' })
 * fetch(new Request('http://abc.com', { method: 'POST' }))
 * ```
 */
export interface Fetch {
	(input: Request): Promise<Response>
	(input: string | URL, init?: RequestInit): Promise<Response>
}
