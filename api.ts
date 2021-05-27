export default class ClientApi {

    static getAsanas = () => ClientApi.sendRequest('http://localhost:8080/asanas/all');

    static handleErrors = (resp: any) => {
        console.log(resp);
        if (resp.ok) {
            return resp.json();
        } else {
           console.log("error")
        }
    };

    static sendRequest = async (path: any, method = 'GET', data = {}) => {
        const parameters = {method: method, headers: new Headers()};
        if (method === 'POST') {
            parameters.headers.append('Content-Type', 'application/json');
        }

        return fetch(path, parameters)
        .then((resp) => ClientApi.handleErrors(resp));
    };
}