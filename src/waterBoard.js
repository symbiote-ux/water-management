class WaterBoard {
  constructor(commands) {
    this.commands = commands;
    this.apartmentDetails = { guest: 0 };
  }
  calcGuestBill() {
    const guestCount = this.apartmentDetails['guest'];
    const capacity = 300;
    const quantity = guestCount * capacity;
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
    const rate = 2;
    const remCost = volume * rate;
    const cost = value + remCost;
    return { quantity, cost };
  }
  calcBill(total) {
    const { quantity, cost } = this.calcGuestBill();
    const crpRatio = Number(this.apartmentDetails['corporation']);
    const borRatio = Number(this.apartmentDetails['borewell']);
    const crpVol = (total * crpRatio) / (crpRatio + borRatio);
    const borVol = (total * borRatio) / (crpRatio + borRatio);
    const totalVol = Math.floor(crpVol + borVol + quantity);
    const totalCost = Math.floor(crpVol + borVol * 1.5 + cost);
    return { totalVol, totalCost };
  }
  fetchBill() {
    const type = this.apartmentDetails.type;
    const capacity = { type2: 900, type3: 1500 };
    if (type == '2') {
      return this.calcBill(capacity.type2);
    }
    return this.calcBill(capacity.type3);
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
    this.commands.pop();
    this.commands.forEach((cmd) => {
      if (cmd[0] == 'ALLOT_WATER') this.allotWater(cmd[1], cmd[2]);
      if (cmd[0] == 'ADD_GUESTS') this.addGuests(cmd[1]);
    });
    return this.fetchBill();
  }
}

module.exports = WaterBoard;
