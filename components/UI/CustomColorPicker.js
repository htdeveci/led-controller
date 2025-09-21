import CustomButton from "./CustomButton";
import HSLColorPicker from "./HSLColorPicker";
import RGBColorPicker from "./RGBColorPicker";
import TabView from "./TabView";

export default function CustomColorPicker({ selectedColor, onSelectColor }) {
  const renderScene = [
    {
      key: "hsl",
      title: "HSL",
      render: (
        <HSLColorPicker
          selectedColor={selectedColor}
          onSelectColor={onSelectColor}
        />
      ),
    },
    {
      key: "rgb",
      title: "RGB",
      render: (
        <RGBColorPicker
          selectedColor={selectedColor}
          onSelectColor={onSelectColor}
        />
      ),
    },
  ];

  return <TabView renderScene={renderScene}></TabView>;
}
