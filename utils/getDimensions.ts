export const getArea = (width: number, height: number): string => {
  const area = (width / 1000) * (height / 1000);
  return area.toFixed(1).toString().concat('m²');
};

export const getMillimeters = (mm: number): string => {
  return mm.toString().concat(' mm');
};
