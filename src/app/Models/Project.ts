import { Category } from "./Category";
import { Status } from "./Status";
import { Task } from "./Task";

export interface Project {
    id: number;
    name: string;
    icon: string;
    description: string;
    tasks: Task[];
    categories: Category[];
    status: Status;
    creationDate: Date;
}