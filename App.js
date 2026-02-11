import { StyleSheet, Text, View, StatusBar } from "react-native";
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
import { GestureHandlerRootView } from "react-native-gesture-handler";
// import Deneme from "./components/Deneme";

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Home',
  screenOptions: {
    contentStyle: {
      backgroundColor: APP_BACKGROUND,
      // paddingTop: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    header: null,
    statusBarAnimation: "fade",
    statusBarStyle: "auto",
    animation: "fade"
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
  return (<>
    {/* <StatusBar barStyle="light-content" /> */}
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView>
          <Navigation />
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  </>
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
