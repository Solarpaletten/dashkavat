// src/units/calculateTaxFields.ts
interface TaxInputFields {
  field81a: number
  field89a: number
  field89b: number
}

interface TaxResult {
  field66: number
  field61: number
  field67: number
  field62: number
}

export function calculateTaxFields({ field81a, field89a, field89b }: TaxInputFields, vatRate19: number): TaxResult {
  const field66 = field81a * vatRate19
  const field61 = field89a * vatRate19
  const field67 = field89b * vatRate19
  const field62 = field66 + field61 + field67

  return {
    field66,
    field61,
    field67,
    field62
  }
}