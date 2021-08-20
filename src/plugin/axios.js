import axios from "axios";

const api = axios.create({
    baseURL: 'https://publisherks.github.io/my-json-server/',
    headers: {
        "Content-Type": `application/json`
    }
});

export {
    api
};