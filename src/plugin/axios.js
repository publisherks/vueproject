import axios from "axios";

const api = axios.create({
    baseURL: process.env.VUE_APP_API,
    // headers: {
    //     "Content-Type": `application/json`
    // }
});

console.log(process.env);
export {
    api
};