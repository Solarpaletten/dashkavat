// src/units/calculateRevenueFields.ts
interface RevenueFields {
  field40a: number
  field40b: number
  field41: number
  field43: number
}

export function calculateRevenueFields({ field40a, field40b, field41, field43 }: RevenueFields): number {
  return field40a + field40b + field41 + field43
}