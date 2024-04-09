export type Task = {
    assignee: string;
    description: string;
    name: string;
    id?: string;
    priority: TaskPriority;
    status: TaskStatus;
    projectId: string;
    teamID: string;
    dueDate: string | Date;
    completionDate: string | Date;
}

export enum TaskStatus {
    NOT_STARTED,
    IN_PROGRESS,
    COMPLETED
}

export enum TaskPriority {
    HIGH,
    MEDIUM,
    LOW
}

export enum TaskModalMode {
    CREATE,
    EDIT
}
