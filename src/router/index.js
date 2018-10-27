import React from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import {
  RecentChatsScreen,
  SingleChatScreen,
  ProfileScreen,
  LoadingChatScreen
} from "../screens";
import { BottomTabBar } from "../components";

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

const ModalOverTabNavigator = createStackNavigator({
  RootNavigator: {
    screen: RootNavigator,
    navigationOptions: { header: null }
  },
  LoadingChatScreen: {
    screen: LoadingChatScreen,
    navigationOptions: { header: null, mode: "modal" }
  }
});

export default ModalOverTabNavigator;
