import type { Category } from "./Category";

export interface Topic{
    id:string;
    topicName:string,
    description:string,
    category:Category
}