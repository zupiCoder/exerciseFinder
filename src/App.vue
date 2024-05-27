<script>
import axios from 'axios';
import MuscleGroupButtons from './components/MuscleGroups.vue';
import DisplayExercises from './components/DisplayExercises.vue';

import './assets/muscleGroups.css';
import './assets/DisplayExercises.css';

export default {
  name: 'app',
  components: {
    MuscleGroupButtons: MuscleGroupButtons,
    DisplayExercises: DisplayExercises,
  },
  data() {
    return {
      exercises: [],
      currentIndex: 0,
    };
  },
  methods: {
    async fetchExercises(group) {
      try {
        console.log(group);

        const response = await axios.get(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${group}`, {
          headers: {
            'X-RapidAPI-Key': '094023f03cmshf7b6d219e019cedp11fe7djsn637935f18fe3',
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
          },
          params: {
            limit: '25',
          }

        });
        this.exercises = response.data;
        console.log(this.exercises);


        this.$emit('sendExercises', this.exercises);

      } catch (error) {
        console.log(error);
      }
    }
  }
}

</script>

<template>
  <div>
    <h1>Which exercise are you looking for?</h1>
    <MuscleGroupButtons @fetchExercises="fetchExercises($event)">MuscleGroupButtons</MuscleGroupButtons>
    <DisplayExercises :storedExercises="exercises" />

  </div>
</template>
