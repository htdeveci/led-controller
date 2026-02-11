import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Switch, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colorKit } from "reanimated-color-picker";

import { ERROR_DISABLED, ERROR, PRIMARY, PRIMARY_DARK, TEXT_LIGHT, TEXT_DARK } from "../../globals/Colors";
import { LINE_HEIGHT } from "../../globals/Constants";
// import AntDesign from "@expo/vector-icons/AntDesign";

export default function CustomButton({
  onPress,
  buttonStyle,
  title,
  bgColor = PRIMARY,
  titleColor,
  rippleColor,
  enableSwitch = false,
  lineHeight = LINE_HEIGHT,
  switchState,
  iconName = false,
  iconSize = 24,
  paddingHorizontal = 20,
  disabled = false,
  disabledBgColor = ERROR_DISABLED
}) {
  const [tColor, setTextColor] = useState(titleColor ?? TEXT_LIGHT);
  const [rColor, setRippleColor] = useState(rippleColor ?? PRIMARY_DARK + "50");

  if (disabled) {
    bgColor = disabledBgColor;
  }

  useEffect(() => {
    if (!titleColor) setTextColor(calculateTextColor());
    if (!rippleColor) setRippleColor(calculateRippleColor());
  }, [bgColor]);

  const calculateTextColor = () => {
    return colorKit.isDark(bgColor) ? TEXT_LIGHT : TEXT_DARK;
  };

  const calculateRippleColor = () => {
    const bgColorHSL = colorKit.HSL(bgColor).object();
    const newLuminance = bgColorHSL.l > 25 ? bgColorHSL.l - 20 : bgColorHSL.l + 20;
    const newColor = colorKit.RGB({ ...bgColorHSL, l: newLuminance, a: 0.3 }).string();
    return newColor;
  };

  return (
    <View style={[styles.container, buttonStyle]}>
      <Pressable
        disabled={disabled}
        style={[
          styles.pressable,
          {
            backgroundColor: bgColor,
            height: lineHeight,
            paddingHorizontal: paddingHorizontal,
          },
        ]}
        onPress={onPress}
        android_ripple={{ color: rColor, foreground: true }}
      >
        <View style={styles.innerContainer}>
          {title && (
            <Text style={[styles.text, { color: tColor, textAlign: "center" }]}>
              {title}
            </Text>
          )}

          {iconName && (
            <MaterialIcons
              name={iconName}
              size={iconSize}
              color={tColor}
            // style={{ transform: "rotate(" + iconRotation + "deg)" }}
            />
          )}

          {enableSwitch && (
            <Switch
              disabled={disabled}
              trackColor={{ false: "#767577", true: "#a4d498" }}
              thumbColor={switchState ? "#27b115" : "#f4f3f4"}
              onChange={onPress}
              value={switchState}
            />
          )}
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    borderRadius: 12,
    // height: 100,
    // backgroundColor: bgColor,
    justifyContent: "center",
  },
  pressable: {
    // backgroundColor: "green",
    // height: LINE_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    // paddingHorizontal: 20,
  },
  innerContainer: {
    // backgroundColor: "red",
    // height: 26,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  text: {
    textTransform: "uppercase",
    fontSize: 18,
    fontWeight: "500",
  },
});
