export const getGlass = (glass: string) => {
  if (glass === '4+4 Laminado pvb 0.25') return '8mmLI'
  if (glass === 'Templado 5mm') return '5mmTI'
  if (glass === 'Crudo Simple 4 mm') return '4mmCI'
}
