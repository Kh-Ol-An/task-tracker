<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';
import { EPriority, EStatus, type ITask } from '@/models/task';
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

const priorityLabels: Record<EPriority, string> = {
    [EPriority.LOW]: 'Low',
    [EPriority.MEDIUM]: 'Medium',
    [EPriority.HIGH]: 'High',
};

const initialTask = {
    name: '',
    description: '',
    assignee: '',
    performers: [] as string[],
    priority: EPriority.MEDIUM,
};

const currentTasks = computed(() => {
    return tasksStore.tasks.filter((task) => task.status === props.taskStatus);
});

const statusOfOpenedEditor = ref<EStatus | null>(null);

const editingTask = reactive<Partial<ITask>>({...initialTask});

const openEditorTask = (task: Partial<ITask>) => {
    statusOfOpenedEditor.value = props.taskStatus;
    Object.assign(editingTask, {...task});
};

const closeEditorTask = () => {
    delete editingTask.id;
    statusOfOpenedEditor.value = null;
};

const handleTaskDrop = (event: any) => {
    if (event.added) {
        tasksStore.updateTask(event.added.element.id, {status: props.taskStatus});
    }
};

const handleSaveTask = (task: Partial<ITask>) => {
    if (task.id) {
        tasksStore.updateTask(task.id, {...task})
    } else {
        tasksStore.addTask({
            name: task.name!,
            description: task.description,
            assignee: task.assignee,
            performers: task.performers || [],
            status: props.taskStatus,
            priority: task.priority!,
        });
    }
    closeEditorTask();
};
</script>

<template>
    <div class="flex flex-col w-full bg-white rounded-lg shadow-md p-4 h-fit">
        <h2 class="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
            {{ statusLabels[taskStatus] }}
        </h2>

        <VueDraggableNext
            class="flex flex-col gap-4 min-h-8 rounded-lg"
            :class="{
                'border border-dashed': currentTasks.length === 0,
            }"
            :list="currentTasks"
            :group="'tasks'"
            @change="handleTaskDrop"
        >
            <div
                class="bg-gray-50 p-4 rounded-lg shadow hover:shadow-md border"
                v-for="task in currentTasks"
                :key="task.id"
            >
                <h3 class="font-bold text-gray-800">
                    <strong>Name:</strong> {{ task.name }}
                </h3>
                <p class="text-sm text-gray-600 mt-1">
                    <strong>Description:</strong> {{ task.description }}
                </p>
                <p class="text-sm text-gray-500 mt-1">
                    <strong>Responsible:</strong> {{ task.assignee }}
                </p>
                <p class="text-sm text-gray-500">
                    <strong>Performers:</strong> {{ task.performers.join(', ') }}
                </p>
                <p class="text-sm text-gray-500">
                    <strong>Priority:</strong> {{ priorityLabels[task.priority] }}
                </p>

                <button
                    class="mt-4 p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    @click="openEditorTask(task)"
                >
                    Edit Task
                </button>
            </div>
        </VueDraggableNext>

        <button
            class="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            @click="openEditorTask(initialTask)"
        >
            Create Task
        </button>

        <EditorTask
            v-if="statusOfOpenedEditor === taskStatus"
            :task="editingTask"
            @onCancel="closeEditorTask"
            @onSave="handleSaveTask"
        />
    </div>
</template>
