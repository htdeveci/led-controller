import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ColorPicker, {
  BlueSlider,
  GreenSlider,
  Panel1,
  Panel2,
  Panel5,
  Preview,
  PreviewText,
  RedSlider,
} from "reanimated-color-picker";
import { TEXT_LIGHT } from "../../../globals/Colors";
import { LINE_HEIGHT } from "../../../globals/Constants";
import ColorPickerPreview from "./ColorPickerPreview";

export default React.memo(function RGBColorPicker({
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
      <ColorPickerPreview colorFormat="rgb" selectedColor={selectedColor} setSelectedColor={setSelectedColor} />

      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>Red</Text>
        <RedSlider style={{ flex: 1 }} />
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>Green</Text>
        <GreenSlider style={{ flex: 1 }} />
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>Blue</Text>
        <BlueSlider style={{ flex: 1 }} />
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
    width: 70,
    fontSize: 18,
  },
});
