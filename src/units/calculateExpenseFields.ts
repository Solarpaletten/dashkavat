// src/units/calculateExpenseFields.ts
interface ExpenseFields {
  field81a: number
  field81b: number
  field89a: number
  field89b: number
}

export function calculateExpenseFields({ field81a, field81b, field89a, field89b }: ExpenseFields): number {
  return field81a + field81b + field89a + field89b
}