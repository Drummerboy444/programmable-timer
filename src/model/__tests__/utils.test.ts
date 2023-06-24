import { getUuid } from '../../lib/utils/uuid';
import { Timer, TimingUnit } from '../types';
import { deserialiseTimers, serialiseTimers } from '../utils';

describe('serialiseTimers', () => {
  it('should serialise and empty array to an empty string', () => {
    expect(serialiseTimers([])).toBe('');
  });

  it('should serialise a single empty timer', () => {
    const emptyTimer: Timer = {
      id: getUuid(),
      name: 'Timer name',
      timingUnits: [],
    };
    const timers = [emptyTimer];

    expect(serialiseTimers(timers)).toBe(`${emptyTimer.id}~%~Timer name~%~[]`);
  });

  it('should serialise a single non-empty timer', () => {
    const timingUnit1: TimingUnit = {
      id: getUuid(),
      type: 'automatic',
      name: 'Timing unit 1 name',
      length: 1020,
    };
    const timingUnit2: TimingUnit = {
      id: getUuid(),
      type: 'automatic',
      name: 'Timing unit 2 name',
      length: 3040,
    };
    const timingUnit3: TimingUnit = {
      id: getUuid(),
      type: 'automatic',
      name: 'Timing unit 3 name',
      length: 5060,
    };
    const nonEmptyTimer: Timer = {
      id: getUuid(),
      name: 'Timer name',
      timingUnits: [timingUnit1, timingUnit2, timingUnit3],
    };
    const timers = [nonEmptyTimer];

    expect(serialiseTimers(timers)).toBe(
      `${nonEmptyTimer.id}~%~Timer name~%~[` +
        `${timingUnit1.id}~#~Timing unit 1 name~#~1020` +
        '~#~#~#~' +
        `${timingUnit2.id}~#~Timing unit 2 name~#~3040` +
        '~#~#~#~' +
        `${timingUnit3.id}~#~Timing unit 3 name~#~5060` +
        ']',
    );
  });

  it('should serialise multiple empty timers', () => {
    const emptyTimer1: Timer = {
      id: getUuid(),
      name: 'Timer 1 name',
      timingUnits: [],
    };
    const emptyTimer2: Timer = {
      id: getUuid(),
      name: 'Timer 2 name',
      timingUnits: [],
    };
    const emptyTimer3: Timer = {
      id: getUuid(),
      name: 'Timer 3 name',
      timingUnits: [],
    };
    const timers = [emptyTimer1, emptyTimer2, emptyTimer3];

    expect(serialiseTimers(timers)).toBe(
      `${emptyTimer1.id}~%~Timer 1 name~%~[]` +
        '~%~%~%~' +
        `${emptyTimer2.id}~%~Timer 2 name~%~[]` +
        '~%~%~%~' +
        `${emptyTimer3.id}~%~Timer 3 name~%~[]`,
    );
  });

  it('should serialise multiple non-empty timers', () => {
    const timingUnit1: TimingUnit = {
      id: getUuid(),
      type: 'automatic',
      name: 'Timing unit 1 name',
      length: 1020,
    };
    const timingUnit2: TimingUnit = {
      id: getUuid(),
      type: 'automatic',
      name: 'Timing unit 2 name',
      length: 3040,
    };
    const nonEmptyTimer1: Timer = {
      id: getUuid(),
      name: 'Timer 1 name',
      timingUnits: [timingUnit1, timingUnit2],
    };
    const timingUnit3: TimingUnit = {
      id: getUuid(),
      type: 'automatic',
      name: 'Timing unit 3 name',
      length: 5060,
    };
    const timingUnit4: TimingUnit = {
      id: getUuid(),
      type: 'automatic',
      name: 'Timing unit 4 name',
      length: 7080,
    };
    const nonEmptyTimer2: Timer = {
      id: getUuid(),
      name: 'Timer 2 name',
      timingUnits: [timingUnit3, timingUnit4],
    };
    const timers = [nonEmptyTimer1, nonEmptyTimer2];

    expect(serialiseTimers(timers)).toBe(
      `${nonEmptyTimer1.id}~%~Timer 1 name~%~[` +
        `${timingUnit1.id}~#~Timing unit 1 name~#~1020` +
        '~#~#~#~' +
        `${timingUnit2.id}~#~Timing unit 2 name~#~3040` +
        ']' +
        '~%~%~%~' +
        `${nonEmptyTimer2.id}~%~Timer 2 name~%~[` +
        `${timingUnit3.id}~#~Timing unit 3 name~#~5060` +
        '~#~#~#~' +
        `${timingUnit4.id}~#~Timing unit 4 name~#~7080` +
        ']',
    );
  });
});

describe('deserialiseTimers', () => {
  it('should deserialise an empty string to an empty array', () => {
    expect(deserialiseTimers('')).toEqual([]);
  });

  it('should deserialise a single empty timer', () => {
    const emptyTimer: Timer = {
      id: getUuid(),
      name: 'Timer name',
      timingUnits: [],
    };
    const timers = [emptyTimer];

    expect(deserialiseTimers(`${emptyTimer.id}~%~Timer name~%~[]`)).toEqual(
      timers,
    );
  });

  it('should deserialise a single non-empty timer', () => {
    const timingUnit1: TimingUnit = {
      id: getUuid(),
      type: 'automatic',
      name: 'Timing unit 1 name',
      length: 1020,
    };
    const timingUnit2: TimingUnit = {
      id: getUuid(),
      type: 'automatic',
      name: 'Timing unit 2 name',
      length: 3040,
    };
    const timingUnit3: TimingUnit = {
      id: getUuid(),
      type: 'automatic',
      name: 'Timing unit 3 name',
      length: 5060,
    };
    const nonEmptyTimer: Timer = {
      id: getUuid(),
      name: 'Timer name',
      timingUnits: [timingUnit1, timingUnit2, timingUnit3],
    };
    const timers = [nonEmptyTimer];

    expect(
      deserialiseTimers(
        `${nonEmptyTimer.id}~%~Timer name~%~[` +
          `${timingUnit1.id}~#~Timing unit 1 name~#~1020` +
          '~#~#~#~' +
          `${timingUnit2.id}~#~Timing unit 2 name~#~3040` +
          '~#~#~#~' +
          `${timingUnit3.id}~#~Timing unit 3 name~#~5060` +
          ']',
      ),
    ).toEqual(timers);
  });

  it('should deserialise multiple empty timers', () => {
    const emptyTimer1: Timer = {
      id: getUuid(),
      name: 'Timer 1 name',
      timingUnits: [],
    };
    const emptyTimer2: Timer = {
      id: getUuid(),
      name: 'Timer 2 name',
      timingUnits: [],
    };
    const emptyTimer3: Timer = {
      id: getUuid(),
      name: 'Timer 3 name',
      timingUnits: [],
    };
    const timers = [emptyTimer1, emptyTimer2, emptyTimer3];

    expect(
      deserialiseTimers(
        `${emptyTimer1.id}~%~Timer 1 name~%~[]` +
          '~%~%~%~' +
          `${emptyTimer2.id}~%~Timer 2 name~%~[]` +
          '~%~%~%~' +
          `${emptyTimer3.id}~%~Timer 3 name~%~[]`,
      ),
    ).toEqual(timers);
  });

  it('should deserialise multiple non-empty timers', () => {
    const timingUnit1: TimingUnit = {
      id: getUuid(),
      type: 'automatic',
      name: 'Timing unit 1 name',
      length: 1020,
    };
    const timingUnit2: TimingUnit = {
      id: getUuid(),
      type: 'automatic',
      name: 'Timing unit 2 name',
      length: 3040,
    };
    const nonEmptyTimer1: Timer = {
      id: getUuid(),
      name: 'Timer 1 name',
      timingUnits: [timingUnit1, timingUnit2],
    };
    const timingUnit3: TimingUnit = {
      id: getUuid(),
      type: 'automatic',
      name: 'Timing unit 3 name',
      length: 5060,
    };
    const timingUnit4: TimingUnit = {
      id: getUuid(),
      type: 'automatic',
      name: 'Timing unit 4 name',
      length: 7080,
    };
    const nonEmptyTimer2: Timer = {
      id: getUuid(),
      name: 'Timer 2 name',
      timingUnits: [timingUnit3, timingUnit4],
    };
    const timers = [nonEmptyTimer1, nonEmptyTimer2];

    expect(
      deserialiseTimers(
        `${nonEmptyTimer1.id}~%~Timer 1 name~%~[` +
          `${timingUnit1.id}~#~Timing unit 1 name~#~1020` +
          '~#~#~#~' +
          `${timingUnit2.id}~#~Timing unit 2 name~#~3040` +
          ']' +
          '~%~%~%~' +
          `${nonEmptyTimer2.id}~%~Timer 2 name~%~[` +
          `${timingUnit3.id}~#~Timing unit 3 name~#~5060` +
          '~#~#~#~' +
          `${timingUnit4.id}~#~Timing unit 4 name~#~7080` +
          ']',
      ),
    ).toEqual(timers);
  });

  it('should handle an invalid timer', () => {
    expect(deserialiseTimers('Invalid timer')).toEqual([]);
  });

  it('should handle an invalid timing unit', () => {
    const id = getUuid();
    expect(
      deserialiseTimers(`${id}~%~Timer name~%~[Invalid timing unit]`),
    ).toEqual([
      {
        id,
        name: 'Timer name',
        timingUnits: [],
      },
    ]);
  });
});

it('should serialise and deserialise a complex list of timers', () => {
  const timers: Timer[] = [
    {
      id: getUuid(),
      name: 'Timer 1 name',
      timingUnits: [],
    },
    {
      id: getUuid(),
      name: 'Timer 2 name',
      timingUnits: [
        {
          id: getUuid(),
          type: 'automatic',
          name: 'Timing unit 1 name',
          length: 1000,
        },
      ],
    },
    {
      id: getUuid(),
      name: 'Timer 3 name',
      timingUnits: [
        {
          id: getUuid(),
          type: 'manual',
          name: 'Timing unit 2 name ',
        },
      ],
    },
    {
      id: getUuid(),
      name: 'Timer 3 name',
      timingUnits: [
        {
          id: getUuid(),
          type: 'automatic',
          name: 'Timing unit 3 name',
          length: 1010,
        },
        {
          id: getUuid(),
          type: 'automatic',
          name: 'Timing unit 4 name',
          length: 1020,
        },
        {
          id: getUuid(),
          type: 'automatic',
          name: 'Timing unit 5 name',
          length: 1030,
        },
      ],
    },
    {
      id: getUuid(),
      name: 'Timer 4 name',
      timingUnits: [
        {
          id: getUuid(),
          type: 'manual',
          name: 'Timing unit 6 name ',
        },
        {
          id: getUuid(),
          type: 'manual',
          name: 'Timing unit 7 name ',
        },
        {
          id: getUuid(),
          type: 'manual',
          name: 'Timing unit 8 name ',
        },
      ],
    },
    {
      id: getUuid(),
      name: 'Timer 5 name',
      timingUnits: [
        {
          id: getUuid(),
          type: 'manual',
          name: 'Timing unit 9 name ',
        },
        {
          id: getUuid(),
          type: 'automatic',
          name: 'Timing unit 10 name ',
          length: 2040,
        },
        {
          id: getUuid(),
          type: 'manual',
          name: 'Timing unit 11 name ',
        },
        {
          id: getUuid(),
          type: 'automatic',
          name: 'Timing unit 12 name ',
          length: 2050,
        },
      ],
    },
  ];
  expect(deserialiseTimers(serialiseTimers(timers))).toEqual(timers);
});
