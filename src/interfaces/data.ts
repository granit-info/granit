import { Material } from "./Material";

// Интерфейс данных формы
export interface FormData {
  width: number | undefined;
  height: number | undefined;
  thickness: number | undefined;
  dropdown: Material | null;
}

export interface HiderSize {
  width: number | undefined;
  height: number | undefined;
}

export interface BacksideSize {
  width: number | undefined;
  height: number | undefined;
  isPhoto: boolean;
}

export interface Kopir {
  lenght: number | undefined;
  isPolished: boolean;
}

export interface CutoutSize {
  width: number | undefined;
  height: number | undefined;
}

export interface PoemAddWord {
  quantity: number | undefined;
  size: number | undefined;
}

export interface FioIndSize {
  width: number | undefined;
  height: number | undefined;
}
