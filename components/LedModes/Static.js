import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import CustomColorPicker from "../UI/CustomColorPicker";

export default function Static({ applyChanges, setApplyChanges }) {
  const serverUrl = useSelector((state) => state.connection.serverUrl);
  const [selectedColor, setSelectedColor] = useState("#ff0000");

  /* function decimalToHex(d, padding) {
    var hex = Number(d).toString(16);
    padding =
      typeof padding === "undefined" || padding === null
        ? (padding = 2)
        : padding;

    while (hex.length < padding) {
      hex = "0" + hex;
    }

    return hex;
  } */

  useEffect(() => {
    fetchColor();
  }, []);

  useEffect(() => {
    if (applyChanges) {
      changeColor();
      setApplyChanges(false);
    }
  }, [applyChanges]);

  const fetchColor = async () => {
    try {
      const response = await fetch(serverUrl + "static");
      const responseData = await response.json();
      setSelectedColor(responseData.colorHex);
    } catch (err) {
      console.log(err);
    }
  };

  const changeColor = async () => {
    try {
      const formData = new FormData();
      formData.append("colorHex", selectedColor.substring(1));
      const response = await fetch(serverUrl + "static", {
        method: "POST",
        body: formData,
      });
      const responseData = await response.json();
      console.log(responseData.message);
    } catch (err) {
      console.log(err);
    }
  };

  const onSelectColor = ({ hex }) => {
    // selectedColor.value = hex;
    setSelectedColor(hex);
  };

  return (
    <CustomColorPicker
      selectedColor={selectedColor}
      onSelectColor={onSelectColor}
    />
  );
}
