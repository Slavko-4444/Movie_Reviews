export default{
    setUser(state, payload){
        state.token = payload.token
        state.userId = payload.userId;
        state.username = payload.username;
        state.email = payload.email;
        state.isSuperUser = payload.isSuperUser;
    },
}