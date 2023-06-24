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
import { AutomaticTimingUnit } from '../../model/types';
import { useSizes } from '../../theming/use-sizes';

export const AutomaticTimingUnitForm = ({
  submitButtonText,
  onSubmit,
  defaultValues,
}: {
  submitButtonText: string;
  onSubmit: (timingUnit: AutomaticTimingUnit) => void;
  defaultValues?: Omit<AutomaticTimingUnit, 'id'>;
}) => {
  const { medium } = useSizes();

  const [name, setName] = useState(
    defaultValues === undefined ? '' : defaultValues.name,
  );
  const [length, setLength] = useState<O.Option<number>>(
    defaultValues === undefined
      ? O.none
      : O.some(Math.floor(defaultValues.length / 1_000)),
  );

  const createButton = pipe(
    O.Do,
    O.apS('newName', O.fromPredicate(P.not(S.isEmpty))(name)),
    O.apS('newLength', length),
    O.match(
      () => <Button title={submitButtonText} disabled />,
      ({ newName, newLength }) => (
        <Button
          title={submitButtonText}
          onPress={() => {
            onSubmit({
              id: getUuid(),
              type: 'automatic',
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
      <NumericInput value={length} setValue={setLength} label="Length (s)" />
      {createButton}
    </View>
  );
};
