import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import CustomColorPicker from "../UI/ColorPicker/CustomColorPicker";
import CustomButton from "../UI/CustomButton";
import { FOOTBALL } from "../../globals/Colors";
import { StyleSheet, View } from "react-native";

export default function Static({ espId, ledId, applyChanges, setApplyChanges }) {
  // const espUrl = useSelector((state) => state.connection.esp[espId].url);
  const espArray = useSelector((state) => state.connection.esp);
  const [selectedColor, setSelectedColor] = useState("#ff0000");

  /* function decimalToHex(d, padding) {
    var hex = Number(d).toString(16);
    padding =
      typeof padding === "undefined" || padding === null
        ? (padding = 2)
        : padding;

    while (hex.length < padding) {
      hex = "0" + hex;
    }

    return hex;
  } */

  useEffect(() => {
    if (ledId < 100) {
      if (espArray.length > 0) {
        if (espId < 100) {
          fetchColor(espArray[espId].url);
        }
        else {
          espArray.forEach(esp => {
            fetchColor(esp.url);
          });
        }
      }
    }
  }, [espArray.length]);

  useEffect(() => {
    if (applyChanges) {
      if (espArray.length > 0) {
        if (espId < 100) {
          changeColor(espArray[espId].url);
        }
        else {
          espArray.forEach(esp => {
            changeColor(esp.url);
          });
        }
      }
      setApplyChanges(false);
    }
  }, [applyChanges]);

  const fetchColor = async (espUrl) => {
    try {
      const response = await fetch(espUrl + "static?ledId=" + ledId);
      const responseData = await response.json();
      setSelectedColor(responseData.colorHex);
    } catch (err) {
      console.log(err);
    }
  };

  const changeColor = async (espUrl) => {
    try {
      const formData = new FormData();
      formData.append("colorHex", selectedColor.substring(1));
      const response = await fetch(espUrl + "static?ledId=" + ledId, {
        method: "POST",
        body: formData,
      });
      const responseData = await response.json();
      console.log(responseData.message);
    } catch (err) {
      console.log(err);
    }
  };

  const onSelectColor = ({ hex }) => {
    setSelectedColor(hex);
  };

  return (
    <View style={styles.container}>
      <CustomColorPicker
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        onSelectColor={onSelectColor}
      />

      <CustomButton title="Football Time" bgColor={FOOTBALL} onPress={onSelectColor.bind(null, { hex: FOOTBALL })} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
    justifyContent: "space-between"
  }
});
