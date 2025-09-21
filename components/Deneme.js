import { useState } from "react";
import {
  Button,
  Pressable,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";

import ColorPicker, {
  colorKit,
  HueSlider,
  OpacitySlider,
  Panel1,
  Preview,
  Swatches,
} from "reanimated-color-picker";
import CustomButton from "./UI/CustomButton";

export default function Deneme() {
  const url = "http://192.168.1.3/";
  const [ledState, setLedState] = useState(true);
  const [selectedColor, setSelectedColor] = useState("#ff0000");
  const [appliedColor, setAppliedColor] = useState("#ff0000");

  const staticColorHandler = () => {
    const rgbColor = colorKit.RGB(selectedColor).object();

    fetch(
      `${url}static?red=${rgbColor.r}&green=${rgbColor.g}&blue=${rgbColor.b}`
    ).then(setAppliedColor(selectedColor));
  };

  const turnOnLed = () => {
    fetch(url + "on");
  };

  const turnOffLed = () => {
    fetch(url + "off");
  };

  const onSelectColor = ({ hex }) => {
    setSelectedColor(hex);
  };

  const roughChangeModeHandler = () => {
    fetch(url + "roughChange");
  };

  const gs1Handler = () => {
    fetch(url + "gs1");
  };

  const gs2Handler = () => {
    fetch(url + "gs2");
  };

  const changeLedStateHandler = () => {
    if (ledState) {
      turnOffLed();
    } else {
      turnOnLed();
    }
    setLedState((prev) => !prev);
  };

  return (
    <>
      <StatusBar animated backgroundColor={selectedColor} />
      <View style={styles.container}>
        <ColorPicker
          style={{ width: "70%", gap: 10 }}
          value={appliedColor}
          onComplete={onSelectColor}
        >
          <Preview />
          <Panel1 />
          <HueSlider />
          <OpacitySlider />
          <Swatches />
        </ColorPicker>

        <CustomButton
          onPress={staticColorHandler}
          title="STATIC Color"
          bgColor={selectedColor}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 20,
          }}
        >
          <CustomButton
            buttonStyle={{ flex: 1 }}
            onPress={gs1Handler}
            title="GS 1"
            bgColor="#a32638"
            titleColor="#fcb514"
            rippleColor="#fcb514"
          />

          <CustomButton
            buttonStyle={{ flex: 1 }}
            onPress={gs2Handler}
            title="GS 2"
            bgColor="#fcb514"
            titleColor="#a32638"
            rippleColor="#a32638"
          />
        </View>

        <CustomButton
          onPress={roughChangeModeHandler}
          title="Rough Change Mode"
        />

        <CustomButton
          onPress={changeLedStateHandler}
          title={`LEDs ${ledState ? "Opened" : "Closed"}`}
          enableSwitch
          switchState={ledState}
        />

        {/* <Pressable
        style={styles.ledStateContainer}
        onPress={changeLedStateHandler}
      >
        <Text style={{ color: "white", textTransform: "uppercase" }}>{`LEDs ${
          ledState ? "Opened" : "Closed"
        }`}</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#a4d498" }}
          thumbColor={ledState ? "#27b115" : "#f4f3f4"}
          onChange={changeLedStateHandler}
          value={ledState}
        />
      </Pressable> */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  ledStateContainer: {
    // display: "flex",
    // width: "70%",
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#9F15B1",
  },
  ledCloseBackground: {
    backgroundColor: "red",
  },
  ledOpenBackground: {
    backgroundColor: "green",
  },
});
