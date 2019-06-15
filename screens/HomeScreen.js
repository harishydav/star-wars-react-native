import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList
} from "react-native";
import { WebBrowser } from "expo";
import { Button, Text, Content } from "native-base";
import { Font } from "expo"; //to include font from expo.
import { ListItem } from "native-base";

import { MonoText } from "../components/StyledText";
import { observer, inject } from "mobx-react";

import MovieCard from "../components/movieCard";
import { AppLoading } from "expo";

@inject("StarWarsState")
// @inject("StarWarsState")
@observer
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Star Wars"
  };

  componentDidMount() {
    this.props.StarWarsState.getMovies();
  }
  t;

  render() {
    return (
      <View style={styles.container}>
        {/* <View style={{ flex: 1 }}>
          <View style={{ flex: 1, backgroundColor: "powderblue" }} />
          <View style={{ flex: 2, backgroundColor: "skyblue" }} />
          <View style={{ flex: 3, backgroundColor: "steelblue" }} />
        </View> */}

        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <Content>
            <ListItem itemDivider>
              <Text style={{ width: "100%" }}>
                Pick your favorite Star Wars Movie.
              </Text>
            </ListItem>
          </Content>
          {this.props.StarWarsState.movies &&
            this.props.StarWarsState.movies.length > 0 && (
              <FlatList
                data={this.props.StarWarsState.movies}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      key={item.title}
                      onPress={() => {
                        this.props.navigation.navigate("Details", {
                          title: item.title,
                          data: item
                        });
                      }}
                      style={{
                        boxShadow: "12px 12px 2px 1px rgba(0, 0, 255, .2);"
                      }}>
                      <MovieCard
                        title={item.title}
                        episode={item.episode_id}
                        releaseDate={item.release_date}
                      />
                    </TouchableOpacity>
                  );
                }}
                keyExtractor={(item, index) => item.title}
                style={{ width: "100%" }}
              />
            )}
          {this.props.StarWarsState.people &&
            this.props.StarWarsState.people.length > 0 && (
              <FlatList
                data={this.props.StarWarsState.movies}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      key={item.title}
                      onPress={() => {
                        this.props.navigation.navigate("Details", {
                          title: item.title,
                          data: item
                        });
                      }}>
                      <MovieCard title={item.title} plot={item.opening_crawl} />
                    </TouchableOpacity>
                  );
                }}
                keyExtractor={(item, index) => item.title}
                style={{ width: "100%" }}
              />
            )}
        </ScrollView>
      </View>
    );
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync(
      "https://docs.expo.io/versions/latest/guides/development-mode"
    );
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      "https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes"
    );
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  getStartedText: {
    fontSize: 14,
    paddingBottom: 10,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  changeTextButton: {
    backgroundColor: "grey",
    borderRadius: 5,
    padding: 5,
    color: "white"
  },
  movieList: {
    borderRadius: 5,
    padding: 5,
    color: "white",
    width: 150
  }
});
