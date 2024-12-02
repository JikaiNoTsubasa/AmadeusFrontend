import { Category } from "./Category";
import { Status } from "./Status";

export interface Entity {
    id: number;
    name: string;
    icon: string;
    categories: Category[];
    status: Status;
    creationDate: Date;
}