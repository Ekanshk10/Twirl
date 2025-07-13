import { Stack } from "expo-router";
import "./global.css";
import { View, Platform, StatusBar as RNStatusBar } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      {/* Spacer view under translucent status bar to make the status bar black*/}
      <View
        style={{
          height: Platform.OS === "ios" ? 44 : RNStatusBar.currentHeight,
          backgroundColor: "#000000",
        }}
      >
        <StatusBar style="light" translucent />
      </View>

      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </>
  );
}
