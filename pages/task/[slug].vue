<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { ITask } from '@/models/task';
import { useTasksStore } from '@/stores/tasks';

const route = useRoute();
const router = useRouter();

const tasksStore = useTasksStore();

const taskId = route.params.slug;

const task = ref<ITask | undefined>(
    tasksStore.tasks.find((currentTask: ITask) => currentTask.id === taskId)
);

const goBack = () => {
    router.back();
};
</script>

<template>
    <div class="min-h-screen bg-gray-50 p-6">
        <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div class="p-6">
                <button
                    @click="goBack"
                    class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                    Назад
                </button>

                <h1 class="text-2xl font-bold text-gray-800 mt-6">
                    {{ task?.name || 'Task not found' }}
                </h1>

                <p v-if="task?.description" class="text-gray-600 mt-4">
                    {{ task.description }}
                </p>
                <p v-else class="text-gray-600 italic mt-4">
                    There is no description.
                </p>

                <div v-if="task?.assignee" class="mt-6">
                    <h2 class="text-lg font-semibold text-gray-700">Responsible:</h2>
                    <p class="text-gray-600">{{ task.assignee.name }}</p>
                </div>

                <div v-if="task?.performers.length" class="mt-6">
                    <h2 class="text-lg font-semibold text-gray-700">Performers:</h2>
                    <ul class="list-disc list-inside text-gray-600">
                        <li v-for="performer in task.performers" :key="performer.id">
                            {{ performer.name }}
                        </li>
                    </ul>
                </div>

                <div class="mt-6 flex items-center gap-3">
                    <h2 class="text-lg font-semibold text-gray-700">Status:</h2>
                    <span
                        class="px-3 py-1 rounded-full text-white"
                        :class="{
                          'bg-blue-500': task?.status === 'todo',
                          'bg-yellow-500': task?.status === 'progress',
                          'bg-green-500': task?.status === 'done',
                        }"
                    >
                        {{ task?.status }}
                    </span>
                </div>

                <div class="mt-6 flex items-center gap-3">
                    <h2 class="text-lg font-semibold text-gray-700">Priority:</h2>
                    <span
                        class="px-3 py-1 rounded-full text-white"
                        :class="{
                          'bg-gray-500': task?.priority === 'low',
                          'bg-orange-500': task?.priority === 'medium',
                          'bg-red-500': task?.priority === 'high',
                        }"
                    >
                        {{ task?.priority }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
