import { Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../store/connectionSlice";

export default function Esp({ id }) {
    const esp = useSelector((state) => state.connection.esp[id]);

    return <>
        <Text>Esp Name: {esp.name}</Text>
        <Text>Esp Ip: {esp.ip}</Text>
    </>
}