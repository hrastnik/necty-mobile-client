import React from "react";
import {
  Alert,
  Text,
  View,
  ScrollView,
  FlatList,
  ActivityIndicator
} from "react-native";

class RecentChatsScreen extends React.Component {
  render() {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
        {Array.from({ length: 10 }).map((_, index) => {
          const isEven = index % 2 === 0;
          return (
            <View
              style={{
                alignSelf: "stretch",
                backgroundColor: isEven ? "#ddd" : "#eee",
                height: 68,
                margin: 8
              }}
            />
          );
        })}
      </ScrollView>
    );
  }
}

export default RecentChatsScreen;
