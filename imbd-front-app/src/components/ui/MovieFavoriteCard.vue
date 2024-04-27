<template>
    <div class="card flex-row mt-3">
        <img class="card-img-left" :src="movie.photo_url" style="width: 25%;" />
        <div class="card-body d-flex flex-column" style="width: 75%">
            <div class="d-flex justify-content-between">
                <h2 class="card-title my-4" style="text-transform: capitalize;">{{ movie.title }} </h2>
                <h4 class="my-4" v-if="movie.avg_rating">Average Rating <star-ratings :stars="movie.avg_rating"></star-ratings></h4>
                <h5 class="my-4 alert p-2 alert-warning" v-else>Not rated yet!</h5>
            </div>
            <h5 class="card-title text-muted">Movie Details</h5>
            <p class="card-text my-4">{{ movie.description }}</p>
            <div class="d-flex flex-row-reverse">
                <span class="badge bg-dark fs-6 mx-1" v-for="gen in movie.genre" :key="gen">{{ gen }}</span>
            </div>
            <h5 class="card-title text-secondary my-4" v-if="movie.userRate">Your rate <span class="text-primary"
                    style="font-size: 1.5rem;">{{ movie.userRate }}</span></h5>
                    <p v-else class="align-self-baseline alert alert-primary p-2">You have not rated yet</p>
            <div >

            </div>

            <div class="d-flex justify-content-between mt-auto">
                <div>
                    <h4 class="card-title text-muted">Director</h4>
                    <h5 class="btn btn-outline-warning" @click="seeDirector(movie.director.id)"> {{ movie.director.first_name }} {{ movie.director.last_name }}
                    </h5>
                </div>
                <div v-if="movie.movie_length">
                    <h4 class="card-title text-muted" >Duration</h4>
                    <h5> {{ movie.movie_length }} mins</h5>
                </div>
                <div>
                    <h4 class="card-title text-muted">Date of release</h4>
                    <h5> {{ specDate(movie.date_of_release) }}</h5>
                </div>
            </div>


    </div>
  </div>
</template>

<script>
import StarRatings from "./StarRatings.vue";
export default {
    components: { StarRatings },
    props: ['movie'],
    methods: {
        specDate(dt) {
            const releaseDate = dt;
            const parts = releaseDate.split("-");
            return `${parts[2]}/${parts[1]}/${parts[0]}`;
        },
        seeDirector(id){
            this.$router.push(`/director/${id}`)
        }
    }
}
</script>

<style scoped></style>
