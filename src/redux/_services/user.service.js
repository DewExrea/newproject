import appInfo from "../../app-info";
import { authHeader } from '../_helpers';
import notify from "devextreme/ui/notify"
import { GetData } from "../../store/dataStore"

export const userService = {
    login,
    logout,
    getAll
};


function login(username, password) {
    return new Promise((resolve, reject) => {

        let params = {
            username: username,
            password: password
        }
        // GetData("API_login/api/v1/loginFind", params) // Api Login
        //     .then((result) => {
        //         if (result.message == "Success") {
        //             localStorage.setItem('user', username);
        //             resolve({
        //                 ok: true, text: () =>
        //                     Promise.resolve(username)
        //             });
        //             //return user;
        //         } else {
        //             reject('Username or password is incorrect');
        //         }

        //     })
        //     .catch((err) => {
        //         notify(`${appInfo.errAlertMsg}`, "error", 1900)
        //     })

        if (username === 'Admin' && password === 'P@ssw0rd') {
            resolve({
                ok: true, text: () =>
                    Promise.resolve(username)
            });
            localStorage.setItem('username', username);
            return username;
        } else if (username === 'Admin_Dew' && password === '123456') {
            resolve({
                ok: true, text: () =>
                    Promise.resolve(username)
            });
            localStorage.setItem('username', username);
            return username;
        }
    });
}

function logout() {
    localStorage.removeItem('username');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${appInfo.url_API}/users`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                // location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}