import React, { View } from 'react-native';
import { useState } from 'react';
import { Button } from '../../lib/components/buttons/Button';
import { getUuid } from '../../lib/utils/uuid';
import { Timer } from '../../model/types';
import { TextInput } from '../../lib/components/input/TextInput';
import { useSizes } from '../../theming/use-sizes';

export const NewTimerForm = ({
  onSubmit,
}: {
  onSubmit: (timer: Timer) => void;
}) => {
  const { medium } = useSizes();
  const [name, setName] = useState('');

  const onPress = () => {
    onSubmit({ id: getUuid(), name, timingUnits: [] });
  };

  return (
    <View style={{ gap: medium }}>
      <TextInput value={name} setValue={setName} label="Name" />
      <Button title="Create" onPress={onPress} />
    </View>
  );
};
