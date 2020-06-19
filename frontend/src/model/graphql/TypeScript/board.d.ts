// This is generated code
// DO NOT MODIFY
// It will be overwritten

export interface Project {
    id: string;
    name: string;
    description: string;
    timestamp: Date;
    state: ProjectState;
}

export enum ProjectState {
    OPEN, IN_PROGRESS, DONE
}
