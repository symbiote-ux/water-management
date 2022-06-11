class WaterBoard {
  constructor(commands) {
    this.commands = commands;
    this.apartmentDetails = { guest: 0 };
  }
  calcGuestBill() {
    const guestCount = this.apartmentDetails['guest'];
    const quantity = guestCount * 300;
    let value = 0;
    let volume = quantity;
    const rateList = [3000, 8, 1500, 5, 500, 3];
    for (let i = 0; i < rateList.length; i += 2) {
      if (volume > rateList[i]) {
        volume = volume - rateList[i];
        value = volume * rateList[i + 1];
        volume = rateList[i];
      }
    }
    const remCost = volume * 2;
    const cost = value + remCost;
    return { quantity, cost };
  }
  calcBill(total) {
    const { quantity, cost } = this.calcGuestBill();
    const crpRatio = Number(this.apartmentDetails['corporation']);
    const borRatio = Number(this.apartmentDetails['borewell']);
    const crpVol = (total * crpRatio) / (crpRatio + borRatio);
    const borVol = (total * borRatio) / (crpRatio + borRatio);
    const totalVol = crpVol + borVol + quantity;
    const totalCost = crpVol + borVol * 1.5 + cost;
    return { totalVol, totalCost };
  }
  fetchBill() {
    const type = this.apartmentDetails.type;
    if (type == '2') {
      return this.calcBill(900);
    }
    return this.calcBill(1500);
  }
  addGuests(count) {
    let guestPresent = this.apartmentDetails.guest;
    this.apartmentDetails['guest'] = Number(guestPresent) + Number(count);
  }
  allotWater(type, ratio) {
    this.apartmentDetails['type'] = type;
    const [corporation, borewell] = ratio.split(':');
    this.apartmentDetails['corporation'] = corporation;
    this.apartmentDetails['borewell'] = borewell;
  }
  getBill() {
    for (let i = 0; i < this.commands.length - 1; i++) {
      if (this.commands[i][0] == 'ALLOT_WATER') {
        this.allotWater(this.commands[i][1], this.commands[i][2]);
      }
      if (this.commands[i][0] == 'ADD_GUESTS') {
        this.addGuests(this.commands[i][1]);
      }
    }
    return this.fetchBill();
  }
}

module.exports = WaterBoard;
