import { Modal, StyleSheet, Text, View } from "react-native";
import CustomButton from "./CustomButton";
import { ERROR } from "../../globals/Colors";

export default function CustomModal({ showModal, children, onApply, onClose }) {
    return (
        <Modal visible={showModal} transparent={true}>
            <View style={styles.backgroundView}>
                <View style={styles.panelView}>
                    {children}

                    <View style={styles.buttonGroup}>
                        <CustomButton title="close" bgColor={ERROR} onPress={onClose} />
                        <CustomButton title="apply" onPress={onApply} />
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    backgroundView: {
        backgroundColor: "#303030ae",
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    },
    panelView: {
        backgroundColor: "#c0c0c0ff",
        width: '80%',
        height: '40%',
        borderRadius: 12,
        justifyContent: "space-around",
        alignItems: 'center'
    },
    buttonGroup: {
        flexDirection: 'row',
        gap: 20
    }
});