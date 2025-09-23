import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import {
  BACKGROUND_LIGHT,
  ERROR,
  TEXT_DARK,
  TEXT_LIGHT,
} from "../globals/Colors";
import CustomButton from "./UI/CustomButton";
import Static from "./LedModes/Static";
import Loop from "./LedModes/Loop";
import Split from "./LedModes/Split";
import { LINE_HEIGHT } from "../globals/Constants";
import CustomSelectDropdown from "./UI/CustomSelectDropdown";
import { setServerIP } from "../store/connectionSlice";

export default function BatLamp() {
  const LedModes = {
    Static: "Static",
    Split: "Split",
    Loop: "Loop",
    Breath: "Breath",
  };
  const serverIP = useSelector((state) => state.connection.serverIP);
  const dispatch = useDispatch();
  const [selectedLedMode, setSelectedLedMode] = useState(LedModes.Static);
  const [ledState, setLedState] = useState(false);
  const [applyChanges, setApplyChanges] = useState(false);
  const [isLedConnected, setIsLedConnected] = useState(false);
  const [connectionTried, setConnectionTried] = useState(false);
  const [connectionTryingNow, setConnectionTryingNow] = useState(false);
  const [ipAddressForLed, setIpAddressForLed] = useState(serverIP);

  useEffect(() => {
    if (__DEV__)
      setIsLedConnected(true);
    else
      connectLed();
  }, []);

  const connectLed = async () => {
    try {
      const response = await fetch(`http://${ipAddressForLed}/` + "status");
      const responseData = await response.json();
      setLedState(responseData.ledState ? true : false);
      setIsLedConnected(true);
    } catch (err) {
      throw err;
    }
  };

  const connectLedButtonHandler = async () => {
    try {
      setConnectionTryingNow(true);
      await connectLed();
      dispatch(setServerIP({ serverIP: ipAddressForLed }));
    } catch (err) {
      console.log(err);
      setIsLedConnected(false);
    } finally {
      setConnectionTried(true);
      setConnectionTryingNow(false);
    }
  };

  const ledModeSelectHandler = (selectedMode, index) => {
    setSelectedLedMode(selectedMode);
  };

  const turnOnLed = async () => {
    try {
      const response = await fetch(`http://${ipAddressForLed}/` + "on");
      const responseData = await response.json();
      console.log(responseData.message);
    } catch (err) {
      console.log(err);
    }
  };

  const turnOffLed = async () => {
    try {
      const response = await fetch(`http://${ipAddressForLed}/` + "off");
      const responseData = await response.json();
      console.log(responseData.message);
    } catch (err) {
      console.log(err);
    }
  };

  const changeLedStateHandler = () => {
    if (ledState) {
      turnOffLed();
    } else {
      turnOnLed();
    }
    setLedState((prev) => !prev);
  };

  const applyHandler = () => {
    setApplyChanges(true);
  };

  return (
    <>
      {isLedConnected && (
        <View style={styles.container}>
          <CustomSelectDropdown
            data={Object.keys(LedModes)}
            onSelect={ledModeSelectHandler}
          />

          {selectedLedMode === LedModes.Static && (
            <Static
              applyChanges={applyChanges}
              setApplyChanges={setApplyChanges}
            />
          )}

          {selectedLedMode === LedModes.Split && (
            <Split
              applyChanges={applyChanges}
              setApplyChanges={setApplyChanges}

            />
          )}

          {selectedLedMode === LedModes.Loop && (
            <Loop
              applyChanges={applyChanges}
              setApplyChanges={setApplyChanges}
            />
          )}

          <View style={styles.buttonContainer}>
            <CustomButton title="apply" onPress={applyHandler} />
            <CustomButton
              onPress={changeLedStateHandler}
              title={`LEDs ${ledState ? "Opened" : "Closed"}`}
              enableSwitch
              switchState={ledState}
            />
          </View>
        </View>
      )}

      {!isLedConnected && (
        <View style={{ gap: 20, alignItems: "center" }}>
          <TextInput
            style={styles.inputTextForIp}
            value={ipAddressForLed}
            maxLength={15}
            onChangeText={setIpAddressForLed}
          />
          {/* <Text style={styles.errorText}>Unable to connect LEDs.</Text> */}
          <CustomButton title="connect" onPress={connectLedButtonHandler} />
          {connectionTryingNow && (
            <ActivityIndicator color={TEXT_LIGHT} size={"large"} />
          )}
          {!isLedConnected && connectionTried && !connectionTryingNow && (
            <Text style={styles.errorText}>Unable to connect LEDs.</Text>
          )}
          {/* <CustomButton title="retry" onPress={connectLed} /> */}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width * 0.8,
    height: Dimensions.get("window").height * 0.8,
    top: StatusBar.currentHeight / 2,
    justifyContent: "space-between",
  },
  buttonContainer: {
    gap: 20,
  },
  errorText: {
    color: ERROR,
    fontSize: 18,
  },
  inputTextForIp: {
    color: TEXT_DARK,
    backgroundColor: BACKGROUND_LIGHT,
    borderRadius: 10,
    fontSize: 18,
    width: 200,
    textAlign: "center",
    height: LINE_HEIGHT,
  },
});
