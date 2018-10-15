import React from "react";
import {
  StyleSheet,
  Text as RNText,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ScrollView,
  NativeModules,
  LayoutAnimation
} from "react-native";
import socket from "socket.io-client";

const Text = props => (
  <RNText style={{ color: "rgba(0,0,0,0.8)" }} {...props} />
);

const Spacer = ({ size }) => <View style={{ width: size, height: size }} />;

const S = StyleSheet.create({
  container: { flex: 1 },
  scroll: {
    marginTop: 25,
    flex: 1,
    backgroundColor: "#fff"
  },
  messagesWrap: { padding: 8 },
  message: {
    alignSelf: "stretch",
    padding: 8,
    borderBottomWidth: 2,
    borderBottomColor: "rgba(220,220,220,0.8)"
  },
  inputWrap: {
    flexDirection: "row",
    alignSelf: "stretch",
    padding: 8,
    borderTopColor: "rgba(220,220,220,0.8)",
    borderTopWidth: 2
  },
  newMessageInput: {
    paddingTop: 8,
    paddingBottom: 4,
    flex: 1,
    borderBottomColor: "rgba(0,0,0,.8)",
    borderBottomWidth: 2
  },
  submitButton: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
    borderWidth: 2,
    borderColor: "black",
    width: 44
  },
  submitButtonText: { fontWeight: "bold" }
});

export default class App extends React.Component {
  state = {
    newMessageText: "",
    messages: []
  };

  componentDidMount() {
    this.socket = socket("http://192.168.1.130:3000");
    this.socket.on("message", this.handleSocketMessage);

    setInterval(this.removeOldMessages, 5000);
  }

  removeOldMessages = () => {
    const now = new Date();

    // remove messages older than 5 minutes
    now.setMinutes(now.getMinutes() - 5);

    this.setState({
      messages: this.state.messages.filter(msg => msg.createdAt > now)
    });
  };

  handleSocketMessage = message => {
    this.setState({
      messages: [...this.state.messages, { ...message, remote: true }]
    });
  };

  handleMessageChangeText = newMessageText => {
    this.setState({ newMessageText });
  };

  handleMessageSend = () => {
    const { newMessageText } = this.state;
    this.socket.emit("new-message", newMessageText);

    this.setState({
      newMessageText: "",
      messages: [
        ...this.state.messages,
        { message: newMessageText, createdAt: Date.now(), remote: false }
      ]
    });
  };

  render() {
    const { newMessageText, messages } = this.state;

    return (
      <KeyboardAvoidingView behavior="padding" style={S.container}>
        <ScrollView style={S.scroll}>
          <View style={S.messagesWrap}>
            {messages.map(({ message, remote }, index) => {
              const viewStyle = {
                alignItems: remote ? "flex-start" : "flex-end"
              };

              const textStyle = { textAlign: remote ? "left" : "right" };

              return (
                <View key={index.toString()} style={[S.message, viewStyle]}>
                  <Text style={textStyle}>{message}</Text>
                </View>
              );
            })}
          </View>
        </ScrollView>
        <View style={S.inputWrap}>
          <TextInput
            underlineColorAndroid="transparent"
            selectionColor="rgba(0,0,0,0.8)"
            value={newMessageText}
            onChangeText={this.handleMessageChangeText}
            style={S.newMessageInput}
          />
          <Spacer size={8} />
          <TouchableOpacity
            style={S.submitButton}
            onPress={this.handleMessageSend}
          >
            <Text style={S.submitButtonText}>></Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
