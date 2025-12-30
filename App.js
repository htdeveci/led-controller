import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { configureReanimatedLogger } from "react-native-reanimated";
import { Provider } from "react-redux";

import BatLamp from "./components/Leds/BatLamp";
import { APP_BACKGROUND, PRIMARY } from "./globals/Colors";
import store, { persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import Home from "./components/Home";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import Deneme from "./components/Deneme";

export default function App() {
  // AsyncStorage.clear();
  configureReanimatedLogger({ strict: false });
  return (
    <Provider store={store}>
      <StatusBar style="light" backgroundColor={PRIMARY} />
      <PersistGate loading={null} persistor={persistor}>
        <View style={styles.container}>
          {/* <Deneme /> */}
          <Home />
        </View>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_BACKGROUND,
    alignItems: "center",
    justifyContent: "center",
    // flexDirection: "row",
  },
});
