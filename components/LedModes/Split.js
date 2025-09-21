import { Modal, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import CustomButton from "../UI/CustomButton";
import CustomColorPicker from "../UI/CustomColorPicker";
import CustomSelectDropdown from "../UI/CustomSelectDropdown";
import { LINE_HEIGHT } from "../../globals/Constants";
import { ERROR } from "../../globals/Colors";

export default function Split({ applyChanges, setApplyChanges }) {
  const serverUrl = useSelector((state) => state.connection.serverUrl);
  const splitMode = {
    Horizontal: "Horizontal",
    Vertical: "Vertical",
    FourPieces: "Four Pieces",
  };

  const [selectedSplitMode, setSelectedSplitMode] = useState(
    splitMode.Horizontal
  );

  const [showColorPickerModal, setShowColorPickerModal] = useState(false);
  const [selectedColorIndex, setSelectedColorIndex] = useState(null);

  const [selectedColors, setSelectedColor] = useState([
    "#ff0000",
    "#ffff00",
    "#00ff00",
    "#0000ff",
  ]);

  const [tempSelectedColors, setTempSelectedColor] = useState([
    "#ff0000",
    "#ffff00",
    "#00ff00",
    "#0000ff",
  ]);

  useEffect(() => {
    fetchColors();
  }, []);

  useEffect(() => {
    if (applyChanges) {
      activateSplitMode();
      setApplyChanges(false);
    }
  }, [applyChanges]);

  const fetchColors = async () => {
    try {
      const response = await fetch(serverUrl + "split");
      const responseData = await response.json();
      setSelectedSplitMode(responseData.splitMode);
      setSelectedColor(responseData.colorHexArray);
      setTempSelectedColor(responseData.colorHexArray);
    } catch (err) {
      console.log(err);
    }
  };

  const activateSplitMode = async () => {
    try {
      const formData = new FormData();
      formData.append("splitMode", selectedSplitMode);
      formData.append("firstColorHex", selectedColors[0].substring(1));
      formData.append("secondColorHex", selectedColors[1].substring(1));
      if (selectedSplitMode === splitMode.FourPieces) {
        formData.append("thirdColorHex", selectedColors[2].substring(1));
        formData.append("fourthColorHex", selectedColors[3].substring(1));
      }
      const response = await fetch(serverUrl + "split", {
        method: "POST",
        body: formData,
      });
      const responseData = await response.json();
      console.log(responseData.message);
    } catch (err) {
      console.log(err);
    }
  };

  const splitModeSelectHandler = (selectedMode) => {
    setSelectedSplitMode(selectedMode);
  };

  const swapColorsHandler = (index = 0) => {
    switch (index) {
      case 0:
        setSelectedColor((prev) => {
          return [prev[1], prev[0], prev[2], prev[3]];
        });
        setTempSelectedColor((prev) => {
          return [prev[1], prev[0], prev[2], prev[3]];
        });
        break;
      case 1:
        setSelectedColor((prev) => {
          return [prev[0], prev[3], prev[2], prev[1]];
        });
        setTempSelectedColor((prev) => {
          return [prev[0], prev[3], prev[2], prev[1]];
        });
        break;
      case 2:
        setSelectedColor((prev) => {
          return [prev[0], prev[1], prev[3], prev[2]];
        });
        setTempSelectedColor((prev) => {
          return [prev[0], prev[1], prev[3], prev[2]];
        });
        break;
      case 3:
        setSelectedColor((prev) => {
          return [prev[2], prev[1], prev[0], prev[3]];
        });
        setTempSelectedColor((prev) => {
          return [prev[2], prev[1], prev[0], prev[3]];
        });
        break;
    }
  };

  const openColorPickerModalHandler = (index) => {
    setSelectedColorIndex(index);
    setShowColorPickerModal(true);
  };

  const closeColorPickerModalHandler = () => {
    setShowColorPickerModal(false);
    setTempSelectedColor([...selectedColors]);
  };

  const colorSelectHandler = () => {
    setShowColorPickerModal(false);
    setSelectedColor([...tempSelectedColors]);
  };

  const tempSelectedColorHandler = ({ hex }) => {
    setSelectedColor([...tempSelectedColors]);

    const tempColors = tempSelectedColors.map((color, index) => {
      if (index === selectedColorIndex) return hex;
      else return color;
    });

    setTempSelectedColor(tempColors);
  };

  return (
    <>
      <Modal visible={showColorPickerModal} transparent>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#000000c4",
          }}
        >
          <View
            style={{
              width: "80%",
              height: "80%",
            }}
          >
            <CustomColorPicker
              selectedColor={tempSelectedColors[selectedColorIndex]}
              onSelectColor={tempSelectedColorHandler}
            />

            <View style={{ gap: 20 }}>
              <CustomButton title="select color" onPress={colorSelectHandler} />
              <CustomButton
                title="cancel"
                bgColor={ERROR}
                onPress={closeColorPickerModalHandler}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* <TabView renderScene={renderScene} /> */}
      <View style={styles.container}>
        <CustomSelectDropdown
          data={Object.values(splitMode)}
          onSelect={splitModeSelectHandler}
          initialValue={selectedSplitMode}
        />

        {selectedSplitMode === splitMode.Horizontal && (
          <>
            <CustomButton
              bgColor={selectedColors[0]}
              title="Top Color"
              lineHeight={LINE_HEIGHT * 2}
              onPress={openColorPickerModalHandler.bind(null, 0)}
            />

            <View style={{ alignItems: "center" }}>
              <CustomButton
                bgColor="#d1d1d1"
                iconName="swap"
                paddingHorizontal={12}
                iconRotation={90}
                onPress={swapColorsHandler.bind(null, 0)}
              />
            </View>

            <CustomButton
              bgColor={selectedColors[1]}
              title="Bottom Color"
              lineHeight={LINE_HEIGHT * 2}
              onPress={openColorPickerModalHandler.bind(null, 1)}
            />
          </>
        )}

        {selectedSplitMode === splitMode.Vertical && (
          <>
            <View
              style={{
                flexDirection: "row",
                gap: 20,
              }}
            >
              <CustomButton
                bgColor={selectedColors[0]}
                title="Left Color"
                lineHeight={LINE_HEIGHT * 2}
                buttonStyle={{ flex: 1 }}
                onPress={openColorPickerModalHandler.bind(null, 0)}
              />

              <View style={{ justifyContent: "center" }}>
                <CustomButton
                  bgColor="#d1d1d1"
                  iconName="swap"
                  paddingHorizontal={12}
                  onPress={swapColorsHandler.bind(null, 0)}
                />
              </View>

              <CustomButton
                bgColor={selectedColors[1]}
                title="RIght Color"
                lineHeight={LINE_HEIGHT * 2}
                buttonStyle={{ flex: 1 }}
                onPress={openColorPickerModalHandler.bind(null, 1)}
              />
            </View>
          </>
        )}

        {selectedSplitMode === splitMode.FourPieces && (
          <>
            <View
              style={{
                flexDirection: "row",
                gap: 20,
              }}
            >
              <CustomButton
                bgColor={selectedColors[0]}
                title="Top Left Color"
                lineHeight={LINE_HEIGHT * 2}
                buttonStyle={{ flex: 1 }}
                onPress={openColorPickerModalHandler.bind(null, 0)}
              />

              <View style={{ justifyContent: "center" }}>
                <CustomButton
                  bgColor="#d1d1d1"
                  iconName="swap"
                  paddingHorizontal={12}
                  onPress={swapColorsHandler.bind(null, 0)}
                />
              </View>

              <CustomButton
                bgColor={selectedColors[1]}
                title="Top RIght Color"
                lineHeight={LINE_HEIGHT * 2}
                buttonStyle={{ flex: 1 }}
                onPress={openColorPickerModalHandler.bind(null, 1)}
              />
            </View>

            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  width: 120,
                  alignItems: "center",
                }}
              >
                <CustomButton
                  bgColor="#d1d1d1"
                  iconName="swap"
                  paddingHorizontal={12}
                  iconRotation={90}
                  onPress={swapColorsHandler.bind(null, 3)}
                />
              </View>

              <View
                style={{
                  width: 120,
                  alignItems: "center",
                }}
              >
                <CustomButton
                  bgColor="#d1d1d1"
                  iconName="swap"
                  paddingHorizontal={12}
                  iconRotation={90}
                  onPress={swapColorsHandler.bind(null, 1)}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                gap: 20,
              }}
            >
              <CustomButton
                bgColor={selectedColors[2]}
                title="Bottom Left Color"
                lineHeight={LINE_HEIGHT * 2}
                buttonStyle={{ flex: 1 }}
                onPress={openColorPickerModalHandler.bind(null, 2)}
              />

              <View style={{ justifyContent: "center" }}>
                <CustomButton
                  bgColor="#d1d1d1"
                  iconName="swap"
                  paddingHorizontal={12}
                  onPress={swapColorsHandler.bind(null, 2)}
                />
              </View>

              <CustomButton
                bgColor={selectedColors[3]}
                title="Bottom RIght Color"
                lineHeight={LINE_HEIGHT * 2}
                buttonStyle={{ flex: 1 }}
                onPress={openColorPickerModalHandler.bind(null, 3)}
              />
            </View>
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
    gap: 20,
    // backgroundColor: "red",
  },
  colorPickerContainer: {
    gap: 20,
  },
});
