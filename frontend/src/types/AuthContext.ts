import type { User } from "./User";

export interface AuthContextType{
    user:User|null;
    login:(user:User,token:string)=>void;
    logout:()=>void;
}