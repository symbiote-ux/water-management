class WaterBoard {
  constructor(commands) {
    this.commands = commands;
    this.apartmentDetails = { guest: 0 };
    this.borewellRate = 1.5;
    this.personCapacity = 300;
    this.slabRate = [3000, 8, 1500, 5, 500, 3];
  }
  estimateCost(volume) {
    let cost = 0;
    for (let i = 0; i < this.slabRate.length; i += 2) {
      if (volume > this.slabRate[i]) {
        volume -= this.slabRate[i];
        cost += volume * this.slabRate[i + 1];
        volume = thi.slabRate[i];
      }
    }
    return {cost,}
  }
  calcGuestBill() {
    const guestCount = this.apartmentDetails['guest'];
    const quantity = guestCount * this.personCapacity;

    // const guestCount = this.apartmentDetails['guest'];
    // const capacity = 300;
    // const quantity = guestCount * capacity;
    // let value = 0;
    // let volume = quantity;
    // const rateList = [3000, 8, 1500, 5, 500, 3];
    // for (let i = 0; i < rateList.length; i += 2) {
    //   if (volume > rateList[i]) {
    //     volume = volume - rateList[i];
    //     value += volume * rateList[i + 1];
    //     volume = rateList[i];
    //   }
    // }
    // const rate = 2;
    const cost = value + volume * rate;
    return { quantity, cost };
  }
  getVolume(total) {
    const corpRatio = Number(this.apartmentDetails['corp']);
    const borRatio = Number(this.apartmentDetails['boreWell']);
    return Math.floor((total * corpRatio) / (corpRatio + borRatio));
  }
  calcBill(total) {
    const corpVol = this.getVolume(total);
    const borVol = total - corpVol;
    const { quantity, cost } = this.calcGuestBill();
    const totalVol = corpVol + borVol + quantity;
    const totalCost = corpVol + Math.ceil(borVol * this.borewellRate) + cost;
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
    const guestPresent = this.apartmentDetails.guest;
    this.apartmentDetails['guest'] = Number(guestPresent) + Number(count);
  }
  allotWater(type, ratio) {
    this.apartmentDetails['type'] = type;
    const [corp, borewell] = ratio.split(':');
    this.apartmentDetails['corp'] = corp;
    this.apartmentDetails['borewell'] = borewell;
  }
  parse(command) {
    if (command[0] == 'ALLOT_WATER') {
      return this.allotWater(command[1], command[2]);
    }
    return this.addGuests(command[1]);
  }
  getBill() {
    this.commands.pop();
    this.commands.forEach((command) => {
      this.parse(command);
    });
    return this.fetchBill();
  }
}

module.exports = WaterBoard;
