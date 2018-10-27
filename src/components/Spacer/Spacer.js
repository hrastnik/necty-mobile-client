import React from "react";
import { View, StyleSheet } from "react-native";
import { constants as C } from "../../style";

const S = StyleSheet.create({
  small: { width: C.spacingSmall, height: C.spacingSmall },
  medium: { width: C.spacingMedium, height: C.spacingMedium },
  large: { width: C.spacingLarge, height: C.spacingLarge },
  extraLarge: { width: C.spacingExtraLarge, height: C.spacingExtraLarge }
});

export default ({
  small = false,
  medium = true,
  large = false,
  extraLarge = false
}) => {
  let sizeStyle = S.medium;
  if (small) sizeStyle = S.small;
  else if (medium) sizeStyle = S.medium;
  else if (large) sizeStyle = S.large;
  else if (extraLarge) sizeStyle = S.extraLarge;

  return <View style={sizeStyle} />;
};
