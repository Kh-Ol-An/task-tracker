<script setup lang="ts">
import { reactive, ref, computed, toRef } from 'vue';
import { EPriority, EStatus } from '@/models/task';
import type { ITask } from '@/models/task';
import { useTasksStore } from '@/stores/tasks';

const props = defineProps<{
    taskStatus: EStatus;
}>();

const tasksStore = useTasksStore();

const statusLabels: Record<EStatus, string> = {
    [EStatus.TODO]: 'TODO',
    [EStatus.IN_PROGRESS]: 'In Progress',
    [EStatus.DONE]: 'Done',
};

const currentTasks = toRef(computed(() => {
    return tasksStore.tasks.filter((task) => task.status === props.taskStatus);
}));

const initialTask = {
    name: '',
    description: '',
    assignee: '',
    performers: [],
    priority: EPriority.MEDIUM,
};

const openFormStatus = ref<EStatus | null>(null);
const newTask = reactive<Partial<ITask>>({ ...initialTask });

const openCreateTaskForm = () => {
    openFormStatus.value = props.taskStatus;
    Object.assign(newTask, { ...initialTask });
};

const closeCreateTaskForm = () => {
    openFormStatus.value = null;
    Object.assign(newTask, { ...initialTask });
};

const createTask = () => {
    if (!newTask.name) {
        alert('Name of task is a required field!');
        return;
    }
    tasksStore.addTask({
        name: newTask.name!,
        description: newTask.description,
        assignee: newTask.assignee,
        performers: [],
        status: props.taskStatus,
        priority: newTask.priority!,
    });
    closeCreateTaskForm();
};
</script>

<template>
    <div class="flex flex-col w-full bg-white rounded-lg shadow-md p-4 h-fit min-h-72">
        <h2 class="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
            {{ statusLabels[taskStatus] }}
        </h2>

        <div v-for="task in currentTasks" :key="task.id">{{ task.name }}</div>

        <button
            class="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            @click="openCreateTaskForm"
        >
            Create Task
        </button>

        <div v-if="openFormStatus === taskStatus" class="mt-4 bg-gray-100 p-4 rounded-lg border">
            <label class="block text-sm font-medium text-gray-700 mb-2">
                Task Name*
                <input
                    v-model="newTask.name"
                    type="text"
                    class="block w-full mt-1 border-gray-300 rounded-md shadow-sm py-1 px-3"
                />
            </label>
            <label class="block text-sm font-medium text-gray-700 mb-2">
                Description
                <textarea
                    v-model="newTask.description"
                    class="block w-full mt-1 border-gray-300 rounded-md shadow-sm py-1 px-3"
                ></textarea>
            </label>
            <label class="block text-sm font-medium text-gray-700 mb-2">
                Assignee
                <input
                    v-model="newTask.assignee"
                    type="text"
                    class="block w-full mt-1 border-gray-300 rounded-md shadow-sm py-1 px-3"
                />
            </label>
            <label class="block text-sm font-medium text-gray-700 mb-2">
                Priority
                <select
                    v-model="newTask.priority"
                    class="block w-full mt-1 border-gray-300 rounded-md shadow-sm py-1 px-3"
                >
                    <option :value="EPriority.LOW">Low</option>
                    <option :value="EPriority.MEDIUM">Medium</option>
                    <option :value="EPriority.HIGH">High</option>
                </select>
            </label>
            <button
                class="mt-4 p-2 bg-green-500 text-white rounded hover:bg-green-600"
                @click="createTask"
            >
                Save Task
            </button>
            <button
                class="mt-4 ml-2 p-2 bg-red-500 text-white rounded hover:bg-red-600"
                @click="closeCreateTaskForm"
            >
                Cancel
            </button>
        </div>
    </div>
</template>
