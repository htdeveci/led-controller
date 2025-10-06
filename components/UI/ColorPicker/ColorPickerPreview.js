import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Preview } from "reanimated-color-picker";

import CustomButton from "../CustomButton";
import { LINE_HEIGHT } from "../../../globals/Constants";
import { ICON_BACKGROUND, TEXT_LIGHT } from "../../../globals/Colors";
import { setCopiedColor } from "../../../store/colorSlice";

export default function ColorPickerPreview({
  colorFormat,
  selectedColor,
  setSelectedColor,
}) {
  const dispatch = useDispatch();
  const copiedColor = useSelector((state) => state.color.copiedColor);

  const copyColorHandler = async () => {
    dispatch(setCopiedColor({ copiedColor: selectedColor }));
  };

  const pasteColorHandler = async () => {
    if (copiedColor) setSelectedColor(copiedColor);
  };

  return (
    <View style={styles.previewContainer}>
      <CustomButton
        bgColor={copiedColor ? copiedColor : ICON_BACKGROUND}
        iconName="content-paste"
        paddingHorizontal={12}
        onPress={pasteColorHandler}
      />
      <Preview
        colorFormat={colorFormat}
        style={styles.preview}
        hideInitialColor
      />
      <CustomButton
        bgColor={ICON_BACKGROUND}
        iconName="content-copy"
        paddingHorizontal={12}
        onPress={copyColorHandler}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  previewContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  preview: {
    height: LINE_HEIGHT,
    borderRadius: 12,
    width: "64%",
  },
  labelText: {
    color: TEXT_LIGHT,
    width: 110,
    fontSize: 18,
  },
});
