import React, { View } from 'react-native';
import { useState } from 'react';
import { Text } from '../../lib/components/Text';
import { Button } from '../../lib/components/buttons/Button';
import { getUuid } from '../../lib/utils/uuid';
import { Timer } from '../../model/types';
import { TextInput } from '../../lib/components/TextInput';
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
    <>
      <Text>Name:</Text>
      <TextInput value={name} setValue={setName} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginTop: medium,
        }}
      >
        <Button title="Create" onPress={onPress} />
      </View>
    </>
  );
};
