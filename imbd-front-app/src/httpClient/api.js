import axios from 'axios';
import { jwtDecode } from "jwt-decode";
export const  baseUrl = 'http://127.0.0.1:8000/'
function api(
    path, method='get',
    body) {

    const requestDATA = {
        method: method,
        baseURL: baseUrl,
        url: path,
        data: body,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getToken(),
        }
    }

    
    return new Promise((resolve) => {
        axios(requestDATA)
            .then(res => responseHandler(res, resolve))
            .catch(async error => {
                console.log('sta je problem', error)
                console.log('a sta je poziv', requestDATA)
                if (error.response.status === 403) {
                    const newToken = await refreshToken();
                    if (!newToken){
                        const response = {
                            status: 'login Error',
                            data: null
                        }
    
                        return resolve(response);
                    }
                    saveToken(newToken.access);
                    
                    requestDATA.headers['Authorization'] = getToken()
                    return await repeatRequest(resolve, requestDATA);
    
                }
                const response = {
                    status: 'service Error',
                    data: error.response
                }
                resolve(response)
            });
    })
}


    async function responseHandler(res,resolve) {

        if (res.status < 200 || res.status >= 300) {
          
            const response = {
                status: 'service Error',
                data: res.data
            };

            return resolve(response)
            
        }

        let response = {
                status: 'ok',
                data: res.data
            }
        return resolve(response)
}
    
async function repeatRequest(resolve, requestDATA) {

    await axios(requestDATA).
        then(res => {
            let response = {};

            if (res.status === 401)
                response = {
                    status: 'login Error',
                    data: res.data
                }
            else
                response = {
                    status: 'ok',
                    data: res.data
                }
            return resolve(response);
        }).
        catch(err => {
            const response = {
                status: 'service Error',
                data: err
            }
            return resolve(response);
        });
}


async  function refreshToken() {
    
    const path = 'user/api/token/refresh/';
    
    const data = {
        refresh: getRefreshToken()
    }

    const refreshTokenRequestDATA = {
        url: path,
        method: 'post',
        baseURL: 'http://127.0.0.1:8000/',
        data: data,
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const response = await axios(refreshTokenRequestDATA)
        const token = response.data;
        return token

    } catch (error) {
        return null;
    }

}

    export function getToken(){      
        const token = localStorage.getItem('api_token');
        return  !isEmptyField()?'Bearer ' + token: null;
    }

    export function saveToken(token) {
        localStorage.setItem('api_token', token);       
}
    
    export function saveIdentity(identity) {
        localStorage.setItem('api_identity', identity);       
    }
    
    export function getIdentity() {
        if (isEmptyField())
            return null;
        let token = localStorage.getItem('api_token');       
        const decoded = jwtDecode(token);
        return decoded.user_id;
    }
    
    export function getUsername() {
        if (isEmptyField())
            return null;
        let token = localStorage.getItem('api_token');       
        const decoded = jwtDecode(token);
        return decoded.username;
    }
    export function getEmail() {
        if (isEmptyField())
            return null;
        let token = localStorage.getItem('api_token');       
        const decoded = jwtDecode(token);
        return decoded.email;
    }
    export function isSuperUser() {
        if (isEmptyField())
            return false;
        let token = localStorage.getItem('api_token');       
        const decoded = jwtDecode(token);
        return decoded.is_superuser;
    }
    export function isEmptyField(){
        return localStorage.getItem('api_token')?false:true
    }
    function getRefreshToken() {
        const token = localStorage.getItem('api_refreshToken');
        return token + '';
    }
    export function saveRefreshToken(token) {
        localStorage.setItem('api_refreshToken', token);       
    }
    


export default api;