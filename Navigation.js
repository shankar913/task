import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import InitialScreen from "./components/InitialScreen";
import DetailsScreen from "./components/DetailsScreen";
const Stack = createStackNavigator();
class Navigation extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="InitialScreen"
            component={InitialScreen}
            options={{
              title: "Home Screen",
            }}
          />
          <Stack.Screen
            name="DetailsScreen"
            component={DetailsScreen}
            options={{
              title: "Details Screen",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
export default Navigation;
