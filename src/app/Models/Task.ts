export interface Task {
    id: number;
    name: string;
    subtasks : Task[];
}