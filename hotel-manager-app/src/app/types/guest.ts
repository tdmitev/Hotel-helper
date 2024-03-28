export interface Guest {
    _id?: string;
    name: string;
    age: number;
    tel: string;
    gender: 'male' | 'female' | 'other';
    roomNumber: number;
    stayPeriod: {
      from: Date;
      to: Date;
    };
    view: 'sea' | 'pool' | 'garden' | 'mountain';
    occupancyStatus: 'occupied' | 'vacant' | 'reserved';
  }