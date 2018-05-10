import fetch from 'node-fetch';

export default class HttpServiceBase {
    protected async get(url: string){
        const response = await fetch(url);
        const json = await response.json();
        console.log(json);
        return json;
    }
}