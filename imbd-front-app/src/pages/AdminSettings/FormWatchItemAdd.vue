<template>
    <div class="container border bd-2 rounded p-3 mt-5">
        <h3 class="h3 text-center">Add Movie</h3>

        <form class="my-3" @submit.prevent="submitForm">
            <div class="row mb-3">
                <label for="title" class="col-sm-2  col-form-label">Title</label>
                <input type="text" class="form-control" id="title" v-model="specWatch.title"
                    placeholder="Enter movie title">
            </div>
            <div class="mb-3">
                <label for="description" class="form-label">Description</label>
                <textarea class="form-control" id="description" v-model="specWatch.description" rows="3"
                    placeholder="Enter movie description"></textarea>
            </div>
            <div class="mb-3">
                <label for="image" class="form-label">Image</label>
                <input class="form-control" type="file" id="image" accept="image/*" @change="handleFileChange">
            </div>
            <div class="mb-3">
                <Datepicker v-model="exactDate" class="border bd-2 rounded" />
            </div>
            <!-- genres checkbox -->
            <div class="d-flex flex-row mb-3">
                <div class="mx-2" v-for="genre in genres" :key="genre.id">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" :value="genre.id" v-model="selectedGenres"
                            :id="'genreCheckbox_' + genre.id">
                        <label class="form-check-label" :for="'genreCheckbox_' + genre.id">
                            {{ genre.genre_name }}
                        </label>
                    </div>
                </div>
            </div>

            <div class="mb-3">
                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        {{ choosenDirector.name }}
                    </button>
                    <ul class="dropdown-menu">
                        <li><button class="dropdown-item" type="button"
                                @click="setDir(dir.id, `${dir.first_name} ${dir.last_name}`)" v-for="dir in directors"
                                :key="dir">{{ dir.first_name }} {{ dir.last_name }}</button></li>

                    </ul>
                </div>
            </div>

            <!-- add actors -->
            <div class="mb-3 d-flex">
                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        Select Actor
                    </button>
                    <ul class="dropdown-menu">
                        <li><button class="dropdown-item" type="button"
                                @click="addActor(actor.id, `${actor.first_name} ${actor.last_name}`)"
                                v-for="actor in actors" :key="actor">{{ actor.first_name }} {{ actor.last_name
                                }}</button></li>
                    </ul>
                </div>
                <div>
                    <span class="badge text-bg-light fs-4 act" @click="removeActor(actor.id)"
                        v-for="actor in selectedActors" :key="actor">{{
            actor.fullName }}</span>
                </div>
            </div>
            <div class="mb-3">
                <label for="num" class="form-label">Length</label>
                <input class="form-control" type="number" id="num" v-model="specWatch.movie_length">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        <br>
    </div>
</template>

<script>
import api, { baseUrl, getToken } from '@/httpClient/api';
import Datepicker from 'vue3-datepicker'
import axios from 'axios';
import { toast } from 'vue3-toastify';

export default {
    components: {
        Datepicker
    },
    data() {
        return {
            exactDate: new Date(),
            specWatch: {},
            selectedGenres: [],
            selectedActors: [],
            genres: null,
            directors: null,
            actors: null,
            url: 'all-shows/show/',
            choosenDirector: {
                name: 'Director',
                id: null
            },
        };
    },
    watch: {
        selectedGenres: function (newGenres) {
            this.specWatch.genre = newGenres;
        },
        selectedActors: {
            handler(newSelectedActors) {
                const actorIds = newSelectedActors.map(actor => parseInt(actor.id));
                this.specWatch.actors = actorIds;
            },
            deep: true
        },
        choosenDirector: {
            handler(newVal) {
                this.specWatch.director = newVal.id;
            },
            deep: true
        }
    },
    methods: {
        restartInputs(){
            this.specWatch = {}
            this.selectedGenres = []
            this.selectedActors = []
            this.choosenDirector= {
                name: 'Director',
                id: null
            }
        },
        addActor(id, fullName) {
            let is = this.selectedActors.some(item => item.id == id && item.fullName == fullName)
            if (!is)
                this.selectedActors.push({ id: id, fullName: fullName })
        },
        removeActor(id) {
            this.selectedActors = this.selectedActors.filter(item => item.id !== id)
        },
        setDir(id, fullName) {
            this.choosenDirector.id = id
            this.choosenDirector.name = fullName
        },
        getCurrentDate(givenDate) {
            const year = givenDate.getFullYear();
            const month = String(givenDate.getMonth() + 1).padStart(2, '0');
            const day = String(givenDate.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        },
        handleFileChange(event) {
            let file = event.target.files || event.dataTransfer.files;
            this.specWatch.image = file[0];
        },
        callGenreLis() {
            api('all-shows/genre/').then(res => {
                if (res.status === 'ok')
                    this.genres = res.data
            })
        },
        callDirectorLis() {
            api('show-worker/director/').then(res => {
                if (res.status === 'ok')
                    this.directors = res.data
            })
        },
        callActorLis() {
            api('show-worker/actor/').then(res => {
                if (res.status === 'ok')
                    this.actors = res.data
            })
        },
        submitForm() {

            this.specWatch.date_of_release = this.getCurrentDate(this.exactDate)

            let reqFormData = new FormData()
            
            reqFormData.append("photo_url", this.specWatch.image);
            reqFormData.append('genre', JSON.stringify(this.specWatch.genre));
            reqFormData.append("title", this.specWatch.title);
            reqFormData.append("movie_length", this.specWatch.movie_length);
            reqFormData.append("date_of_release", this.specWatch.date_of_release);
            reqFormData.append("description", this.specWatch.description);
            reqFormData.append("director", this.specWatch.director);
            reqFormData.append('actor', JSON.stringify(this.specWatch.actors));

            let header = {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': getToken(),
                }

            axios.post(baseUrl + 'all-shows/movies-create', reqFormData, {
                headers: header
            }).then(res => {
                if (res.status === 201) {
                    toast.success('Movie created successfully.', {
                        autoClose: 1500,
                        position: toast.POSITION.TOP_RIGHT,
                        toastStyle: {
                            fontSize: '1rem'
                        },
                    });
                    this.$emit('reloadPage');
                    this.restartInputs();
                }
            }).catch((error) =>{

                console.log('error prboaj jos malo', error.response.data)
                toast.error('Bad Image format', {
                    autoClose: 1500,
                    position: toast.POSITION.TOP_RIGHT,
                    toastStyle: {
                        fontSize: '1rem'
                    },
                })
            }
            )

            // kraj submita
        }
    },
    created() {
        this.callGenreLis();
        this.callDirectorLis();
        this.callActorLis();

    }
}
</script>

<style scoped>
.act:hover {
    cursor: pointer;
}
</style>