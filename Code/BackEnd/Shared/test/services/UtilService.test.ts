import 'mocha';
import {expect} from 'chai';
import sinon from 'sinon';

import UtilService from '../../src/services/UtilService';

describe('UtilService', async () => {
    describe('isValidDate', async() => {
        it('should return true for a valid date value', () => {
            const isValid = UtilService.isValidDate('2018-05-02T09:35:30.228Z');
            expect(isValid).true;
        });

        it('should return false for an ivalid date value', () => {
            const isValid = UtilService.isValidDate('abc');
            expect(isValid).false;
        });
    });
});