import React, { forwardRef, useImperativeHandle } from "react";
import { View } from "react-native";
import Svg, { G, Path, Text as SvgText } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { Audio } from "expo-av";


const WheelOfFortune = forwardRef(({ options }, ref) => {
  const spin = useSharedValue(0);
  const numOptions = options.length;
  const anglePerOption = 360 / numOptions;
  const radius = 150;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${spin.value}deg` }],
  }));

 const spinWheel = async () => {
  try {
    // Load sound
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/sound/spin.mp3") // <-- Make sure you put your sound file in assets/sounds and update this path
    );

    // Play the sound
    await sound.playAsync();

    spin.value = 0;
    const randomExtraSpins = 6;
    const randomFinalAngle = Math.floor(Math.random() * 360);
    const totalRotation = 360 * randomExtraSpins + randomFinalAngle;

    spin.value = withTiming(
      totalRotation,
      { duration: 4000, easing: Easing.out(Easing.cubic) },
      async () => {
        // Stop and unload sound when spin ends
        await sound.stopAsync();
        await sound.unloadAsync();

        const finalDeg = totalRotation % 360;
        const pickedIndex =
          Math.floor((360 - finalDeg) / anglePerOption) % numOptions;
        console.log("Selected: ", options[pickedIndex]);
      }
    );
  } catch (error) {
    console.log("Error playing sound: ", error);
  }
};

  useImperativeHandle(ref, () => ({
    spinWheel,
  }));

  const renderSlices = () => {
    const paths = [];
    let startAngle = 0;
    const colors = [
      "#FFB6C1",
      "#FFD700",
      "#B388EB",
      "#FF7F50",
      "#90EE90",
      "#ADD8E6",
    ];

    for (let i = 0; i < numOptions; i++) {
      const endAngle = startAngle + anglePerOption;
      const largeArc = anglePerOption > 180 ? 1 : 0;

      const x1 = radius + radius * Math.cos((Math.PI * startAngle) / 180);
      const y1 = radius + radius * Math.sin((Math.PI * startAngle) / 180);
      const x2 = radius + radius * Math.cos((Math.PI * endAngle) / 180);
      const y2 = radius + radius * Math.sin((Math.PI * endAngle) / 180);

      const d = `M${radius},${radius} L${x1},${y1} A${radius},${radius} 0 ${largeArc},1 ${x2},${y2} Z`;

      const midAngle = startAngle + anglePerOption / 2;
      const textRadius = radius * 0.6;
      const textX = radius + textRadius * Math.cos((Math.PI * midAngle) / 180);
      const textY = radius + textRadius * Math.sin((Math.PI * midAngle) / 180);

      paths.push(
        <G key={i}>
          <Path
            d={d}
            fill={colors[i % colors.length]}
            stroke="#fff"
            strokeWidth={2}
          />
          <SvgText
            fill="#000"
            fontSize="15"
            fontWeight={500}
            x={textX}
            y={textY}
            textAnchor="middle"
            alignmentBaseline="middle"
            transform={`rotate(${midAngle}, ${textX}, ${textY})`}
          >
            {options[i]}
          </SvgText>
        </G>
      );

      startAngle += anglePerOption;
    }
    return paths;
  };

  return (
    <View className="items-center top-[-20px]">
      {/* Knob */}
      <View
        style={{
          position: "absolute",
          top: 30,
          width: 0,
          height: 0,
          borderLeftWidth: 15,
          borderRightWidth: 15,
          borderBottomWidth: 30,
          borderLeftColor: "transparent",
          borderRightColor: "transparent",
          borderBottomColor: "#FF69B4",
          zIndex: 20,
          transform: [{ rotate: "180deg" }],
        }}
      />
      <Animated.View
        style={[
          {
            width: 300,
            height: 300,
            marginTop: 50,
            // marginBottom: 20,
            borderRadius: 150,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 0.3,
            shadowRadius: 10,
            elevation: 10, // for Android shadow
            backgroundColor: "white", 
          },
          animatedStyle,
        ]}
      >
        <Svg width={300} height={300}>
          <G>{renderSlices()}</G>
        </Svg>
      </Animated.View>
    </View>
  );
});

export default WheelOfFortune;
