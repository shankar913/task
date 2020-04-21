import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
let height = Dimensions.get("window").height;
let width = Dimensions.get("window").width;
class DetailsScreen extends React.Component {
  render() {
    let data = this.props.route.params;
    //console.log(data);
    return (
      <View style={styles.container}>
        <View style={styles.viewStyle}>
          <Text style={styles.textStyle}>Name : </Text>
          <Text>{data.name}</Text>
        </View>

        <View style={styles.viewStyle}>
          <Text style={styles.textStyle}>Nasa_jpl_url : </Text>
          <Text>{data.nasa_jpl_url}</Text>
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.textStyle}>
            Is_potentially_hazardous_asteroid :{" "}
          </Text>
          <Text>
            {data.is_potentially_hazardous_asteroid ? "true" : "false"}
          </Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    //alignItems: "center",
    padding: width * 0.07,
  },
  textStyle: {
    fontWeight: "bold",
  },
  viewStyle: {
    flexDirection: "row",
    marginBottom: height * 0.03,
    width: width * 0.8,
  },
});
export default DetailsScreen;
