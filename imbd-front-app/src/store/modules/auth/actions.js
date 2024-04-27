import api, { getEmail, getIdentity, getUsername, isSuperUser} from "@/httpClient/api";
import { saveRefreshToken } from "@/httpClient/api";
import { saveToken } from "@/httpClient/api";

export default {
    login(context, payload) {
        return new Promise((resolve) => {
            api("user/api/token/", "post", payload).then((res) => {
                if (res.data.access) {
                    saveToken(res.data.access);
                    saveRefreshToken(res.data.refresh);
                    res.data.username = getUsername()
                    context.commit("setUser", {
                        token: res.data.access,
                        userId: getIdentity(),
                        username: res.data.username,
                        email: getEmail(),
                        isSuperUser: isSuperUser()
                    });
                }
                resolve(res.data);
            });
        });
    },
    logout(context) {
        localStorage.removeItem("api_token");
        localStorage.removeItem("api_identity");
        localStorage.removeItem("api_refreshToken");

        context.commit("setUser", {
            token: null,
            userId: null,
            username: null,
            email: null,
            isSuperUser: false,
        });
    },

};
