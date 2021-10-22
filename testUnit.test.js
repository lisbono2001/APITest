const axios = require('axios');

const URL = "https://suchonsite-server.herokuapp.com/people";

/**
 * Test Case ID: 1
 * Test https status code from '/all'
 */
test("Test get all people status code", () => {
    const endpoint = URL + "/all";
    axios.get(endpoint)
    .then((response) => {
        expect(response.status).toEqual(200);
    });
});

/**
 * Test Case ID: 2
 * Test https status code from '/by_date/:date'
 */
test("Test get people by date status", () => {
    const date = "20-10-2021"
    const endpoint = URL + "/by_date/" + date;
    axios.get(endpoint)
    .then((response) => {
        expect(response.status).toEqual(200);
    });
});

/**
 * Test Case ID: 3
 * Test invalid https status code from '/by_date/:date'
 */
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

/**
 * Test Case ID: 4
 * Test date value matching from '/by_date/:date'
 */
test("Test date get people by date", () => {
    const date = "20-10-2021"
    const endpoint = URL + "/by_date/" + date;
    axios.get(endpoint)
    .then((response) => {
        const data = response.data;
        expect(data.date).toEqual(date);
    });
});

/**
 * Test Case ID: 5
 * Test structure of '/by_date/:date' response
 */
test("Test get all people structure", () => {
    const date = "20-10-2021"
    const endpoint = URL + "/by_date/" + date;
    axios.get(endpoint)
    .then((response) => {
        const data = response.data;
        expect(data._id).toEqual(expect.any(String))
        expect(data.date).toEqual(expect.any(String))
        expect(data.people).toEqual(expect.any(Object))
    })
});

/**
 * Test Case ID: 6
 * Test structure of a person from '/by_date/:date' response
 */
test("Test a people structure", () => {
    const date = "20-10-2021"
    const endpoint = URL + "/by_date/" + date;
    axios.get(endpoint)
    .then((response) => {
        const person = response.data.people[0];
        expect(person.reservation_id).toEqual(expect.any(Number))
        expect(person.register_timestamp).toEqual(expect.any(String))
        expect(person.name).toEqual(expect.any(String))
        expect(person.surname).toEqual(expect.any(String))
        expect(person.birth_date).toEqual(expect.any(String))
        expect(person.citizen_id).toEqual(expect.any(String))
        expect(person.occupation).toEqual(expect.any(String))
        expect(person.address).toEqual(expect.any(String))
    })
});

