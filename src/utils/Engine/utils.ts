export default function getUnitAsNumber(
  value: string,
  unit: "px" | "deg"
): number {
  return Number(value.slice(0, -unit.length));
}

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = src;
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", () =>
      reject(new Error(`Failed to load image: ${src}`))
    );
  });
}

export function range(start: number, end: number) {
  const array = [];
  for (let i = start; i <= end; i++) {
    array.push(i);
  }

  return array;
}
