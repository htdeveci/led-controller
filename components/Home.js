import { StyleSheet, Text, View } from "react-native";
import BatLamp from "./Leds/BatLamp";
import Esp from "./Esp";
import CustomButton from "./UI/CustomButton";

export default function Home() {
    const bgColor = "red";

    return <>
        <View style={styles.ledButtonContainer} >
            <CustomButton title={"One LED to Rule Them All"} onPress={() => { console.log("pressed") }} bgColor={"orange"} />
            <CustomButton title={"Bat Lamp"} onPress={() => { console.log("pressed") }} bgColor={"green"} buttonStyle={styles.led} />
            <CustomButton title={"TV Stand"} onPress={() => { console.log("pressed") }} bgColor={bgColor} buttonStyle={styles.led} />
            <CustomButton title={"Bookshelf"} onPress={() => { console.log("pressed") }} bgColor={bgColor} buttonStyle={styles.led} />
            <CustomButton title={"Top Shelf"} onPress={() => { console.log("pressed") }} bgColor={bgColor} buttonStyle={styles.shelf} />
            <CustomButton title={"Long Shelf"} onPress={() => { console.log("pressed") }} bgColor={bgColor} buttonStyle={styles.shelf} />
            <CustomButton title={"Short Shelf"} onPress={() => { console.log("pressed") }} bgColor={bgColor} buttonStyle={styles.shelf} />
            <CustomButton title={"Bottom Shelf"} onPress={() => { console.log("pressed") }} bgColor={bgColor} buttonStyle={styles.shelf} />
        </View>

        <View style={{ flexDirection: "row", marginTop: 50 }}>
            <Esp id={0} />
            <Esp id={1} />
        </View>
    </>
}

const styles = StyleSheet.create({
    ledButtonContainer: {
        width: '80%',
        gap: 20,
        // justifyContent: "center",
        // alignItems: "flex-end",
        // backgroundColor: "red",
    },
    led: {
        width: "90%",
        alignSelf: "center",
    },
    shelf: {
        width: "80%",
        alignSelf: "center"
    }
});