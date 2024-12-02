import { Entity } from "./Entity";
import { Task } from "./Task";

export interface Project extends Entity {
    description: string;
    tasks: Task[];
}