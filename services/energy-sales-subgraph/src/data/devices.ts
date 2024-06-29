import { Collection, Db } from 'mongodb';
import { Device } from '@generated/resolvers-types';
import { DEVICES } from 'data';

export class Devices {
  devices: Collection<Device>;

  constructor(db: Db) {
    this.devices = db.collection(DEVICES) as Collection<Device>;
  }
}
