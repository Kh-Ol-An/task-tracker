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
        updateTask(id: ITask['id'], updatedTask: Partial<ITask>) {
            const index = this.tasks.findIndex((task) => task.id === id);
            if (index !== -1) {
                this.tasks[index] = { ...this.tasks[index], ...updatedTask };
            }
        },
        deleteTask(id: ITask['id']) {
            this.tasks = this.tasks.filter((task) => task.id !== id);
        },
    }
});
