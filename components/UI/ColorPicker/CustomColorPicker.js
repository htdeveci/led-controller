import CustomButton from "../CustomButton";
import HSLColorPicker from "./HSLColorPicker";
import RGBColorPicker from "./RGBColorPicker";
import TabView from "../TabView";

export default function CustomColorPicker({ selectedColor, setSelectedColor, onSelectColor }) {
  const renderScene = [
    {
      key: "hsl",
      title: "HSL",
      render: (
        <HSLColorPicker
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
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
          setSelectedColor={setSelectedColor}
          onSelectColor={onSelectColor}
        />
      ),
    },
  ];

  return <TabView renderScene={renderScene}></TabView>;
}
