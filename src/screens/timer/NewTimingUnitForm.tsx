import * as O from 'fp-ts/Option';
import * as P from 'fp-ts/Predicate';
import { pipe } from 'fp-ts/lib/function';
import * as S from 'fp-ts/string';
import { useState } from 'react';
import React, { View } from 'react-native';
import { Button } from '../../lib/components/buttons/Button';
import { NumericInput } from '../../lib/components/input/NumericInput';
import { TextInput } from '../../lib/components/input/TextInput';
import { getUuid } from '../../lib/utils/uuid';
import { TimingUnit } from '../../model/types';
import { useSizes } from '../../theming/use-sizes';

const SUBMIT_BUTTON_TEXT = 'Create';

export const NewTimingUnitForm = ({
  onSubmit,
}: {
  onSubmit: (timingUnit: TimingUnit) => void;
}) => {
  const { medium } = useSizes();

  const [name, setName] = useState('');
  const [length, setLength] = useState<O.Option<number>>(O.none);

  const createButton = pipe(
    O.Do,
    O.apS('newName', O.fromPredicate(P.not(S.isEmpty))(name)),
    O.apS('newLength', length),
    O.match(
      () => <Button title={SUBMIT_BUTTON_TEXT} disabled />,
      ({ newName, newLength }) => (
        <Button
          title={SUBMIT_BUTTON_TEXT}
          onPress={() => {
            onSubmit({
              id: getUuid(),
              name: newName,
              length: newLength * 1_000,
            });
          }}
        />
      ),
    ),
  );

  return (
    <View style={{ gap: medium }}>
      <TextInput value={name} setValue={setName} label="Name" />
      <NumericInput value={length} setValue={setLength} label="Length" />
      {createButton}
    </View>
  );
};
