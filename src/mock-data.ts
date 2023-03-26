import { getUuid } from './lib/utils/uuid';
import { PositiveInteger } from './model/positive-integer';
import { TimingUnit } from './model/timing-unit';

export const MOCK_TIMING_UNITS: TimingUnit[] = [
  {
    id: getUuid(),
    name: 'Get ready...',
    length: 3000 as PositiveInteger,
  },
  {
    id: getUuid(),
    name: 'Left stretch',
    length: 5000 as PositiveInteger,
  },
  {
    id: getUuid(),
    name: 'Get ready...',
    length: 3000 as PositiveInteger,
  },
  {
    id: getUuid(),
    name: 'Right stretch',
    length: 5000 as PositiveInteger,
  },
];
