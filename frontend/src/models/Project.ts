import {Task} from "./Task";

export type Project = {
    name: string;
    description: string;
    teamId: string;
    id: string;
    startDate: any;
    endDate: any;
    tasks: Task[];
    members: string[];
}
