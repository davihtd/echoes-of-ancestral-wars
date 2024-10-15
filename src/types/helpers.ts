export type BasicCallback = () => void;

export enum Axis {
  X = "x",
  Y = "y",
}

export type SecureOmit<T, K extends keyof T> = Omit<T, K>
