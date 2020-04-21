import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
class InitialScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textInputValue: "",
      activityIndicator: false,
    };
    this.handleTextValue = this.handleTextValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRandom = this.handleRandom.bind(this);
  }
  handleTextValue = (value) => {
    this.setState({ textInputValue: value });
  };
  handleSubmit = () => {
    if (this.state.textInputValue.length != 7) {
      alert("sorry astroid id should be 7 digits");
    } else {
      axios
        .get(
          `https://api.nasa.gov/neo/rest/v1/neo/${this.state.textInputValue}?api_key=gvJjQpDzge2GObWhDOBxUQNiN1lCJWwyEtSIVQYn`
        )
        .then((res) => {
          // console.log(res.data);
          this.props.navigation.navigate("DetailsScreen", {
            id: res.data.id,
            name: res.data.name,
            nasa_jpl_url: res.data.nasa_jpl_url,
            is_potentially_hazardous_asteroid:
              res.data.is_potentially_hazardous_asteroid,
          });
        })
        .catch((err) => {
          alert("sorry no astroid found with this id");
          this.setState({ textInputValue: "" });
          console.log(err);
        });
    }
  };
  handleRandom = () => {
    axios
      .get(
        `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=gvJjQpDzge2GObWhDOBxUQNiN1lCJWwyEtSIVQYn`
      )
      .then((res) => {
        // console.log(res.data.near_earth_objects.length);
        const randomNumber = Math.floor(
          Math.random() * Math.floor(res.data.near_earth_objects.length)
        );
        axios
          .get(
            `https://api.nasa.gov/neo/rest/v1/neo/${res.data.near_earth_objects[randomNumber].id}?api_key=gvJjQpDzge2GObWhDOBxUQNiN1lCJWwyEtSIVQYn`
          )
          .then((res) => {
            // console.log(res.data);
            this.props.navigation.navigate("DetailsScreen", {
              id: res.data.id,
              name: res.data.name,
              nasa_jpl_url: res.data.nasa_jpl_url,
              is_potentially_hazardous_asteroid:
                res.data.is_potentially_hazardous_asteroid,
            });
          })
          .catch((err) => {
            alert("sorry no astroid found with this id");
            this.setState({ textInputValue: "" });
            console.log(err);
          });
      })
      .catch((err) => {
        alert("something went wrong");

        console.log(err);
      });
  };
  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <TextInput
            onChangeText={this.handleTextValue}
            placeholder="Enter Asteroid ID"
            style={styles.textInput}
            value={this.state.textInputValue}
            keyboardType={"number-pad"}
          />
          <TouchableOpacity
            onPress={this.handleSubmit}
            disabled={this.state.textInputValue == "" ? true : false}
            style={styles.buttons}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handleRandom} style={styles.buttons}>
            <Text style={styles.buttonText}>Random Asteroid</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingBottom: height * 0.1,
  },
  textInput: {
    width: width * 0.65,
    height: height * 0.08,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: width * 0.04,
    padding: height * 0.02,
  },
  buttons: {
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.5,
    height: height * 0.07,
    backgroundColor: "#191970",
    borderRadius: width * 0.04,
  },
  buttonText: {
    color: "white",
  },
});

export default InitialScreen;
