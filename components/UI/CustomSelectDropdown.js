import { StyleSheet, Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  BACKGROUND_LIGHT,
  PRIMARY,
  TEXT_DARK,
  TEXT_LIGHT,
} from "../../globals/Colors";
import { LINE_HEIGHT } from "../../globals/Constants";

export default function CustomSelectDropdown({
  data,
  onSelect,
  initialValue = null,
}) {
  return (
    <SelectDropdown
      data={data}
      // defaultValueByIndex={0}
      defaultValue={initialValue || data[0]}
      onSelect={onSelect}
      renderButton={(selectedItem, isOpened) => {
        return (
          <View style={styles.dropdownButtonStyle}>
            {selectedItem && selectedItem.icon && (
              <Icon
                name={selectedItem.icon}
                style={styles.dropdownButtonIconStyle}
              />
            )}
            <Text style={styles.dropdownButtonTxtStyle}>{selectedItem}</Text>
            <Icon
              name={isOpened ? "chevron-up" : "chevron-down"}
              style={styles.dropdownButtonArrowStyle}
            />
          </View>
        );
      }}
      renderItem={(item, index, isSelected) => {
        return (
          <View
            style={{
              ...styles.dropdownItemStyle,
              ...(isSelected && { backgroundColor: PRIMARY }),
            }}
          >
            <Text
              style={{
                ...styles.dropdownItemTxtStyle,
                ...(isSelected && { color: TEXT_LIGHT }),
              }}
            >
              {item}
            </Text>
          </View>
        );
      }}
      dropdownStyle={styles.dropdownMenuStyle}
    />
  );
}

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    // width: 250,
    height: LINE_HEIGHT,
    backgroundColor: BACKGROUND_LIGHT,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: TEXT_DARK,
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    marginTop: -30,
    backgroundColor: BACKGROUND_LIGHT,
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    height: LINE_HEIGHT,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: TEXT_DARK,
  },
});
