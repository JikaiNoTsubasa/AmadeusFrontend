import { Status } from "./Status";

export interface Unit{
    id: number;
    name: string;
    icon: string;
    status: Status;
    creationDate: Date;
}