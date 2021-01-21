import { Roles } from "./roles";

export interface User {
    id: string;
    fullName: string;
    username: string;
    email: string;
    phoneNumber: string;
    address: string;
    birthdate: Date;
    sex: string;
    fileName: string;
    password: string;
    roles: Roles;
}
