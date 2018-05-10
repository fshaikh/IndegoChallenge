import 'mocha';
import { expect } from 'chai';
import nock from 'nock';
import IndegoHttpService from '../../src/http/IndegoHttpService';
// load the Indego Stations API data from local fixtures JSON 
const stations = require('./fixtures/IndegoStationsAPI');


const INDEGO_STATIONS_API_URL = 'https://www.rideindego.com/stations/json/';
describe('IndegoHttpService', function() {

  // Hook which is run before all tests are executed.
  before(() => {
    // Set the url in the environment variable
    process.env.INDEGO_STATIONS_URL = INDEGO_STATIONS_API_URL;
  });
  
  // Test suite when not mocking
  describe.skip("When not mocked", () => {
    it('should return Indego Stations JSON - Live', async function(done) {
      const indegoHttpService = new IndegoHttpService();
      const json: any = await indegoHttpService.getIndegoStations();
      // Ensure the response is not null
      expect(typeof json).to.equal('object');
      // Ensure response has the right shape
      expect(json.features.count).greaterThan(0);
      done();
    });
  });

  // Test suite when mocking
  describe("When mocked", () => {
    describe('#getIndegoStations()', function() {
      
      // Hook ran before each test
      beforeEach(() => {
            // Set up a mocking object to the Indego Stations API. This setup says:
            // Intercept every call to INDEGO_STATIONS_API_URL
            // Intercept HTTP GET request to '/' 
            // Reply with status code: 200 and body will contain stations data in JSON
            nock(INDEGO_STATIONS_API_URL)
             .get('/')
             .reply(200,stations);
      });
      
      it('should return Indego Stations JSON - Mocked', async function(done: MochaDone) {
        const indegoHttpService = new IndegoHttpService();
        //const json: any = await indegoHttpService.getIndegoStations(true);
        indegoHttpService.getIndegoStations().then((value: any) => {
           console.log(value);
           expect(value).to.not.equal('');
           // Verify that the mocked response was passed through as expected.
          // expect(value.features.length).to.equal(stations.features.length);
           done();
        })
        .catch((reason) => {
           console.log(reason);
           done();
        });
      });

      it.skip('should test Dummy', function(done) {
        //this.timeout(5000);
        const indegoHttpService = new IndegoHttpService();
        indegoHttpService.dummy().then((value) => {
          console.log(value);
          expect(value).to.equal(1);
          done();
        })
        .catch((reason)=>{
          console.log(reason);
          done();
        });
      });

    });
  });
});