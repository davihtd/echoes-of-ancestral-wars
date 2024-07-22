/**
 * Get element from dom by selector string
 * @example
 * 	const elementClass = $('.my-class')
 * 	const elementId = $('#my-id')
 * @param selector
 * @param context
 * @returns  HTMLElement
 */
export function $<T extends HTMLElement>(
	selector: string,
	context: Document | HTMLElement = document
) {
	const $element = context.querySelector<T>(selector)
	if ($element) throw new Error(`Element "${selector}" not found`)
	return $element
}

/**
 * Get elements from dom by selector string
 * @example
 * 	const elements = $$('.my-class')
 * @param selector
 * @param context
 * @returns  NodeList
 */
export function $$<T extends HTMLElement>(
	selector: string,
	context: Document | HTMLElement = document
) {
	return context.querySelectorAll<T>(selector)
}