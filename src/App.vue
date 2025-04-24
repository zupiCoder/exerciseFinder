<template>
  <div>
    <h1>Which exercise are you looking for?</h1>
    <MuscleGroupButtons @fetchExercises="fetchExercises" @removeExercises="removeExercises">MuscleGroupButtons
    </MuscleGroupButtons>
    <DisplayExercises @fetchExercises="handleFetchExercises" :storedExercises="exercises" :muscleGroup="muscleGroup"
      :offset="offset" />
  </div>
</template>

<script>
import axios from 'axios';
import MuscleGroupButtons from './components/MuscleGroups.vue';
import DisplayExercises from './components/DisplayExercises.vue';

import './assets/app.css';
import './assets/muscleGroups.css';
import './assets/DisplayExercises.css';

import { API_KEY, API_HOST } from './config';

export default {
  name: 'app',
  components: {
    MuscleGroupButtons: MuscleGroupButtons,
    DisplayExercises: DisplayExercises,
  },
  data() {
    return {
      exercises: [],
      muscleGroup: "",
      currentIndex: 0,
      offset: 0,
    };
  },
  methods: {
    async fetchExercises(group, offset) {
      try {

        this.muscleGroup = group;

        const response = await axios.get(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${group}`, {
          headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': API_HOST
          },
          params: {
            limit: '24',
            offset: offset.toString(),
          }
        });

        if (offset === 0) {
          this.exercises = response.data;
        } else {
          this.exercises = this.exercises.concat(response.data);
        }

        this.$emit('sendExercises', this.exercises);

      } catch (error) {
        console.log(error);
      }
    },
    handleFetchExercises(group, newOffset) {
      this.offset = newOffset;
      this.fetchExercises(group, this.offset);
    },
    removeExercises() {
      this.emptyArray();
      this.$emit('sendExercises', this.exercises);
    },
    emptyArray() {
      this.exercises = []
    }
  }
}

</script>

<style>
h1{
  font-weight: bold;
}

</style>
