<template>
    <div>
        <div class="muscle-groups">
            <VueSelect v-model="selectedValue" :options="options" @option-selected="onOptionSelected"
                @option-deselected="onOptionDeselected" placeholder="Select a muscle group" class="vue-select" />
        </div>
    </div>
</template>

<script setup lang="ts">

import "vue3-select-component/dist/style.css";
import { ref } from "vue";
import VueSelect from "vue3-select-component";

const options = [{ label: "Neck", value: "neck" },
{ label: "Shoulders", value: "shoulders" },
{ label: "Chest", value: "chest" },
{ label: "Back", value: "back" },
{ label: "Upper arms", value: "upper arms" },
{ label: "Lower arms", value: "lower arms" },
{ label: "Waist", value: "waist" },
{ label: "Upper legs", value: "upper legs" },
{ label: "Lower legs", value: "lower legs" },
];

const selectedValue = ref("");
const emit = defineEmits(['fetchExercises', 'removeExercises']);

const onOptionSelected = (option) => {
    emit('fetchExercises', option.value, 0);
}

const onOptionDeselected = (option) => {
    emit('removeExercises', option.value);
}

</script>

<style scoped>
.muscle-groups {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

:deep(.vue-select) {
    width: 225px;

}
</style>