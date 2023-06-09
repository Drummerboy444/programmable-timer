import { useContext } from 'react';
import React, { View } from 'react-native';
import { GlobalContext } from '../../global-context/GlobalContext';
import { Button } from '../../lib/components/buttons/Button';
import { Timer, TimingUnit } from '../../model/types';
import { useSizes } from '../../theming/use-sizes';
import { Screen } from '../Screen';
import { TimingUnitForm } from './TimingUnitForm';
import { PlayButton } from './PlayButton';
import { TimingUnitListItem } from './TimingUnitListItem';
import { useTimer } from './useTimer';
import { appendTimeElapsed } from './appendTimeElapsed';
import { Uuid } from '../../lib/utils/uuid';

export const TimerFormScreen = ({
  timer,
  setTimer,
}: {
  timer: Timer;
  setTimer: (timer: Timer) => void;
}) => {
  const { small } = useSizes();

  const { setDrawerState } = useContext(GlobalContext);

  const addTimingUnit = (timingUnit: TimingUnit) => {
    setTimer({ ...timer, timingUnits: [...timer.timingUnits, timingUnit] });
  };

  const deleteTimingUnit = (idToRemove: Uuid) => {
    setTimer({
      ...timer,
      timingUnits: timer.timingUnits.filter(({ id }) => id !== idToRemove),
    });
  };

  const moveTimingUnitUp = (index: number) => {
    if (index === 0) return;

    const timingUnitsCopy = [...timer.timingUnits];
    const firstTimingUnit = timer.timingUnits[index - 1];
    const secondTimingUnit = timer.timingUnits[index];

    if (firstTimingUnit === undefined || secondTimingUnit === undefined) return;

    timingUnitsCopy[index - 1] = secondTimingUnit;
    timingUnitsCopy[index] = firstTimingUnit;

    setTimer({
      ...timer,
      timingUnits: timingUnitsCopy,
    });
  };

  const moveTimingUnitDown = (index: number) => {
    if (index === timer.timingUnits.length - 1) return;

    const timingUnitsCopy = [...timer.timingUnits];
    const firstTimingUnit = timer.timingUnits[index];
    const secondTimingUnit = timer.timingUnits[index + 1];

    if (firstTimingUnit === undefined || secondTimingUnit === undefined) return;

    timingUnitsCopy[index] = secondTimingUnit;
    timingUnitsCopy[index + 1] = firstTimingUnit;

    setTimer({
      ...timer,
      timingUnits: timingUnitsCopy,
    });
  };

  const openEditTimingUnitDrawer = (timingUnit: TimingUnit, index: number) => {
    setDrawerState({
      open: true,
      content: (
        <TimingUnitForm
          submitButtonText="Update"
          onSubmit={newTimingUnit => {
            const timingUnitsCopy = [...timer.timingUnits];
            timingUnitsCopy[index] = newTimingUnit;
            setTimer({ ...timer, timingUnits: timingUnitsCopy });
            setDrawerState({ open: false });
          }}
          defaultValues={timingUnit}
        />
      ),
    });
  };

  const openNewTimingUnitDrawer = () => {
    setDrawerState({
      open: true,
      content: (
        <TimingUnitForm
          submitButtonText="Create"
          onSubmit={timingUnit => {
            addTimingUnit(timingUnit);
            setDrawerState({ open: false });
          }}
        />
      ),
    });
  };

  const { playing, timeElapsed, togglePlaying, reset } = useTimer();

  return (
    <Screen style={{ justifyContent: 'space-between' }}>
      <View style={{ gap: small }}>
        {appendTimeElapsed(timer.timingUnits, timeElapsed).map(
          (timingUnitWithTimeElapsed, i) => (
            <TimingUnitListItem
              key={timingUnitWithTimeElapsed.id}
              timingUnitWithTimeElapsed={timingUnitWithTimeElapsed}
              canEdit={!playing}
              onEdit={() =>
                openEditTimingUnitDrawer(timingUnitWithTimeElapsed, i)
              }
              onMoveUp={() => moveTimingUnitUp(i)}
              onMoveDown={() => moveTimingUnitDown(i)}
              onDelete={() => deleteTimingUnit(timingUnitWithTimeElapsed.id)}
            />
          ),
        )}
        <Button title="New +" onPress={openNewTimingUnitDrawer} />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: small }}>
        <Button title="Reset" onPress={reset} />
        <PlayButton playing={playing} togglePlaying={togglePlaying} />
      </View>
    </Screen>
  );
};
