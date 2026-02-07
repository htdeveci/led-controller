import { useEffect, useState } from "react";
import Slider from "@react-native-community/slider";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

import { PRIMARY, PRIMARY_LIGHT, TEXT_LIGHT } from "../../globals/Colors";

export default function Loop({ espId, ledId, applyChanges, setApplyChanges }) {
  const espUrl = useSelector((state) => state.connection.esp[espId].url);
  const [speed, setSpeed] = useState(1500);
  const [finalSpeed, setFinalSpeed] = useState(1500);

  useEffect(() => {
    if (applyChanges) {
      activateLoopMode();
      setApplyChanges(false);
    }
  }, [applyChanges]);

  const activateLoopMode = async () => {
    try {
      const response = await fetch(`${espUrl}loop?speed=${finalSpeed}&ledId=${ledId}`);
      const responseData = await response.json();
      console.log(responseData.message);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{`${speed} ms`}</Text>
      <Slider
        thumbTintColor={PRIMARY}
        minimumTrackTintColor={PRIMARY_LIGHT}
        maximumTrackTintColor={TEXT_LIGHT}
        style={{ height: 40 }}
        value={finalSpeed}
        onValueChange={(value) => setSpeed(value)}
        onSlidingComplete={(value) => setFinalSpeed(value)}
        minimumValue={100}
        maximumValue={5000}
        step={10}
      />
      <Text style={styles.label}>Speed</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flexDirection: "row",
    // backgroundColor: "red",
    // justifyContent: "center",
    alignItems: "stretch",
  },
  label: {
    // backgroundColor: "blue",
    textAlign: "center",
    color: TEXT_LIGHT,
    fontSize: 18,
  },
});
