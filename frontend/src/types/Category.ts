import type { Field } from "./Field"

export interface Category{
    id:string,
    categoryName:string,
    description:string
    field:Field
}