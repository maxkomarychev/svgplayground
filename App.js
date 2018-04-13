import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Slider, Alert } from "react-native";
import Svg, { G, Polygon, Defs, Use, Circle } from "react-native-svg";

export default class App extends Component {
  state = {
    value: 0,
    layouts: {}
  };
  onValueChange = value => {
    this.setState({ value });
  };
  handleLayout = event => {
    this.setState({
      layouts: {
        ...this.state.layouts,
        [event.target]: event.nativeEvent.layout
      }
    });
  };
  render() {
    const { value, layouts } = this.state;
    return (
      <View style={styles.container}>
        <View>
          <Svg
            width="300"
            height="300"
            viewBox="-300 -300 600 600"
            onLayout={this.handleLayout}
          >
            <G
              transform="translate(-1000 -1000)"
              onLayout={this.handleLayout}
              onPressIn={() => {
                Alert.alert("Touch handled in group!", "", [{ text: "OK" }], {
                  cancelable: false
                });
              }}
            >
              <Polygon
                points="100,10 40,198 190,78 10,78 160,198"
                fill="purple"
                onLayout={this.handleLayout}
                transform={`translate(905 905) scale(0.5 1) rotate(${value})`}
                onPressIn={() => {
                  Alert.alert(
                    "Touch handled in Polygon!",
                    "",
                    [{ text: "OK" }],
                    {
                      cancelable: false
                    }
                  );
                }}
              />
              <Circle
                cx="-100"
                cy="-225"
                r="55"
                fill="magenta"
                onLayout={this.handleLayout}
                transform={`translate(900 950) skewX(${value /
                  3}) skewY(${value / 3})`}
              />
              <Circle
                cx="0"
                cy="25"
                r="35"
                fill="red"
                onLayout={this.handleLayout}
                onPressIn={() => {
                  Alert.alert(
                    "Touch handled in Circle!",
                    "",
                    [{ text: "OK" }],
                    {
                      cancelable: false
                    }
                  );
                }}
                transform={`translate(900 950) skewX(${value /
                  3}) skewY(${value / 3})`}
              />
              <Use
                href="#poly"
                onLayout={this.handleLayout}
                onPressIn={() => {
                  Alert.alert("Touch handled in Use!", "", [{ text: "OK" }], {
                    cancelable: false
                  });
                }}
                transform={`translate(995 995) scale(0.5 1) rotate(${value})`}
              />
            </G>
            <Defs>
              <Polygon
                id="poly"
                points="100,10 40,198 190,78 10,78 160,198"
                fill="lime"
              />
            </Defs>
          </Svg>
          {Object.values(layouts).map(({ x: left, y: top, width, height }) => (
            <View
              style={{
                position: "absolute",
                borderWidth: 2,
                borderColor: "red",
                top,
                left,
                width,
                height
              }}
              pointerEvents="none"
            />
          ))}
        </View>
        <Slider
          style={{ width: "90%" }}
          maximumValue={360}
          minimumValue={-360}
          value={0}
          onValueChange={this.onValueChange}
        />
        <Text>Value: {value}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});
