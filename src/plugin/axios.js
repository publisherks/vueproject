import axios from "axios";

const api = axios.create({
    baseURL: 'http://my-json-server.typicode.com/publisherks',
    headers: {
        "Content-Type": `application/json`
    }
});

export {
    api
};