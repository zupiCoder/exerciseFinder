<template>
    <button @click="previousPage" :disabled="this.currentPage === 0">Previous</button>
    <div class="exercise-container">
        <div class="exercises-grid">
            <div v-for="exercise in displayedExercises" :key="exercise.id" class="exercise-item">
                <th class="exercise-name">{{ exercise.name }}</th>
                <td><img :src="exercise.gifUrl" :alt="exercise.name" class="exercise-gif" /></td>
                <td>
                    <p>{{ exercise.description }}</p>
                </td>
            </div>
        </div>
    </div>
    <button @click="nextPage" :disabled="noExercises">Next</button>
</template>

<script>

export default {
    name: 'DisplayExercises',
    props: {
        storedExercises: { type: Array, required: true },
    },
    created() {
        console.log(this.displayedExercises);
        console.log(this.displayedExercises.length);
    },
    data() {
        return {
            currentPage: 0,
            pageSize: 5,
            noExercises: false,
            displayedExercises: [],
        }
    },
    methods: {
        fetchNextPage() {
            const start = this.currentPage * this.pageSize;
            const end = start + this.pageSize;
            this.displayedExercises = this.storedExercises.slice(start, end);

            console.log("no exercises pre: " + this.noExercises);
            if ((end >= this.storedExercises.length) && (start != 0)) {
                this.noExercises = true;
            } else {
                this.noExercises = false;
            }

            console.log("no exercises post: " + this.noExercises);

            console.log("current page: " + this.currentPage);
        },
        nextPage() {
            if (!this.noExercises) {
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
    mounted() {
        this.currentPage = 0;
        this.noExercises = false;
        this.fetchNextPage();
    },
    created() {
        console.log("no exercises: " + this.noExercises);
    }
}
</script>
