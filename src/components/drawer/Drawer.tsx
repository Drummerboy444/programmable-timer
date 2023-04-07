import { useContext } from 'react';
import React, { Dimensions, Pressable, ScrollView, View } from 'react-native';
import { GlobalContext } from '../../global-context/GlobalContext';
import { Card } from '../../lib/components/Card';
import { useSizes } from '../../theming/use-sizes';
import { useTheme } from '../../theming/use-theme';
import { Button } from '../../lib/components/buttons/Button';
import { useZIndexes } from '../../theming/use-z-indexes';

const SCREEN_HEIGHT_PERCENTAGE = 70;
const SHADOW_COLOR = '#000';

export const Drawer = () => {
  const { extraLarge } = useSizes();
  const { drawerShadowOpacity } = useTheme();
  const { drawer: drawerZIndex } = useZIndexes();

  const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');
  const drawerHeight = screenHeight * SCREEN_HEIGHT_PERCENTAGE * 0.01;

  const { drawerState, setDrawerState } = useContext(GlobalContext);

  const closeDrawer = () => {
    setDrawerState({ open: false });
  };

  return drawerState.open ? (
    <>
      <Pressable
        style={{
          position: 'absolute',
          bottom: drawerHeight,
          width: screenWidth,
          height: screenHeight - drawerHeight,
          backgroundColor: SHADOW_COLOR,
          opacity: drawerShadowOpacity,
          zIndex: drawerZIndex,
        }}
        onPress={closeDrawer}
      />
      <Card
        style={{
          position: 'absolute',
          bottom: 0,
          width: screenWidth,
          height: drawerHeight,
          zIndex: drawerZIndex,
        }}
      >
        <Button title="Close" onPress={closeDrawer} />
        <ScrollView>
          <View style={{ padding: extraLarge }}>{drawerState.content}</View>
        </ScrollView>
      </Card>
    </>
  ) : null;
};
