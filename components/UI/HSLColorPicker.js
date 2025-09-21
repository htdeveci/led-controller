import { StyleSheet, Text, View } from "react-native";
import ColorPicker, {
  BrightnessSlider,
  HSLSaturationSlider,
  HueCircular,
  HueSlider,
  LuminanceCircular,
  LuminanceSlider,
  Panel1,
  Panel3,
  Preview,
  RedSlider,
  SaturationSlider,
} from "reanimated-color-picker";
import { APP_BACKGROUND, TEXT_LIGHT } from "../../globals/Colors";
import React from "react";
import { LINE_HEIGHT } from "../../globals/Constants";

export default React.memo(function HSLColorPicker({
  selectedColor,
  onSelectColor,
}) {
  return (
    <ColorPicker
      thumbScaleAnimationValue={1.1}
      style={{ gap: 20 }}
      value={selectedColor}
      onComplete={onSelectColor}
    >
      <Preview colorFormat="hsl" style={styles.preview} hideInitialColor />
      <Panel3 centerChannel="hsl-saturation" />

      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>Brightness</Text>
        <BrightnessSlider style={{ flex: 1 }} />
      </View>
    </ColorPicker>
  );
});

const styles = StyleSheet.create({
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  preview: {
    height: LINE_HEIGHT,
    borderRadius: 12,
  },
  labelText: {
    color: TEXT_LIGHT,
    width: 110,
    fontSize: 18,
  },
});
