const axios = require('axios');

const baseURL = "https://suchonsite-server.herokuapp.com";
const URL = "https://suchonsite-server.herokuapp.com/people";

/**
 * GET request to specific endpoint
 * @param {string} endpoint 
 * @returns Promise of http response
 */
async function axiosGet(endpoint) {
    // create a promise for the axios request
    const promise = axios.get(endpoint);
    const dataPromise = promise.then((response) => response);
    return dataPromise;
}

/**
 * POST request to specific endpoint
 * @param {string} endpoint 
 * @returns Promise of http response
 */
 async function axiosPost(endpoint) {
    // create a promise for the axios request
    const promise = axios.post(endpoint);
    const dataPromise = promise.then((response) => response);
    return dataPromise;
}

/**
 * DELETE request to specific endpoint
 * @param {string} endpoint 
 * @returns Promise of http response
 */
 async function axiosDelete(endpoint) {
    // create a promise for the axios request
    const promise = axios.delete(endpoint);
    const dataPromise = promise.then((response) => response);
    return dataPromise;
}

/**
 * Test Suite No.1
 * Test status code of each path
 */
describe("Test status codes" , () => {
    /**
     * Test Case ID: 1
     * Test GET all people response status code
     * Expected Value : 200 - OK
     */
    test("Test status code GET all people", () => {
        const endpoint = URL + "/all";
        return axiosGet(endpoint)
        .then(data => {
            expect(data.status).toEqual(200);
        })
    });

    /**
     * Test Case ID: 2
     * Test GET people by_date:date response status code
     * when that date has values stored in database
     * Expected Value : 200 - OK
     */
    test("Test status code GET people by date", () => {
        const date = "11-11-2021";
        const endpoint = URL + "/by_date/" + date;
        return axiosGet(endpoint)
        .then(data => {
            expect(data.status).toEqual(200);
        })
    });

    /**
     * Test Case ID: 3
     * Test https status code from '/by_date/:date'
     * when that date has no value stored in database
     * Expected Value : 204 - No Content
     */
    test("Test status code GET people by date (no value)", () => {
        const date = "11-11-3000";
        const endpoint = URL + "/by_date/" + date;
        return axiosGet(endpoint)
        .then(data => {
            expect(data.status).toEqual(204);
        })
    });

    /**
     * Test Case ID: 4
     * Test invalid https status code from '/by_date/:date'
     * when date is invalid date format
     * Expected Value : 400 - Bad Input
     */
    test("Test status code GET people by date (invalid date param)", () => {
        const date = "11/11/2021"
        const endpoint = URL + "/by_date/" + date;
        return axiosGet(endpoint)
        .catch(res => {
            expect(res.response.status).toEqual(400);
        });
    });

    /**
     * Test Case ID: 5
     * Test status code of '/by_date/:date'
     * Expected value : 406 - Not Acceptable
     */
    test("Test status code GET people by date (empty date param)", () => {
        const date = "";
        const endpoint = URL + "/by_date/" + date;
        return axiosGet(endpoint)
        .catch(res => {
            let statusCode = res.response.status;
            expect(statusCode).toEqual(406);
        })
    });

     /**
     * Test Case ID: 6
     * Test status code of POST method when POST a data to database
     * Expected value : 200 - OK
     */
      test("Test status code POST people by date", () => {
        const date = "11-11-2030";
        const endpoint = baseURL + "/getDataFromGov/" + date;
        return axiosPost(endpoint)
        .catch(res => {
            expect(res.response.status).toEqual(200);
        })
    });

    /**
     * Test Case ID: 7
     * Test status code of POST method when POST duplicate data to database
     * Expected value : 401
     */
    test("Test status code duplicated POST people by date", () => {
        const date = "11-11-2030";
        const endpoint = baseURL + "/getDataFromGov/" + date;
        return axiosPost(endpoint)
        .catch(res => {
            expect(res.response.status).toEqual(401);
        })
    });

    /**
     * Test Case ID: 8
     * Test status code of DELETE method when DELETE a date from database
     * Expected value : 200 - OK
     */
    test("Test status code DELETE people by date", () => {
        const date = "11-11-2030";
        const endpoint = URL + "/by_date/" + date;
        return axiosDelete(endpoint)
        .then(res => {
            console.log(res);
            expect(res.status).toEqual(200);
        })
    })
});

/**
 * Test Suite No.2
 * Test Structure of response data
 */
describe("Test response data structure" , () => {
    /**
     * Test Case ID: 9
     * Test structure of '/by_date/:date' response
     * when that date have values stored in database
     */
    test("Test GET all people structure", () => {
        const endpoint = URL + "/all";
        return axiosGet(endpoint)
        .then((res) => {
            expect(res).toEqual(expect.any(Object))
        })
    });

    /**
     * Test Case ID: 10
     * Test structure of '/by_date/:date' response
     * when that date hav values stored in database
     */
    test("Test GET people by date structure", () => {
        const date = "11-11-2021"
        const endpoint = URL + "/by_date/" + date;
        return axiosGet(endpoint)
        .then((res) => {
            const data = res.data;
            expect(data._id).toEqual(expect.any(String))
            expect(data.date).toEqual(expect.any(String))
            expect(data.people).toEqual(expect.any(Object))
        })
    });

    /**
     * Test Case ID: 11
     * Test structure of '/by_date/:date' response
     * when that date has no value stored in database
     */
    test("Test GET people by date structure (no value)", () => {
        const date = "11-11-3000"
        const endpoint = URL + "/by_date/" + date;
        return axiosGet(endpoint)
        .then((res) => {
            const data = res.data;
            expect(data._id).toEqual(expect.any(String))
            expect(data.date).toEqual(expect.any(String))
            expect(data.people).toEqual(expect.any(Object))
        })
    });

    /**
     * Test Case ID: 12
     * Test structure of a person from '/by_date/:date' response
     */
    test("Test GET a person in people by date structure", () => {
        const date = "11-11-2021";
        const endpoint = URL + "/by_date/" + date;
        return axiosGet(endpoint)
        .then((res) => {
            const person = res.data.people[0];
            expect(person.reservation_id).toEqual(expect.any(Number));
            expect(person.register_timestamp).toEqual(expect.any(String));
            expect(person.name).toEqual(expect.any(String));
            expect(person.surname).toEqual(expect.any(String));
            expect(person.birth_date).toEqual(expect.any(String));
            expect(person.citizen_id).toEqual(expect.any(String));
            expect(person.occupation).toEqual(expect.any(String));
            expect(person.address).toEqual(expect.any(String));
        });
    });

    /**
     * Test Case ID: 13
     * Test POST response message when post duplicate people to database
     * Expected value : "already have data in this date."
     */
    test("Test POST response message when post duplicate people to database", () => {
        const date = "11-11-2021";
        const endpoint = baseURL + "/getDataFromGov/" + date;
        return axiosPost(endpoint)
        .catch(res => {
            const data = res.response.data;
            expect(data.msg).toEqual("already have data in this date.");
        });
    });
});
