export default class ClientApi {

    static getAsanas = () => ClientApi.sendRequest('http://localhost:8080/asanas/all');
    static getNotes = () => ClientApi.sendRequest('http://localhost:8080/notes/all', 'GET');
    static getNotesSplits = () => ClientApi.sendRequest('http://localhost:8080/notes/splits', 'GET');
    static getRatings = () => ClientApi.sendRequest('http://localhost:8080/asanas/ratings');
    static getUsers = () => ClientApi.sendRequest('http://localhost:8080/users/all');
    static setPassword = (data: {}) =>  ClientApi.sendRequest('http://localhost:8080/users/password', 'POST', data);
    static saveNewNote = (data: {}) =>  ClientApi.sendRequest('http://localhost:8080/notes/new', 'POST', data);
    static saveRatingSplits = (data: {}) =>  ClientApi.sendRequest('http://localhost:8080/asanas/ratingsSaveSplits', 'POST', data);
    static saveRatingInversions = (data: {}) =>  ClientApi.sendRequest('http://localhost:8080/asanas/ratingsSaveInversions', 'POST', data);
    static saveRatingBends = (data: {}) =>  ClientApi.sendRequest('http://localhost:8080/asanas/ratingsSaveBends', 'POST', data);
    static deleteNote = (data: {}) =>  ClientApi.sendRequest('http://localhost:8080/notes/delete', 'DELETE', data);
    static saveImage = (data: {}) =>  ClientApi.sendRequest('http://localhost:8080/images/upload', 'POST', data);
    static getImages = () => ClientApi.sendRequest('http://localhost:8080/images/all');
    static register = (data: {}) =>  ClientApi.sendRequest('http://localhost:8080/register/register', 'POST', data);
    static setUser = (data: {}) => ClientApi.sendRequest('http://localhost:8080/register/setUser', 'POST', data);
    static getID = () => ClientApi.sendRequest('http://localhost:8080/register/getID');

    static handleErrors = (resp: any) => {
        if (resp.ok) {
            return resp.json();
        } else {
           console.log("error")
        }
    };

    static sendRequest = async (path: any, method = 'GET', data = {}) => {
        const parameters = {method: method, headers: new Headers()};
        if (method === 'POST') {
            const parameters = {method: method, headers: new Headers(), body: JSON.stringify(data)};
            parameters.headers.append('Content-Type', 'application/json');

            return fetch(path, parameters)
                .then((resp) => ClientApi.handleErrors(resp));
        }

        if (method === 'PUT') {
            const parameters = {method: method, headers: new Headers(), body: JSON.stringify(data)};
            parameters.headers.append('Content-Type', 'application/json');
            console.log(parameters);

            return fetch(path, parameters)
                .then((resp) => ClientApi.handleErrors(resp));
        }

        if (method === 'DELETE') {
            const parameters = {method: method, headers: new Headers(), body: JSON.stringify(data)};
            parameters.headers.append('Content-Type', 'application/json');

            return fetch(path, parameters)
                .then((resp) => ClientApi.handleErrors(resp))
        }

        return fetch(path, parameters)
            .then((resp) => ClientApi.handleErrors(resp));
    };
}