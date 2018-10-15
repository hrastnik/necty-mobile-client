import React from "react";
import { View, StyleSheet } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
// import { BottomTabBar } from "react-navigation-tabs";
import { RecentChatsScreen, SingleChatScreen, ProfileScreen } from "../screens";
import { BottomTabBar } from "../components";

// const TabBarComponent = props => (
//   <View>
//     <TabBarComponent {...props} />
//     <View
//       style={{
//         ...StyleSheet.absoluteFillObject,
//         backgroundColor: "rgba(255,0,0,0.5)"
//       }}
//     />
//   </View>
// );

const RootNavigator = createBottomTabNavigator(
  {
    RecentChatsTab: {
      screen: createStackNavigator({
        RecentChatsScreen: {
          screen: RecentChatsScreen,
          navigationOptions: { title: "Recent" }
        }
      }),
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <SimpleLineIcons name="bubbles" color={tintColor} size={28} />
        )
      }
    },
    ProfileTab: {
      screen: createStackNavigator({
        ProfileScreen: {
          screen: ProfileScreen,
          navigationOptions: { title: "Profile" }
        }
      }),
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <SimpleLineIcons name="user" color={tintColor} size={28} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      showLabel: false,
      activeTintColor: "rgba(0,0,0,0.8)",
      inactiveTintColor: "#bbb"
    },
    animationEnabled: true,
    swipeEnabled: true,
    tabBarComponent: BottomTabBar
  }
);

export default RootNavigator;
