import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Posed from "react-native-pose";
import { SimpleLineIcons } from "@expo/vector-icons";

import { constants as C } from "../../style";

const S = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: C.colorBackgroundPrimary,
    justifyContent: "center",
    alignItems: "center"
  }
});

const ANIMATION_DURATION = 800;
const AnimatedView = Posed.View({
  magnifierAnimation: {
    rotate: ({ rotate }) => `${rotate}deg`,
    x: ({ x }) => x,
    y: ({ y }) => y,
    transition: { duration: ANIMATION_DURATION }
  }
});

class LoadingChatScreen extends React.Component {
  state = { rotate: 0, x: 0, y: 0, poseKey: 0 };

  constructor(props) {
    super(props);

    this.blurListener = props.navigation.addListener(
      "willBlur",
      this.handleBlur
    );

    // TODO: Dispatch startLookingForPartner
  }

  handleBlur = () => {
    // TODO: Dispatch stopLookingForPartner

    this.blurListener.remove();
  };

  componentDidMount() {
    this.intervalHandler = setInterval(() => {
      this.setState({
        rotate: Math.floor(Math.random() * 360),
        x: Math.floor(Math.random() * 300 - 150),
        y: Math.floor(Math.random() * 300 - 150),
        poseKey: this.state.poseKey + 1
      });
    }, ANIMATION_DURATION + 500);
  }

  componentWillUnmount() {
    if (typeof this.intervalHandler !== "undefined") {
      clearInterval(this.intervalHandler);
      this.intervalHandler = undefined;
    }
  }

  render() {
    const { rotate, x, y, poseKey } = this.state;

    return (
      <View style={S.screen}>
        <AnimatedView
          pose="magnifierAnimation"
          poseKey={poseKey}
          rotate={rotate}
          x={x}
          y={y}
        >
          <SimpleLineIcons
            name="magnifier"
            color={C.colorTextPrimary}
            size={96}
          />
        </AnimatedView>

        <View style={{ position: "absolute", bottom: 0, height: "20%" }}>
          <Text style={{ fontSize: 28 }}>Searching for a partner...</Text>
        </View>
      </View>
    );
  }
}

export default LoadingChatScreen;
