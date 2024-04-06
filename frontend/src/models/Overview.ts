import {Task} from "./Task";

export type Overview = {
    inProgressPercent: number;
    completedPercent: number;
    notStartedPercent: number;
    highPriorityTasks: Task[];
    tasksEndDateApproaching: Task[];
}
