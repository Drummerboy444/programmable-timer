import { Uuid } from '../lib/utils/uuid';

export type TimingUnit = {
  id: Uuid;
  name: string;
  length: number;
};

export type Timer = {
  id: Uuid;
  name: string;
  timingUnits: TimingUnit[];
};
