export default class ClientApi {

    static getAsanas = () => ClientApi.sendRequest('http://localhost:8080/asanas/all');
    static getNotes = () => ClientApi.sendRequest('http://localhost:8080/notes/all');
    static saveNewNote = (data: {}) =>  ClientApi.sendRequest('http://localhost:8080/notes/new', 'POST', data);

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

        return fetch(path, parameters)
        .then((resp) => ClientApi.handleErrors(resp));
    };
}