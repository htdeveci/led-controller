import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Switch, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colorKit } from "reanimated-color-picker";

import { PRIMARY, PRIMARY_DARK, TEXT_LIGHT } from "../../globals/Colors";
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
}) {
  const [tColor, setTextColor] = useState(titleColor ? titleColor : TEXT_LIGHT);
  const [rColor, setRippleColor] = useState(
    rippleColor ? rippleColor : PRIMARY_DARK
  );

  useEffect(() => {
    if (!titleColor) setTextColor(calculateTextColor());
    // if (!rippleColor) setRippleColor(calculateRippleColor());
  }, [bgColor]);

  const calculateRippleColor = () => {
    const hslColor = colorKit.HSL(bgColor).object();
    colorKit.contrastRatio;
    const newLuminance = hslColor.l > 30 ? hslColor.l - 20 : hslColor.l + 20;
    return `hsl(${hslColor.h},${hslColor.s},${newLuminance})`;
  };

  const calculateTextColor = () => {
    return colorKit.isDark(bgColor) ? "#e0e0e0" : "#242424";
  };

  return (
    <View style={[styles.container, buttonStyle]}>
      <Pressable
        style={[
          styles.pressable,
          {
            backgroundColor: bgColor,
            height: lineHeight,
            paddingHorizontal: paddingHorizontal,
          },
        ]}
        onPress={onPress}
        // android_ripple={{ color: "red" }}
      >
        <View style={styles.innerContainer}>
          {iconName && (
            <MaterialIcons
              name={iconName}
              size={iconSize}
              color={tColor}
              // style={{ transform: "rotate(" + iconRotation + "deg)" }}
            />
          )}

          {title && (
            <Text style={[styles.text, { color: tColor, textAlign: "center" }]}>
              {title}
            </Text>
          )}

          {enableSwitch && (
            <Switch
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
    // backgroundColor: "blue",
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
