import axios from "axios";

const api = axios.create({
    baseURL: 'https://nkstoyproject.herokuapp.com',
    headers: {
        "Content-Type": `application/json`
    }
});

export {
    api
};