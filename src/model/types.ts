import { Uuid } from '../lib/utils/uuid';

export type AutomaticTimingUnit = {
  id: Uuid;
  type: 'automatic';
  name: string;
  length: number;
};

export type ManualTimingUnit = {
  id: Uuid;
  type: 'manual';
  name: string;
};

export type TimingUnit = AutomaticTimingUnit | ManualTimingUnit;

export type Timer = {
  id: Uuid;
  name: string;
  timingUnits: TimingUnit[];
};
