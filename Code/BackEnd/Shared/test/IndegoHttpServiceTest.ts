import 'mocha';
import {expect} from 'chai';
import IndegoHttpService from '../src/http/IndegoHttpService';

describe('IndegoHttpService', function() {
  describe("When not stubbed", () => {
    it('should return Indego Stations JSON - Live', async function() {
      // const indegoHttpService = new IndegoHttpService();
      // const json = await indegoHttpService.getIndegoStations(true);
      // // Ensure the response is not null
      // expect(typeof json).to.equal('object');
      // // Ensure response has the right shape
      // expect(json.features.count).greaterThan(0);
    });
  });

  describe("When stubbed", () => {
    describe('#getIndegoStations()', function() {
      
    });
  });
});