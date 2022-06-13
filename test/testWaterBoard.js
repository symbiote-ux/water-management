const { assert } = require('chai');
const WaterBoard = require('../src/waterBoard');

describe('WaterBoard', () => {
  describe('getBill', () => {
    it('should return the final bill of the apartment', () => {
      const commands = [
        ['ALLOT_WATER', '2', '3:7'],
        ['ADD_GUESTS', '2'],
        ['ADD_GUESTS', '3'],
        ['BILL'],
      ];
      const waterBoard = new WaterBoard(commands);
      const expected = { totalVol: 2400, totalCost: 5215 };
      assert.deepStrictEqual(waterBoard.getBill(), expected);
    });
  });
  describe('allotWater', () => {
    it('should allot the water to the apartment in given ratio', () => {
      const commands = [
        ['ALLOT_WATER', '2', '3:7'],
        ['ADD_GUESTS', '2'],
        ['ADD_GUESTS', '3'],
        ['BILL'],
      ];
      const waterBoard = new WaterBoard(commands);
      const expected = { guest: 0, type: '2', corp: 3, borewell: 7 };
      waterBoard.allotWater('2', '3:7');
      assert.deepStrictEqual(waterBoard.apartmentDetails, expected);
    });
  });
  describe('addGuests', () => {
    it('should add guest to the apartment', () => {
      const commands = [
        ['ALLOT_WATER', '2', '3:7'],
        ['ADD_GUESTS', '2'],
        ['ADD_GUESTS', '3'],
        ['BILL'],
      ];
      const waterBoard = new WaterBoard(commands);
      const expected = { guest: 5 };
      waterBoard.addGuests('2');
      waterBoard.addGuests('3');
      assert.deepStrictEqual(waterBoard.apartmentDetails, expected);
    });
  });
  describe('fetchBill', () => {
    it('should fetch bill according to type of apartment i.e. 2BHK', () => {
      const commands = [['ALLOT_WATER', '2', '1:2'], ['BILL']];
      const waterBoard = new WaterBoard(commands);
      waterBoard.allotWater('2', '1:2');
      const expected = { totalVol: 900, totalCost: 1200 };
      assert.deepStrictEqual(waterBoard.fetchBill(), expected);
    });
    it('should fetch bill according to type of apartment i.e. 3BHK', () => {
      const commands = [['ALLOT_WATER', '3', '1:2'], ['BILL']];
      const waterBoard = new WaterBoard(commands);
      waterBoard.allotWater('3', '1:2');
      const expected = { totalVol: 1500, totalCost: 2000 };
      assert.deepStrictEqual(waterBoard.fetchBill(), expected);
    });
  });
  describe('calcBill', () => {
    it('should return calculated bill', () => {
      const commands = [
        ['ALLOT_WATER', '2', '3:7'],
        ['ADD_GUESTS', '2'],
        ['ADD_GUESTS', '3'],
        ['BILL'],
      ];
      const waterBoard = new WaterBoard(commands);
      waterBoard.allotWater('2', '3:7');
      waterBoard.addGuests('2');
      waterBoard.addGuests('3');
      assert.deepStrictEqual(waterBoard.calcBill(900), {
        totalVol: 2400,
        totalCost: 5215,
      });
    });
  });
  describe('getVolume', () => {
    it('should return volume of water consumption', () => {
      const commands = [['ALLOT_WATER', '2', '3:7'], ['BILL']];
      const waterBoard = new WaterBoard(commands);
      waterBoard.allotWater('2', '3:7');
      assert.deepStrictEqual(waterBoard.getVolume(900), 270);
    });
  });
  describe('calcGuestBill', () => {
    it('should calculate guest bill', () => {
      const commands = [
        ['ALLOT_WATER', '2', '3:7'],
        ['ADD_GUESTS', '2'],
        ['ADD_GUESTS', '3'],
        ['BILL'],
      ];
      const waterBoard = new WaterBoard(commands);
      waterBoard.allotWater('2', '3:7');
      waterBoard.addGuests('2');
      waterBoard.addGuests('3');
      assert.deepStrictEqual(waterBoard.calcGuestBill(), {
        quantity: 1500,
        cost: 4000,
      });
    });
  });
});
