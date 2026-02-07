import { StyleSheet, Text, View } from "react-native";
import BatLamp from "./Leds/BatLamp";
import Esp from "./Esp";
import CustomButton from "./UI/CustomButton";
import { APP_BACKGROUND, ERROR, SUCCESS } from "../globals/Colors";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { LED_ESP_ENUM } from "../globals/Constants";

export default function Home() {
    const navigation = useNavigation();
    const [isEspConnected, setIsEspConnected] = useState([false, false]);

    const navigateToLedHandler = (led) => {
        navigation.navigate("BaseLedComponent", led);
    }

    const changeEspStateHandler = (espId, value) => {
        /* const temp = [...isEspConnected];
        temp[espId] = value;
        setIsEspConnected(temp); */
        /* setIsEspConnected(
            isEspConnected.map((esp, index) => {
                if (index === espId) {
                    return { ...esp, value };
                } else {
                    return { ...esp };
                }
            }),
        ); */


        setIsEspConnected(prevState => {
            if (prevState[espId] === value) return prevState;

            const newState = [...prevState]; // Mevcut dizinin kopyasını oluştur (Spread operator)
            newState[espId] = value;        // Sadece ilgili indeksi güncelle
            return newState;                 // Yeni diziyi set et
        });
    }

    console.log(isEspConnected)
    return <>
        {/* <View style={styles.outerContainer}> */}
        {/* <StatusBar backgroundColor="red" /> */}
        <View style={styles.innerContainer} >
            <View style={styles.ledButtonContainer} >
                <CustomButton key={`all-leds-${isEspConnected[0]}`} title={"One LED to Rule Them All"} onPress={navigateToLedHandler.bind(null, LED_ESP_ENUM.AllLeds)} disabled={!isEspConnected[0] || !isEspConnected[1]} bgColor={SUCCESS} buttonStyle={styles.allLed} />
                <CustomButton key={`bat-lamp-${isEspConnected[0]}`} title={"Bat Lamp"} onPress={navigateToLedHandler.bind(null, LED_ESP_ENUM.BatLamp)} bgColor={SUCCESS} disabled={!isEspConnected[0]} buttonStyle={styles.led} />
                <CustomButton key={`tv-stand-${isEspConnected[1]}`} title={"TV Stand"} onPress={navigateToLedHandler.bind(null, LED_ESP_ENUM.TvStand)} bgColor={SUCCESS} disabled={!isEspConnected[1]} buttonStyle={styles.led} />
                <CustomButton key={`bookshelf-${isEspConnected[1]}`} title={"Bookshelf"} onPress={navigateToLedHandler.bind(null, LED_ESP_ENUM.Bookshelf)} bgColor={SUCCESS} disabled={!isEspConnected[1]} buttonStyle={styles.allShelves} />
                <CustomButton key={`bookshelf-top-${isEspConnected[1]}`} title={"Top Shelf"} onPress={navigateToLedHandler.bind(null, LED_ESP_ENUM.BookshelfTop)} bgColor={SUCCESS} disabled={!isEspConnected[1]} buttonStyle={styles.shelf} />
                <CustomButton key={`bookshelf-long-${isEspConnected[1]}`} title={"Long Shelf"} onPress={navigateToLedHandler.bind(null, LED_ESP_ENUM.BookshelfLong)} bgColor={SUCCESS} disabled={!isEspConnected[1]} buttonStyle={styles.shelf} />
                <CustomButton key={`bookshelf-short-${isEspConnected[1]}`} title={"Short Shelf"} onPress={navigateToLedHandler.bind(null, LED_ESP_ENUM.BookshelfShort)} bgColor={SUCCESS} disabled={!isEspConnected[1]} buttonStyle={styles.shelf} />
                <CustomButton key={`bookshelf-bottom-${isEspConnected[1]}`} title={"Bottom Shelf"} onPress={navigateToLedHandler.bind(null, LED_ESP_ENUM.BookshelfBottom)} bgColor={SUCCESS} disabled={!isEspConnected[1]} buttonStyle={styles.shelf} />
            </View>

            <View style={styles.espButtonContainer}>
                <Esp id={0} isEspConnected={isEspConnected[0]} onEspConnected={() => changeEspStateHandler(0, true)} onEspFailed={() => changeEspStateHandler(0, false)} />
                <Esp id={1} isEspConnected={isEspConnected[1]} onEspConnected={() => changeEspStateHandler(1, true)} onEspFailed={() => changeEspStateHandler(1, false)} />
            </View>
        </View>
    </>
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: APP_BACKGROUND,
        alignItems: "center",
        justifyContent: "center",
        // margin: 0,
        // padding: 0
    },
    innerContainer: {
        flex: 1,
        // backgroundColor: "red",
        justifyContent: "space-around",
        // alignItems: "stretch",
        width: '80%',
    },
    ledButtonContainer: {
        // flex: 1,
        // backgroundColor: "blue",
        // width: '80%',
        gap: 20,
        // justifyContent: "center",
        // alignItems: "center",
        // backgroundColor: "red",
    },
    allLed: {
        width: "95%",
        alignSelf: "center",
    },
    led: {
        width: "85%",
        alignSelf: "center",
    },
    allShelves: {
        width: "75%",
        alignSelf: "center",
    },
    shelf: {
        width: "65%",
        alignSelf: "center"
    },
    espButtonContainer: {
        // backgroundColor: "yellow",
        justifyContent: "center",
        flexDirection: "row",
        // marginTop: 50,
        gap: 20
    }
});