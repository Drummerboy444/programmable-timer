import React from 'react-native';
import { Button } from '../../lib/components/buttons/Button';

const getButtonTitle = (playing: boolean) => (playing ? 'Pause' : 'Play');

export const PlayButton = ({
  playing,
  togglePlaying,
}: {
  playing: boolean;
  togglePlaying: () => void;
}) => <Button title={getButtonTitle(playing)} onPress={togglePlaying} />;
