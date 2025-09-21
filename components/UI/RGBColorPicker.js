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
import { TEXT_LIGHT } from "../../globals/Colors";
import { LINE_HEIGHT } from "../../globals/Constants";

export default React.memo(function RGBColorPicker({
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
      <Preview colorFormat="rgb" style={styles.preview} hideInitialColor />

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
  preview: {
    height: LINE_HEIGHT,
    borderRadius: 12,
  },
  labelText: {
    color: TEXT_LIGHT,
    width: 70,
    fontSize: 18,
  },
});
