export default {
    userId(state) {
        return state.userId;
    },
    token(state) {
        return state.token;
    },
    username(state) {
        return state.username;
    },
    email(state) {
        return state.email;
    },
    isSuperUser(state){
        return state.isSuperUser;
    },
    isAuthenticated(state){
    
        return !!state.token;
    }
}