<template>
    <div class="exercise-container">
        <div class="exercises-grid">
            <div v-for="exercise in displayedExercises" :key="exercise.id" class="exercise-item">
                <tr>
                    <th class="exercise-name">{{ exercise.name.toUpperCase() }}</th>
                </tr>
                <tr>
                    <td><img :src="exercise.gifUrl" :alt="exercise.name" class="exercise-gif" /></td>
                </tr>
                <tr>
                    <td class="sec-muscles">
                        Secondary muscles:
                        <span v-for="(muscle, index) in exercise.secondaryMuscles" :key="index">
                        {{ muscle }}<span v-if="index < exercise.secondaryMuscles.length - 1">, </span>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td class="target">
                        Target: {{ exercise.target }}


                    </td>

                </tr>
                <tr>
                    <td class="equipment">
                        Equipment: {{ exercise.equipment }}
                    </td>
                </tr>
            </div>
        </div>
    </div>

    <div class="nav-container">
        <button @click="previousPage" :disabled="currentPage === 0" v-show="this.storedExercises.length != 0"
            class="button">Previous</button>
        <button @click="nextPage" :disabled="noExercises" v-show="this.storedExercises.length != 0"
            class="button">Next</button>
    </div>
</template>
<script>

export default {
    name: 'DisplayExercises',
    props: {
        muscleGroup: { type: String, required: true },
        storedExercises: { type: Array, required: true },
        offset: { type: Number, required: true }
    },
    emits: ['fetchExercises'],
    data() {
        return {
            currentPage: 0,
            lastPage: 0,
            firstPage: true,
            pageSize: 3,
            currentGroup: "",
            noExercises: false,
            displayedExercises: []
        }
    },
    methods: {
        fetchNextPage() {

            if (this.currentPage !== 0) this.firstPage = false;

            const start = this.currentPage * this.pageSize;
            const end = start + this.pageSize;
            this.displayedExercises = this.storedExercises.slice(start, end);

            if ((end >= this.storedExercises.length) && !this.firstPage) {
                this.noExercises = true;
            } else {
                this.noExercises = false;
            }

            console.log("current page: " + this.currentPage);
        },
        nextPage() {
            if (!this.noExercises || (this.currentPage === this.lastPage)) {
                if (this.currentPage === (this.lastPage - 2)) {
                    const newOffset = this.offset + 24;
                    this.$emit('fetchExercises', this.muscleGroup, newOffset);
                }
                this.currentPage++;
                this.fetchNextPage();
            }
        },
        previousPage() {
            if (this.currentPage >= 1) {
                this.currentPage--;
                this.fetchNextPage();
            }
        }

    },
    watch: {
        storedExercises(array) {

            if (array.length > 0) {
                this.noExercises = false;
                this.lastPage = Math.ceil(array.length / this.pageSize);
                if (this.currentGroup != this.muscleGroup) {
                    this.currentPage = 0;
                    this.currentGroup = this.muscleGroup;
                }
                this.fetchNextPage();
            }
            else if (array.length === 0) {
                this.currentPage = 0;
                this.displayedExercises = [];
            }
        }
    },
    mounted() {
        this.currentPage = 0;
        this.noExercises = false;
    }
}
</script>
