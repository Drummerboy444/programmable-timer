import { useContext } from 'react';
import React, { View } from 'react-native';
import { GlobalContext } from '../../global-context/GlobalContext';
import { Button } from '../../lib/components/buttons/Button';
import { Timer, TimingUnit } from '../../model/types';
import { useSizes } from '../../theming/use-sizes';
import { Screen } from '../Screen';
import { TimingUnitForm } from './TimingUnitForm';
import { TimingUnitFormListItem } from './TimingUnitFormListItem';

export const TimerFormScreen = ({
  timer,
  setTimer,
}: {
  timer: Timer;
  setTimer: (timer: Timer) => void;
}) => {
  const { small } = useSizes();

  const { setDrawerState, setNavigationState } = useContext(GlobalContext);

  const setTimingUnits = (timingUnits: TimingUnit[]) => {
    setTimer({ ...timer, timingUnits });
  };

  const swapTimingUnits = (index1: number, index2: number) => {
    const timingUnitsCopy = [...timer.timingUnits];
    const firstTimingUnit = timer.timingUnits[index1];
    const secondTimingUnit = timer.timingUnits[index2];

    if (firstTimingUnit === undefined || secondTimingUnit === undefined) return;

    timingUnitsCopy[index1] = secondTimingUnit;
    timingUnitsCopy[index2] = firstTimingUnit;

    setTimingUnits(timingUnitsCopy);
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
            setTimingUnits(timingUnitsCopy);
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
            setTimingUnits([...timer.timingUnits, timingUnit]);
            setDrawerState({ open: false });
          }}
        />
      ),
    });
  };

  return (
    <Screen style={{ justifyContent: 'space-between' }}>
      <View style={{ gap: small }}>
        {timer.timingUnits.map((timingUnit, i) => (
          <TimingUnitFormListItem
            key={timingUnit.id}
            timingUnit={timingUnit}
            canMoveUp={i > 0}
            canMoveDown={i < timer.timingUnits.length - 1}
            onEdit={() => openEditTimingUnitDrawer(timingUnit, i)}
            onMoveUp={() => swapTimingUnits(i, i - 1)}
            onMoveDown={() => swapTimingUnits(i, i + 1)}
            onDelete={() =>
              setTimingUnits(
                timer.timingUnits.filter(({ id }) => id !== timingUnit.id),
              )
            }
          />
        ))}
        <Button title="New +" onPress={openNewTimingUnitDrawer} />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: small }}>
        <Button
          title="Start"
          onPress={() => setNavigationState({ screen: 'timer', timer })}
        />
      </View>
    </Screen>
  );
};
