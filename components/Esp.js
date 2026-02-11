import { Modal, StyleSheet, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { reset, setEspIp } from "../store/connectionSlice";
import CustomButton from "./UI/CustomButton";
import { useEffect, useState } from "react";
import CustomModal from "./UI/CustomModal";
import { LINE_HEIGHT } from "../globals/Constants";
import { BACKGROUND_LIGHT, ERROR, SUCCESS, TEXT_DARK } from "../globals/Colors";

export default function Esp({ id, isEspConnected, onEspConnected, onEspFailed }) {
    const dispatch = useDispatch();
    const esp = useSelector((state) => state.connection.esp[id]);
    // const [isEspConnected, setIsEspConnected] = useState(false);
    const [isEspTryingToConnect, setIsEspTryingToConnect] = useState(false);
    const [showEspSettingsModal, setShowEspSettingsModal] = useState(false);
    const [espIpState, setEspIpState] = useState(esp.ip);

    useEffect(() => {
        if (esp.url)
            connectEsp();
        /* if (__DEV__)
            setIsEspConnected(true);
        else
            connectEsp(); */
    }, [esp.url]);

    const connectEsp = async () => {
        try {
            setIsEspTryingToConnect(true);
            const response = await fetch(esp.url + "connect");
            const responseData = await response.json();
            console.log(responseData.message);
            if (response.status == 200) {
                onEspConnected();
            }
            else {
                onEspFailed();
            }
        } catch (err) {
            console.log(id + " - err - " + err)
            onEspFailed();
            throw err;
        } finally {
            setIsEspTryingToConnect(false);

        }
    };

    const closeModalHandler = () => {
        setShowEspSettingsModal(false);
        setEspIpState(esp.ip);
    }

    const applyModalHandler = async () => {
        try {
            dispatch(setEspIp({ id: id, espIp: espIpState }));
            setShowEspSettingsModal(false);
            await connectEsp();
        }
        catch (err) {
            console.log(err);
        }
    }

    return <>
        <CustomModal showModal={showEspSettingsModal} onClose={closeModalHandler} onApply={applyModalHandler}>
            <Text style={{ fontSize: 20 }}>{esp.name}</Text>
            <TextInput
                style={styles.inputTextForIp}
                keyboardType="number-pad"
                maxLength={15}
                value={espIpState}
                onChangeText={setEspIpState}
            />
        </CustomModal>

        <CustomButton title={isEspTryingToConnect ? "Wait" : "ESP " + (id + 1)} bgColor={isEspConnected ? SUCCESS : ERROR} onPress={() => setShowEspSettingsModal(true)} />
    </>
}


const styles = StyleSheet.create({
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