import { Entity } from "./Entity";

export interface Task extends Entity{
    subtasks : Task[];
    content : string
}