import { Entity } from "./Entity";
import { Project } from "./Project";

export interface Unit extends Entity{
    projects: Project[]
}