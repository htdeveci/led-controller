import { useEffect, useState } from "react";
import { StyleSheet, StatusBar, View, Dimensions, Text } from "react-native";
import { useSelector } from "react-redux";

import { LED_MODES } from "../../globals/Constants";
import CustomButton from "../UI/CustomButton";
import Static from "../LedModes/Static";
import CustomSelectDropdown from "../UI/CustomSelectDropdown";
import { TEXT_LIGHT } from "../../globals/Colors";

export default function BaseLedComponent({ route }) {
    const { title, espId, ledId } = route.params;
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
            if (espId < 100)
                setLedState(responseData.ledState ? true : false);
            else
                setLedState(prev => prev || responseData.ledState);
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
            <Text style={styles.ledLabel}>{title}</Text>

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


            <View style={styles.buttonContainer}>
                <CustomButton
                    buttonStyle={styles.buttons}
                    onPress={changeLedStateHandler}
                    title={`${ledState ? "Opened" : "Closed"}`}
                    // title="leds"
                    enableSwitch
                    switchState={ledState}
                />
                <CustomButton buttonStyle={styles.buttons} title="apply" onPress={applyHandler} />
            </View>
        </View>
    </>
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get("window").width * 0.9,
        height: Dimensions.get("window").height * 0.85,
        // top: StatusBar.currentHeight / 2,
        justifyContent: "space-between",
        // backgroundColor: "red"
    },
    ledLabel: {
        color: TEXT_LIGHT,
        fontSize: 24,
        textAlign: "center",
        marginBottom: 10
    },
    buttonContainer: {
        flexDirection: "row",
        gap: 10,
    },
    buttons: {
        flex: 1
    }
});