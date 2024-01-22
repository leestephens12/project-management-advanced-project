export type Task = {
    assignee: string;
    description: string;
    name: string;
    status: string;
    teamID: string;
    dueDate: string | Date;
    completionDate: string | Date;
}
