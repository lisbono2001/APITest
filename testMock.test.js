const axios = require('./axiosConfig');

const getPeopleByDate = async (date) => {
    const result = await axios.request({
        method: 'get',
        url: `/by_date/${date}`
    });
    return result;
};

//create mock object
jest.mock('./axiosConfig', () => {
    return {
        baseURL: 'https://suchonsite-server.herokuapp.com/people',
        request: jest.fn().mockResolvedValue({
            _id: '617042a299a86369e7ba81f5',
            date: '20-10-2021',
            people: [
              {
                reservation_id: 1,
                register_timestamp: '2021-10-20T15:19:56.609000',
                name: 'Jean',
                surname: 'string',
                birth_date: '2021-10-20',
                citizen_id: '1234567890123',
                occupation: 'string',
                address: 'string',
                priority: '2'
              },
              {
                reservation_id: 2,
                register_timestamp: '2021-10-20T15:25:16.576000',
                name: 'panida',
                surname: 'ounnaitham',
                birth_date: '2000-11-02',
                citizen_id: '1129901628994',
                occupation: 'student',
                address: 'nonthaburi',
                priority: '2'
              },
            ]
        }),
    }
});

/**
 * Tring to use mock tesing for test fetching data from '/by_date/:date'
 */
describe('test getPeopleByDate mock', () => {
    // reset the state of all mocks.
    afterEach(() => jest.resetAllMocks());

    test('fetches reservations by date', async () => {
        const data = await getPeopleByDate('20-10-2021');
        expect(axios.request).toHaveBeenCalled();
        expect(axios.request).toHaveBeenCalledWith({ method: 'get', url: '/by_date/20-10-2021' });
        expect(data.date).toEqual('20-10-2021');
    });
});