import { useEffect, useState } from "react";
import { LED_ESP_ENUM, LED_MODES } from "../../globals/Constants";
import { useSelector } from "react-redux";
import CustomButton from "../UI/CustomButton";
import Static from "../LedModes/Static";
import Loop from "../LedModes/Loop";
import { StyleSheet, StatusBar, View, Dimensions } from "react-native";
import CustomSelectDropdown from "../UI/CustomSelectDropdown";

export default function BaseLedComponent({ route }) {
    const { espId, ledId } = route.params;
    const espArray = useSelector((state) => state.connection.esp);
    const [ledState, setLedState] = useState(false);
    const [selectedLedMode, setSelectedLedMode] = useState(LED_MODES.Static);
    const [applyChanges, setApplyChanges] = useState(false);

    useEffect(() => {
        if (espArray.length > 0) {
            if (espId < 100) {
                connectLed(espArray[espId].url);
            }
            else {
                espArray.forEach(esp => {
                    connectLed(esp.url);
                });
            }
        }
    }, [espArray.length]);

    const connectLed = async (espUrl) => {
        try {
            const response = await fetch(espUrl + "status?ledId=" + ledId);
            const responseData = await response.json();
            setLedState(responseData.ledState ? true : false);
            // setIsLedConnected(true);
        } catch (err) {
            throw err;
        }
    };

    const changeLedStateHandler = () => {
        if (espId < 100) {
            if (ledState) {
                turnOffLed(espArray[espId].url);
            } else {
                turnOnLed(espArray[espId].url);
            }
        }
        else {
            espArray.forEach(esp => {
                if (ledState) {
                    turnOffLed(esp.url);
                } else {
                    turnOnLed(esp.url);
                }
            });
        }
        setLedState((prev) => !prev);
    };

    const turnOnLed = async (espUrl) => {
        try {
            const response = await fetch(espUrl + "on?ledId=" + ledId);
            const responseData = await response.json();
            console.log(responseData.message);
        } catch (err) {
            console.log(err);
        }
    };

    const turnOffLed = async (espUrl) => {
        try {
            const response = await fetch(espUrl + "off?ledId=" + ledId);
            const responseData = await response.json();
            console.log(responseData.message);
        } catch (err) {
            console.log(err);
        }
    };

    const applyHandler = () => {
        setApplyChanges(true);
    };

    const ledModeSelectHandler = (selectedMode, index) => {
        setSelectedLedMode(selectedMode);
    };

    return <>
        <View style={styles.container}>
            <CustomSelectDropdown
                data={Object.keys(LED_MODES)}
                onSelect={ledModeSelectHandler}
            />

            {selectedLedMode === LED_MODES.Static && (
                <Static
                    espId={espId}
                    ledId={ledId}
                    applyChanges={applyChanges}
                    setApplyChanges={setApplyChanges}
                />
            )}

            {/* {selectedLedMode === LED_MODES.Loop && (
                <Loop
                    espId={espId}
                    ledId={ledId}
                    applyChanges={applyChanges}
                    setApplyChanges={setApplyChanges}
                />
            )} */}
        </View>

        <CustomButton title="apply" onPress={applyHandler} />

        <CustomButton
            onPress={changeLedStateHandler}
            title={`LEDs ${ledState ? "Opened" : "Closed"}`}
            enableSwitch
            switchState={ledState}
        />
    </>
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get("window").width * 0.8,
        height: Dimensions.get("window").height * 0.8,
        top: StatusBar.currentHeight / 2,
        justifyContent: "space-between",
        // backgroundColor: "red"
    }
});