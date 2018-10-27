import React from "react";
import { View, Alert, TouchableOpacity, Text } from "react-native";
import Posed from "react-native-pose";
import { SimpleLineIcons } from "@expo/vector-icons";

const Wrap = Posed.View({
  activeState: {
    rotate: "360deg",
    scale: 1,
    opacity: 1,
    transition: { duration: 600, ease: "anticipate" }
  },
  inactiveState: {
    rotate: "0deg",
    scale: 0.8,
    opacity: 0.6,
    transition: {
      rotate: { duration: 0 },
      default: {
        duration: 600,
        ease: "anticipate"
      }
    }
  }
});

export default class BottomTabBar extends React.Component {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.navigation.state.index !== this.props.navigation.state.index
    );
  }

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
        <Wrap
          pose={isFocused ? "activeState" : "inactiveState"}
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {renderIcon({
            route,
            tintColor: activeTintColor,
            focused: isFocused
          })}
        </Wrap>
      </TouchableOpacity>
    );
  };

  render() {
    const { activeTintColor, navigation } = this.props;
    const { routes } = navigation.state;

    if (routes.length !== 2) {
      console.warn(
        `You have added more than 2 screens in your tab navigation. `,
        `You don't want to do that as the TabBar is custom made and won't show this! Either update the TabBar or change the number of screens`
      );
    }

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
          <TouchableOpacity
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
            onPress={() => {
              navigation.navigate("LoadingChatScreen");
            }}
          >
            <SimpleLineIcons name="plus" color={activeTintColor} size={42} />
          </TouchableOpacity>
        </View>

        {this.renderIconButton(routes[1], 1)}
      </View>
    );
  }
}
