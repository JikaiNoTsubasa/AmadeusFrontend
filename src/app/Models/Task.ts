import { Category } from "./Category";
import { Status } from "./Status";

export interface Task {
    id: number;
    name: string;
    subtasks : Task[];
    categories: Category[];
    status: Status;
    creationDate : Date;
}