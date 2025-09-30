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
import { APP_BACKGROUND, ICON_BACKGROUND, TEXT_LIGHT } from "../../../globals/Colors";
import React from "react";
import { LINE_HEIGHT } from "../../../globals/Constants";
import CustomButton from "../CustomButton";
import ColorPickerPreview from "./ColorPickerPreview";

export default React.memo(function HSLColorPicker({
  selectedColor,
  setSelectedColor,
  onSelectColor,
}) {
  return (
    <ColorPicker
      thumbScaleAnimationValue={1.1}
      style={{ gap: 20 }}
      value={selectedColor}
      onComplete={onSelectColor}
    >
      <ColorPickerPreview colorFormat="hsl" selectedColor={selectedColor} setSelectedColor={setSelectedColor} />

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
  labelText: {
    color: TEXT_LIGHT,
    width: 110,
    fontSize: 18,
  }
});
