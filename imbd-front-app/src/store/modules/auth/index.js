import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";
import { getIdentity, getToken, getUsername, isSuperUser } from "@/httpClient/api.js";

export default {
    state() {
        return {
          userId: getIdentity(),
          token: getToken(),
          username: getUsername(),
          isSuperUser: isSuperUser(),
        };
      },
      mutations: mutations,
      actions: actions,
      getters: getters,
}