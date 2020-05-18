import { assertStrictEq } from "https://deno.land/std/testing/asserts.ts";
import { camelize } from './camelize.ts';

Deno.test('camelize function', async () => {
    assertStrictEq('thisIsAnExample 🐪🐪🐪', camelize('this is an example'))
})
