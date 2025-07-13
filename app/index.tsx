import { Image, Text, View } from "react-native";
import backgroundpng from "../assets/icons/backgroundpng.js"


export default function Index() {
 

  return (
    <View className="bg-primary flex-1">
      {/* <Text className="text-secondary text-4xl font-bold">Namskar</Text>
      <Text className="text-light-100">New app</Text> */}
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
    <View className="flex justify-center top-12 z-10">
      <Text className="text-secondary font-bold text-[33px] text-center">What's my Yum today?</Text>
      <Text className="text-light-100 font-light text-[20px] text-center">Spin for your next yummy meal!</Text>
    </View>
    </View>
  );
}
