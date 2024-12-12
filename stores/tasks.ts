import { defineStore } from 'pinia';
import type { ITask } from '@/models/task';

export const useTasksStore = defineStore('tasks', {
    state: () => ({
        tasks: [] as ITask[],
    }),
    actions: {
        addTask(task: Omit<ITask, 'id'>) {
            const id = crypto.randomUUID();
            this.tasks = [...this.tasks, { ...task, id }];
        },
    }
});
