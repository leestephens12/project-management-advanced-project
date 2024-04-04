import {Task} from "./Task";

export type Project = {
    name: string;
    teamId: string;
    id: string | undefined;
    startDate: any;
    endDate: any;
    members: string[];
}
