import { camelCase } from '../deps.ts'

/**
 * Camelizes Text by camel-casing the provided text 
 * and adding a camel for each camel-case 
 * @example "this is an example" -> "thisIsAnExample 🐪🐪🐪"
 * @param text 
 * @returns text in camelcase
 */

export function camelize(text: string): string {
    const camelText = camelCase(text);
    const camelCount = camelText.match(/[A-Z]/g) || [];

    const camels = Array.from({ length: camelCount.length }).map(
        camel => '🐪'
    ).join('')


    return `${camelText} ${camels}`;
}