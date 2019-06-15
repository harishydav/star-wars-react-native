import React, { Component } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { AppLoading, Asset, Font, Icon } from "expo";
import AppNavigator from "./navigation/AppNavigator";

import {
  observable,
  action,
  computed,
  extendObservable,
  KeepAwake
} from "mobx";
import { Provider, inject, observer } from "mobx-react";
import ApplicationState from "./stores/Application.State.Mobx";
import StarWarsState from "./stores/Starwars.State.Mobx";
import { Ionicons } from "@expo/vector-icons";

@inject("ApplicationState")
@observer
class RootContainer extends Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
  }

  async componentWillMount() {}

  render() {
    return (
      <View>
        <StatusBar barStyle="light-content" translucent />
        {Platform.OS === "android" && Platform.Version >= 20 ? (
          <StatusBarAndroid />
        ) : null}

        <AppNavigator
          ApplicationState={ApplicationState}
          onNavigationStateChange={(prevState, currentState) => {
            //// console.log(args);
            const prevRoute = prevState.routes[0].routes[0].index;
            const nextRoute = currentState.routes[0].routes[0].index;
            //// console.log(prevRoute, nextRoute);
          }}
        />
      </View>
    );
  }
}

// @observer
// class App extends Component {
//   constructor(props) {
//     super(props);
//     console.disableYellowBox = true;
//   }

//   componentDidMount() { }
//   componentWillMount() { }
//   componentWillUnmount() { }
//   componentWillReceiveProps() { }
//   componentWillUpdate() { }

//   render() {
//     //if (ApplicationState.AppGlobalState.SplashShowing === false){
//     return (
//       <Provider ApplicationState={ApplicationState}>
//         <RootContainer />
//       </Provider>
//     );
//   }
// }

// export default App;

@observer
export default class App extends React.Component {
  state = {
    isReady: false
  };
  // Later on in your component
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <Provider
        ApplicationState={ApplicationState}
        StarWarsState={StarWarsState}>
        <AppNavigator />
      </Provider>
    );
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require("./assets/images/robot-dev.png"),
        require("./assets/images/robot-prod.png")
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
      })
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
