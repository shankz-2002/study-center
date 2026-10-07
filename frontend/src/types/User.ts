export type RoleType='USER'|"ADMIN"

export interface User{
    id:string,
    firstName:string,
    lastName:string,
    email:string
    role:RoleType
}

