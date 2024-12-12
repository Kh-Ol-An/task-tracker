<script setup lang="ts">
import { reactive } from 'vue';
import { EPriority, type ITask } from '@/models/task';

const props = defineProps<{
    task: Partial<ITask>;
}>();

const emits = defineEmits<{
    (e: 'onCancel'): void;
    (e: 'onSave', task: Partial<ITask>): void;
}>();

const currentTask = reactive<Partial<ITask>>({...props.task});

const handleSave = () => {
    if (!currentTask.name) {
        alert('Name of task is a required field!');
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
            Assignee
            <input
                v-model="currentTask.assignee"
                type="text"
                class="block w-full mt-1 border-gray-300 rounded-md shadow-sm py-1 px-3"
            />
        </label>
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
            class="mt-4 ml-2 p-2 bg-red-500 text-white rounded hover:bg-red-600"
            @click="handleCancel"
        >
            Cancel
        </button>
    </div>
</template>
