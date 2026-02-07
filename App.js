import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, StatusBar as StatusBarReact } from "react-native";
import { configureReanimatedLogger } from "react-native-reanimated";
import { Provider } from "react-redux";

import { APP_BACKGROUND, BACKGROUND_LIGHT, PRIMARY } from "./globals/Colors";
import store, { persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import Home from "./components/Home";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStaticNavigation } from "@react-navigation/native";
import Esp from "./components/Esp";
import BatLamp from "./components/Leds/BatLamp";
import TvStand from "./components/Leds/TvStand";
import BaseLedComponent from "./components/Leds/BaseLedComponent";
// import Deneme from "./components/Deneme";

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Home',
  screenOptions: {
    // statusBarHidden: true,
    contentStyle: {
      backgroundColor: APP_BACKGROUND,
      justifyContent: "center",
      alignItems: "center",
      // top: StatusBarReact.currentHeight / 2,
    },
    header: null,
    // statusBarStyle: "dark",
  },
  screens: {
    Home: Home,
    Esp: Esp,
    BaseLedComponent: BaseLedComponent
    // BatLamp: BatLamp,
    // TvStand: TvStand
  }
});
const Navigation = createStaticNavigation(RootStack);

export default function App() {
  // AsyncStorage.clear();
  configureReanimatedLogger({ strict: false });
  return (
    <Provider store={store}>
      {/* <StatusBarReact backgroundColor={"red"} barStyle={"light-content"} /> */}
      {/* <StatusBar backgroundColor={"red"} /> */}
      <PersistGate loading={null} persistor={persistor}>
        <Navigation />
        {/* <View style={styles.container}>
          <Deneme /> */}
        {/* <Home />
        </View>*/}
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
