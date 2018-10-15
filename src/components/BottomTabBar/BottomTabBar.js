import React from "react";
import { View, Alert, TouchableOpacity, Text } from "react-native";

export default class BottomTabBar extends React.Component {
  renderIconButton = (route, index) => {
    const {
      navigation,
      renderIcon,
      onTabPress,
      activeTintColor,
      inactiveTintColor
    } = this.props;

    const isFocused = navigation.state.index === index;
    const tintColor = isFocused ? activeTintColor : inactiveTintColor;

    return (
      <TouchableOpacity
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          borderTopLeftRadius: 16,
          borderBottomRightRadius: 16
        }}
        onPress={() => onTabPress({ route })}
      >
        {renderIcon({
          route,
          tintColor,
          focused: isFocused
        })}
      </TouchableOpacity>
    );
  };

  render() {
    const { routes } = this.props.navigation.state;

    if (routes.length !== 2) {
      console.warn(
        `You have added more than 2 screens in your tab navigation. `,
        `You don't want to do that as the TabBar is custom made and won't show this! Either update the TabBar or change the number of screens`
      );
    }

    console.log("BottomTabBar props:\n", this.props);

    return (
      <View
        style={{
          height: 56,
          backgroundColor: "#eee",
          flexDirection: "row",
          alignItems: "stretch"
        }}
      >
        {this.renderIconButton(routes[0], 0)}

        <View
          style={{
            flex: 1,
            backgroundColor: "#ccc",
            borderTopLeftRadius: 16,
            borderBottomRightRadius: 16
          }}
        >
          <TouchableOpacity style={{ flex: 1 }} />
        </View>

        {this.renderIconButton(routes[1], 1)}
      </View>
    );
  }
}
