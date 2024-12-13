<script setup lang="ts">
import { reactive } from 'vue';
import { EPriority, type ITask } from '@/models/task';
import type { IUser } from '@/models/user';
import { mockUsers } from '@/data/mock-data';

const props = defineProps<{
    task: Partial<ITask>;
}>();

const emits = defineEmits<{
    (e: 'onCancel'): void;
    (e: 'onSave', task: Partial<ITask>): void;
}>();

const currentTask = reactive<Partial<ITask>>(JSON.parse(JSON.stringify(props.task)));

const togglePerformer = (user: IUser) => {
    const index = currentTask.performers?.findIndex(currentUser => currentUser.id === user.id);

    if (index !== undefined && index !== -1) {
        currentTask.performers?.splice(index, 1);
    } else {
        currentTask.performers?.push(user);
    }
};

const handleSave = () => {
    if (!currentTask.name) {
        alert('Name of task is a required field!');
        return;
    }

    if (!currentTask.assignee) {
        alert('Assignee is a required field!');
        return;
    }

    if (currentTask.performers?.length === 0) {
        alert('Performers is a required field!');
        return;
    }

    emits('onSave', currentTask);
};

const handleCancel = () => {
    emits('onCancel');
};
</script>

<template>
    <div class="mt-4 bg-gray-100 p-4 rounded-lg border">
        <label class="block text-sm font-medium text-gray-700 mb-2">
            Task Name*
            <input
                v-model="currentTask.name"
                type="text"
                class="block w-full mt-1 border-gray-300 rounded-md shadow-sm py-1 px-3"
            />
        </label>

        <label class="block text-sm font-medium text-gray-700 mb-2">
            Description
            <textarea
                v-model="currentTask.description"
                class="block w-full mt-1 border-gray-300 rounded-md shadow-sm py-1 px-3"
            ></textarea>
        </label>

        <label class="block text-sm font-medium text-gray-700 mb-2">
            Assignee*
            <select
                v-model="currentTask.assignee"
                class="block w-full mt-1 border-gray-300 rounded-md shadow-sm py-1 px-3"
            >
                <option v-for="user in mockUsers" :key="user.id" :value="user">
                    {{ user.name }}
                </option>
            </select>
        </label>

        <div class="block text-sm font-medium text-gray-700 mb-2">
            Performers*
            <div class="block w-full mt-1">
                <div
                    v-for="user in mockUsers"
                    :key="user.id"
                    class="flex items-center space-x-2 mb-1"
                >
                    <label class="flex items-center gap-2">
                        <input
                            :id="user.id"
                            type="checkbox"
                            :value="user.id"
                            :checked="currentTask.performers?.some(currentUser => currentUser.id === user.id)"
                            @change="togglePerformer(user)"
                        />
                        {{ user.name }}
                    </label>
                </div>
            </div>
        </div>

        <label class="block text-sm font-medium text-gray-700 mb-2">
            Priority
            <select
                v-model="currentTask.priority"
                class="block w-full mt-1 border-gray-300 rounded-md shadow-sm py-1 px-3"
            >
                <option :value="EPriority.LOW">Low</option>
                <option :value="EPriority.MEDIUM">Medium</option>
                <option :value="EPriority.HIGH">High</option>
            </select>
        </label>

        <button
            class="mt-4 p-2 bg-green-500 text-white rounded hover:bg-green-600"
            @click="handleSave"
        >
            Save
        </button>
        <button
            class="mt-4 ml-2 p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            @click="handleCancel"
        >
            Cancel
        </button>
    </div>
</template>
