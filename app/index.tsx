import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  // Dimensions
} from "react-native";
import WheelOfFortune from "@/Components/WheelOfFortune";
import backgroundpng from "../assets/icons/backgroundpng.js";

export default function Index() {

  const defaultUserOptions = ["Vada-pav", "Sandwich", "Mess", "Kachori"];
  const extraOptions = ["Fries", "Paratha"];
  const [userInputs, setUserInputs] = useState(["", "", "", ""]);
  
  // Final options logic: use user input if not empty, else default
  const finalOptions = userInputs.map((input, index) => input || defaultUserOptions[index]);
  const allOptions = [...finalOptions, ...extraOptions];

  const wheelRef = useRef<any>(null);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1}}>
        <View className="bg-[#FFF5F8] items-center absoulte">
          {backgroundpng.map((item, index) => (
            <Image
              key={index}
              source={item.source}
              style={{
                position: "absolute",
                transform: [{ rotate: item.rotate }],
                ...item,
              }}
            />
          ))}

          <Text className="text-secondary font-bold text-[28px] mt-12 text-center">
            What's my Yum today?
          </Text>
          <Text className="text-light-100 font-light text-[18px] text-center">
            Spin for your next yummy meal!
          </Text>

          <WheelOfFortune ref={wheelRef} options={allOptions} />

          <View className="w-full px-4 mt-4">
            {userInputs.map((item, index) => (
              <TextInput
                key={index}
                value={item}
                onChangeText={(text) => {
                  const newInputs = [...userInputs];
                  newInputs[index] = text;
                  setUserInputs(newInputs);
                }}
                className="border border-light-200 rounded-3xl px-4 py-2 mb-3 w-[358px] h-[48px] bg-white text-placeholder"
                placeholder={`Food Option ${index+1}`}
              />
            ))}
          </View>

          <View className="mt-2 mb-8">
            <TouchableOpacity
              onPress={() => wheelRef.current?.spinWheel()}
              className="bg-light-200 rounded-full h-[56px] w-[283px] p-4"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 10,
                elevation: 10,
              }}
            >
              <Text className="text-white text-3xl font-normal text-center">
                Spin the Wheel 
              </Text>
            </TouchableOpacity>
          </View>

          <Text className="text-secondary font-light text-md mb-6">
            Made by Ekansh 💖
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
