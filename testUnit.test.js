const axios = require('axios');

const URL = "https://suchonsite-server.herokuapp.com/people";

test("Sanity check", () => {
    expect(true).toBe(true);
});

test("Test get all people status code", () => {
    const endpoint = URL + "/all";
    axios.get(endpoint)
    .then((response) => {
        expect(response.status).toEqual(200);
    });
});

test("Test get people by date status", () => {
    const date = "20-10-2021"
    const endpoint = URL + "/by_date/" + date;
    axios.get(endpoint)
    .then((response) => {
        expect(response.status).toEqual(200);
    });
});

test("Test invalid get people by date status", () => {
    const date = "20/10/2021"
    const endpoint = URL + "/by_date/" + date;
    axios.get(endpoint)
    .then((response) => {
    })
    .catch(error => {
        expect(error.response.status).toEqual(404);
    });
    
});

test("Test date get people by date", () => {
    const date = "20-10-2021"
    const endpoint = URL + "/by_date/" + date;
    axios.get(endpoint)
    .then((response) => {
        const data = response.data;
        expect(data.date).toEqual(date);
    });
});