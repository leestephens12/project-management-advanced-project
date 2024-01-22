export type Task = {
    assignee: string;
    description: string;
    name: string;
    status: string;
    teamId: string;
    dueDate: string | Date;
    completionDate: string | Date;
}
