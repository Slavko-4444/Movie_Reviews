<template>
    <div class="dropdown-container">
        <ul id="spec-list">
            <li v-for="movie in movies" :key="movie" @click="goTo('show', movie.id)">
                <div class="top">
                    <h5>{{ movie.title }} (Movie)</h5>
                    {{ movie.date_of_release }}
                </div>
                <ul id="genre-list">
                    <li v-for="genre in movie.genre" :key="genre">
                        <h6>
                            <span v-if="genre.genre_name">
                                
                                {{ genre.genre_name }}
                            </span>
                            <span v-else>
                                {{ genre }}
                            </span>
                        </h6>
                    </li>
                </ul>
                <hr>

            </li>
            <!-- series -->
            <li v-for="ser in series" :key="ser.id" @click="goTo('tv-show', ser.id)">
                <div class="top">
                    <h5>{{ ser.title }} (Series)</h5>
                    {{ ser.date_of_release }}
                </div>
                <ul id="genre-list" v-if="ser.genre">
                    <li v-for="genre in ser.genre" :key="genre">
                        <h6>
                            <span>
                                {{ genre }}
                            </span>
                        </h6>
                    </li>
                </ul>
                
                <ul id="genre-list" v-if="ser.genre_info">
                    <li v-for="genre in ser.genre_info" :key="genre">
                        <h6>
                            <span>
                                {{ genre }}
                            </span>
                        </h6>
                    </li>
                </ul>
                <hr>

            </li>
            <!-- Actors -->
            <li v-for="actr in actors" :key="actr.id" @click="goTo('actor', actr.id)">
                <div class="top">
                    <h5>{{ actr.first_name }} {{ actr.last_name }}</h5>
                </div>
                <h6 style="text-align: end;">Actor</h6>
                <hr>
            </li>
            <!-- Directors -->
            <li v-for="dir in directors" :key="dir.id" @click="goTo('director', dir.id)">
                <div class="top">
                    <h5>{{ dir.first_name }} {{ dir.last_name }}</h5>
                </div>
                <h6 style="text-align: end;">Producer</h6>
                <hr>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: ['movies', 'actors', 'directors', 'series', 'clearSearch'],
    data() {
        return {
        }
    },
    computed: {
        emptyFields() {
            return !!(this.movie && this.actors )
        }
    },
    methods: {
        goTo(seeItem, itemId){
            let routeToSee = ''
            this.clearSearch('clear');
            if(seeItem === 'actor' || seeItem === 'director')
                routeToSee = `/${seeItem}/${itemId}`
            else 
                routeToSee = `/show/details/${seeItem}/${itemId}`
            this.$router.replace(routeToSee)
        }
    }
}
</script>

<style scoped>
.dropdown-container {
    position: absolute;
    left: 0;
    top: 39px;
    width: 60%;
    background-color: rgba(255, 255, 255, 0.9);
    /* border: 1px solid black; */
    color: white;
    font-size: 1.2rem;
    z-index: 100;
    max-height: 50vh;
    overflow-y: auto;
}

#spec-list {
    display: flex;
    flex-direction: column;
    list-style-type: none;
    padding: 2px;
    color: black;   
}

#spec-list>li {
    min-height: 5rem;
    overflow-wrap: break-word;
    padding: 2% 5%;
    transition: 0.4s;
    box-sizing: content-box;
    /* transition: 1s; */
}
#spec-list>li:hover {
    background-color: rgb(107, 103, 103);
    border-radius: 4px;
    border: 2px solid white;
    color: white;
    cursor: pointer;
}

.top {
    display: flex;
    justify-content: space-between;
}

#genre-list {
    list-style-type: none;
    display: flex;
    padding: 0;
}

span {
    background-color: rgb(184, 165, 165);
    color: rgb(255, 255, 255);
    border-radius: 5px;
    margin: 5px;
    padding: 2px 4px;
}

</style>