import { Uuid } from '../lib/utils/uuid';
import { PositiveInteger } from './positive-integer';

export type TimingUnit = {
  id: Uuid;
  name: string;
  length: PositiveInteger;
};

export type Timer = {
  id: Uuid;
  name: string;
  timingUnits: TimingUnit[];
};
