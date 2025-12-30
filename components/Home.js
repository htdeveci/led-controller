import { Text } from "react-native";
import BatLamp from "./Leds/BatLamp";
import Esp from "./Esp";

export default function Home() {
    return <>
        <Esp id={0} />
        <Esp id={1} />
    </>
}