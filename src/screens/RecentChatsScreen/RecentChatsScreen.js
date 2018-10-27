import React from "react";
import {
  Alert,
  Text,
  View,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Image
} from "react-native";
import { Spacer } from "../../components";

const RoundImage = ({ size, source, style }) => (
  <Image
    style={[{ width: size, height: size, borderRadius: size / 2 }, style]}
    resizeMode="cover"
    source={source}
  />
);

const RecentChatListItem = ({}) => (
  <View style={{ flexDirection: "row", flex: 1, padding: 8 }}>
    <RoundImage size={52} source={{ uri: "https://placebear.com/100/100" }} />

    <Spacer />

    <View style={{ flex: 1 }}>
      <Text>Jimbo</Text>
      <Text>Last message from user...</Text>
    </View>
  </View>
);

class RecentChatsScreen extends React.Component {
  render() {
    return (
      <FlatList
        data={Array.from({ length: 10 })}
        style={{ flex: 1, backgroundColor: "white", padding: 8 }}
        keyExtractor={(_, index) => index.toString()}
        ItemSeparatorComponent={Spacer}
        renderItem={({ index }) => {
          const isEven = index % 2 === 0;
          return (
            <View
              style={{
                alignSelf: "stretch",
                backgroundColor: isEven ? "#ddd" : "#eee",
                height: 68
              }}
            >
              <RecentChatListItem />
            </View>
          );
        }}
      />
    );
  }
}

export default RecentChatsScreen;
