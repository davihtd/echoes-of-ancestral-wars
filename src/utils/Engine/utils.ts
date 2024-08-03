export default function getUnitAsNumber(value: string, unit: 'px' | 'deg'): number {
  return Number(value.slice(0, -unit.length))
}