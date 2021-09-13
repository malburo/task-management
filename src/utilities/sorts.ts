export const mapOrder = (array: any, order: any, key: any) => {
  if (!array || !order) return;
  return array.slice().sort((a: any, b: any) => order.indexOf(a[key]) - order.indexOf(b[key]));
};
