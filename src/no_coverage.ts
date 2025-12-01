export function noCoverage(): number {
  console.log('No coverage');
  const array = [1, 2, 3];
  let total: number = 0;
  array.forEach((element) => {
    console.log(element);
    total += element;
  });
  if (total % 3 == 0) {
    total += 1;
  }
  return total;
}
