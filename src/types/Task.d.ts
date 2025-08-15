type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';

interface ITask{
    id?: string;
    status?: TaskStatus;
    title: string;
    description: string;
}

interface IColumn{
    id: TaskStatus;
    title: string;
}

interface ISelectedTask {
    activity: string;
    task: ITask;
}

export type { ITask, IColumn, ISelectedTask };