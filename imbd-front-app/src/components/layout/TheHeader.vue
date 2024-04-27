<template>

    <header class="p-3 bg-dark text-white">
        <div class="container">
            <div class="d-flex flex-wrap align-items-center justify-content-between">
                <ul class="nav col-12 col-lg-auto  mb-2 justify-content-center mb-md-0">
                    <li class="imbd-box"><span class="logo">IMBD</span></li>
                    <li><router-link class="nav-link px-2 text-white" :to="{ name: 'home-page' }">Home</router-link>
                    </li>
                    <li v-if="isAdmin"><button class="btn btn-primary mx-2 mt-1" @click="seeSettings()">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                class="bi bi-gear" viewBox="0 0 16 16">
                                <path
                                    d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0" />
                                <path
                                    d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z" />
                            </svg>
                        </button></li>
                </ul>
                <search-info></search-info>

                <p class="blockquote m-0 mx-2 blue-100" style="font-weight: bold; text-transform: capitalize;">{{
                        username }}</p>
                <svg v-if="isLoggedIn" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor"
                    class="bi bi-person-fill mx-2" viewBox="0 0 16 16">
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                </svg>
                <div class="text-end">
                    <button type="button" class="btn btn-warning me-2" @click="goTo(FavoriteOrSignUp)">{{
                        FavoriteOrSignUp }}</button>

                    <button type="button" class="btn btn-outline-light" @click="goTo('login')"
                        v-if="!isLoggedIn">Login</button>
                    <button type="button" class="btn btn-outline-light" @click="logout" v-else>Log out</button>
                </div>
            </div>
        </div>
    </header>
</template>


<script>
import { toast } from 'vue3-toastify';
import SearchInfo from '../search/SearchInfo.vue'

export default {
    components: {
        SearchInfo
    },
    computed: {
        isLoggedIn() {
            return this.$store.getters.isAuthenticated;
        },
        isAdmin() {
            return this.$store.getters.isSuperUser;
        },
        username() {
            if (this.$store.getters.username)
                return this.$store.getters.username;
            return '';
        },
        FavoriteOrSignUp() {
            return this.isLoggedIn ? 'Favorite' : 'Sign Up'
        }
    },
    methods: {
        goTo(destination) {
            if (destination == 'login')
                this.$router.replace('/login')
            else if (destination === 'Sign Up')
                this.$router.replace('/registration')
            else
                this.$router.replace('/favorite')

        },
        logout() {
            let message = 'See you again!'

            this.$store.dispatch('logout')
            toast.info(message, {
                autoClose: 1500,
                position: toast.POSITION.TOP_RIGHT,
            });
            setTimeout(() => this.$router.replace('/login'), 1500)

        },
        seeSettings() {
            this.$router.replace('/settings')
        }
    },
}
</script>

<style scoped>
.imbd-box {
    padding: 8px;
    background-color: #f3ce13;
    border-radius: 3%;
}

.logo {
    font-weight: bold;
    text-align: center;
    color: black;
    font-size: large;
}
</style>