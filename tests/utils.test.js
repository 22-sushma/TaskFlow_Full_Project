import { requireFields } from '../src/utils/validator.js';
test('validator requireFields', () => {
  expect(requireFields({a:1}, ['a']).length).toBe(0);
  expect(requireFields({}, ['a']).length).toBe(1);
});
