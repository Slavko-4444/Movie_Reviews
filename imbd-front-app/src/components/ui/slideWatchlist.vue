<template>
<div class="shadow-lg p-3 mb-5 bg-white rounded" style="border: 1px solid lightgray">

    <div :id="idSpec" class="carousel slide  box"   data-bs-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item active" v-for="movie in watchlist" :key="movie">
                <img :src="movie.photo_url" class="d-block box rounded"  alt="...">
                <div class="carousel-caption d-none d-md-block">
                    <h6 v-if="movie.avg_rating"><star-ratings :stars="movie.avg_rating"></star-ratings></h6>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" :data-bs-target="'#'+ idSpec" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" :data-bs-target="'#' + idSpec" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </div>
</div>
</template>

<script>
import StarRatings from './StarRatings.vue'
export default {
    components: { StarRatings },
    props: ['watchlist', 'idSpec'],
    methods:{
        goTo(id){
            this.$router.push({ path: '/show/details/show/'+ id })
        }
    }
}
</script>

<style scoped>

.box {
    width:305px;
    height: 450px;
}
h6 {
    background-color: rgba(0, 0, 0, 0.61);
    padding: 1rem;
}
</style>