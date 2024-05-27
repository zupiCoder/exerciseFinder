<template>
    <div>
        <h1>Exercises by Muscle Group</h1>
        <div id="muscle-groups">
            <button @click="fetchExercises('chest')">Chest</button>
            <button v-on:click="fetchExercises('back')">Back</button>
            <button v-on:click="fetchExercises('shoulders')">Shoulders</button>
            <button v-on:click="fetchExercises(['upper arms', 'lower arms'])">Arms</button>
            <button v-on:click="fetchExercises('waist')">Waist</button>
            <button v-on:click="fetchExercises(['upper legs', 'lower legs'])">Legs</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MuscleGroupButtons',

    methods: {
        fetchExercises(group) {
            this.$emit('fetchExercises', group);
        }
    }
}

</script>