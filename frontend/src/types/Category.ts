import type { Field } from "./Field";

export interface Category {
  id: string;
  categoryName: string;
  description: string;
  field?: Field;
}

export interface CategoryData {
  categoryName: string;
  description: string;
}
