export enum EStatus {
    TODO = 'todo',
    IN_PROGRESS = 'progress',
    DONE = 'done',
}

export enum EPriority {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
}

export interface ITask {
    id: string,
    name: string,
    description?: string,
    assignee?: string,
    performers: string[],
    status: EStatus,
    priority: EPriority,
}
