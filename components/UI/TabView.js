import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  BACKGROUND_LIGHT,
  PRIMARY,
  PRIMARY_LIGHT,
  TEXT_DARK,
} from "../../globals/Colors";
import { LINE_HEIGHT } from "../../globals/Constants";

export default function TabView({ renderScene }) {
  const [selectedSceneIndex, setSelectedSceneIndex] = useState(0);

  const tabChangeHandler = (index) => {
    setSelectedSceneIndex(index);
  };

  return (
    <View style={styles.tabContainer}>
      <View style={styles.tabButtonContainer}>
        {renderScene.map((scene, index) => {
          return (
            <Pressable
              key={scene.key}
              style={{
                ...styles.tabButton,
                ...(index === selectedSceneIndex && styles.selectedTab),
              }}
              onPress={tabChangeHandler.bind(this, index)}
            >
              <Text style={{ color: TEXT_DARK }}>{scene.title}</Text>
            </Pressable>
          );
        })}
      </View>

      <ScrollView>
        <View style={styles.renderContainer}>
          {renderScene[selectedSceneIndex].render}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    marginVertical: 16,
  },
  tabButtonContainer: {
    flexDirection: "row",
    marginBottom: 16,
    borderRadius: 12,
    height: LINE_HEIGHT,
    overflow: "hidden",
  },
  tabButton: {
    backgroundColor: BACKGROUND_LIGHT,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // height: 50,
  },
  renderContainer: {
    paddingHorizontal: 18,
  },
  selectedTab: {
    backgroundColor: PRIMARY_LIGHT,
  },
});
