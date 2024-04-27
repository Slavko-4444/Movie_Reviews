<template>
    <form @capture="onSubmit"
        class="d-flex flex-sm-row flex-column  col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3 flex-grow-1">

        <input type="search" class="form-control form-control-dark mx-sm-6" @input="onSubmit" @blur="shouldBlur"
            @focus="checkToSeeDrop" placeholder="Search..." style="width: 60%;" aria-label="Search"
            v-model.trim="searchText">
        <SearchListDropdown v-if="seeDrop" :movies="movies" :series="series" :actors="actors" :directors="directors" :clear-search="restartSearch" />


        <div class="btn-group">
            <button type="button" class="btn btn-info" style="margin-left: 10px;" @click="onSubmit">{{
        searchMethod.method }}</button>
            <button type="button" class="btn btn-info dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown"
                aria-expanded="false">
                <span class="visually-hidden">Toggle Dropdown</span>
            </button>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item" @click="changeSearch('Movies')">Movies</a></li>
                <li><a class="dropdown-item" @click="changeSearch('Series')">Series</a></li>
                <li><a class="dropdown-item" @click="changeSearch('Actors')">Actors</a></li>
                <li><a class="dropdown-item" @click="changeSearch('Directors')">Directors</a></li>
                <li>
                    <hr class="dropdown-divider">
                </li>
                <li><a class="dropdown-item" @click="changeSearch('Search')">All</a></li>
            </ul>
        </div>
    </form>
</template>

<script>
import api from '@/httpClient/api';
import SearchListDropdown from './SearchListDropdown.vue'
export default {
    components: {
        SearchListDropdown
    },
    data() {
        return {
            seeDrop: false,
            searchText: '',
            movies: null,
            series: null,
            actors: null,
            directors: null,
            searchMethod: {
                method: 'Search',
                url: 'show-worker/search/?search='
            }
        }

    },
    methods: {
        restartSearch(operation){
            if (operation === 'clear')
            this.searchText = ''
        },
        checkToSeeDrop() {
            if (!this.searchText.length)
                this.seeDrop = false
            else
                this.seeDrop = true
            return this.seeDrop
        },
        shouldBlur() {
            setTimeout(() => {
                this.seeDrop = false;
                return false
            }, 200); 
        },
        callSearch(url, element) {
            api(url + this.searchText, 'get').then(res => {
                this[element] = res.data;
                this.seeDrop = true;
            })
        },
        changeSearch(newType) {
            this.searchText = '';
            switch (newType) {
                case 'Movies':
                    this.searchMethod.url = '/all-shows/show/?search=';
                    break;
                case 'Series':
                    this.searchMethod.url = '/all-shows/tv-show/?search=';
                    break;
                case 'Actors':
                    this.searchMethod.url = 'show-worker/actor/?search=';
                    break;
                case 'Directors':
                    this.searchMethod.url = 'show-worker/director/?search=';
                    break;
                default:
                    this.searchMethod.url = 'show-worker/search/?search=';
                    break;
            }

            this.searchMethod.method = newType
        },
        onSubmit() {
            this.movies = null
            this.series = null
            this.actors = null
            this.directors = null

            if (!this.searchText.length)
                return

            if (this.searchMethod.method === 'Search')
                api(this.searchMethod.url + this.searchText, 'get').then(res => {
                    this.actors = res.data.actors
                    this.directors = res.data.directors
                    this.movies = res.data.movies
                    this.series = res.data.series
                    this.seeDrop = true;
                })

            else if (this.searchMethod.method === 'Movies')
                this.callSearch(this.searchMethod.url, 'movies')
            else if (this.searchMethod.method === 'Series')
                this.callSearch(this.searchMethod.url, 'series')
            else if (this.searchMethod.method === 'Actors')
                this.callSearch(this.searchMethod.url, 'actors')
            else if (this.searchMethod.method === 'Directors')
                this.callSearch(this.searchMethod.url, 'directors')
        }
    },
    //Dzonijev kod

}
</script>

<style scoped>
form {
    position: relative;
}

li a {
    cursor: pointer;
}
</style>
