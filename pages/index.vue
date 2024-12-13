<script setup lang="ts">
import { EStatus } from '@/models/task';
</script>

<template>
    <div class="flex gap-4 p-4 bg-gray-100 min-h-screen">
        <StatusColumn v-for="taskStatus in Object.values(EStatus)" :key="taskStatus" :taskStatus="taskStatus" />
    </div>
</template>
