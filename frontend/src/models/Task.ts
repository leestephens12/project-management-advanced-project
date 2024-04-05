export type Task = {
    assignee: string;
    description: string;
    name: string;
    id?: string;
    priority: Priority;
    status: Status;
    projectId: string;
    teamID: string;
    dueDate: string | Date;
    completionDate: string | Date;
}

export enum Status {
    NOT_STARTED,
    IN_PROGRESS,
    COMPLETED
}

export enum Priority {
    HIGH,
    MEDIUM,
    LOW
}

export enum TaskModalMode {
    CREATE,
    EDIT
}
