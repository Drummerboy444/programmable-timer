import * as O from 'fp-ts/Option';
import * as P from 'fp-ts/Predicate';
import { pipe } from 'fp-ts/lib/function';
import * as S from 'fp-ts/string';
import { useState } from 'react';
import React, { View } from 'react-native';
import { Button } from '../../lib/components/buttons/Button';
import { TextInput } from '../../lib/components/input/TextInput';
import { getUuid } from '../../lib/utils/uuid';
import { ManualTimingUnit } from '../../model/types';
import { useSizes } from '../../theming/use-sizes';

export const ManualTimingUnitForm = ({
  submitButtonText,
  onSubmit,
  defaultValues,
}: {
  submitButtonText: string;
  onSubmit: (timingUnit: ManualTimingUnit) => void;
  defaultValues?: Omit<ManualTimingUnit, 'id'>;
}) => {
  const { medium } = useSizes();

  const [name, setName] = useState(
    defaultValues === undefined ? '' : defaultValues.name,
  );

  const createButton = pipe(
    name,
    O.fromPredicate(P.not(S.isEmpty)),
    O.match(
      () => <Button title={submitButtonText} disabled />,
      newName => (
        <Button
          title={submitButtonText}
          onPress={() => {
            onSubmit({
              id: getUuid(),
              type: 'manual',
              name: newName,
            });
          }}
        />
      ),
    ),
  );

  return (
    <View style={{ gap: medium }}>
      <TextInput value={name} setValue={setName} label="Name" />
      {createButton}
    </View>
  );
};
