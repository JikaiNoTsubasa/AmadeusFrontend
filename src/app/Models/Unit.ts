import { Status } from "./Status";

export interface Unit{
    id: number;
    name: string;
    status: Status;
    creationDate: Date;
}