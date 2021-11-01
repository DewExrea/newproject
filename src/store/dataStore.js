import CustomStore from "devextreme/data/custom_store";
import UrlInfo from "../app-info";

function handleErrors(response) {
    if (!response.ok) throw Error(response.statusText);
    return response;
}

export function getDate(date) {
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    return y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}

export function getDateDMY(date) {
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    return (d <= 9 ? '0' + d : d) + '/' + (m <= 9 ? '0' + m : m) + '/' + y;
}

export const get_Menu = _getMenu();

async function _getMenu() { //menu
    // //let storage = JSON.parse(localStorage.getItem('username'));
    // var params = {
    //     "groupCode": '1',
    //     "page": "m"
    // }

    // //return fetch(`${UrlInfo.urlTQ}/truckq.menu_item_setting.api/api/v1/menuitemsetting/filter`, {
    // return fetch(`${UrlInfo.url}/API_Menu/api/v1/menu/filter`, {
    //     method: "POST",
    //     body: JSON.stringify(params),
    //     headers: {
    //         "Content-Type": "application/json; charset=utf-8",
    //         "Access-Control-Allow-Origin": "*",
    //         //"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxjYmEwYWRtIiwiZ3JvdXAiOiIxIiwidHlwZSI6InAiLCJwb3J0IjoiTENCQTAiLCJuYmYiOjE2MDAyNTM5MzUsImV4cCI6MTkxNTYxMzkzNSwiaWF0IjoxNjAwMjUzOTM1fQ.SioBLRhW6nPS9r07r47Y1jJGysi2z_2NTdbQk2A6_08" //`Bearer ${chk}`
    //     }
    // })
    //     .then(handleErrors)
    //     .then(response => response.json())
}

export const Get_Store = (pkey, pfilter, pvalue) => new CustomStore({
    loadMode: "raw",
    key: pkey,
    load: (values) => {
        values.isActive = "1";
        var f = UrlInfo.url + '/' + pfilter + '/filter';
        return fetch(`${f}`, {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        })
            .then(handleErrors)
            .then(response => response.json())
            .then(result => {
                return result.items;
            });
    },
});

export const GetData = async (path, params, meth) => {
    let getparams = params || { "isActive": true };
    return await fetch(`${UrlInfo.url}/${path}`, {
        method: "POST",
        body: JSON.stringify(getparams),
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Access-Control-Allow-Origin": "*",
        }
    })
        .then(handleErrors)
        .then(response => response.json())
}

export const GetDataSkip = async (path, params, sParam) => {
    let getparams = params;
    return fetch(`${UrlInfo.url}/${path}`, {
        method: "POST",
        body: JSON.stringify(getparams),
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Access-Control-Allow-Origin": "*",
            "skip": sParam[0].replace('skip=', ''),
            "take": sParam[1].replace('take=', '')
        }
    })
        .then(handleErrors)
        .then(response => response.json())
}