import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  ListItem,
  Text,
  Left,
  Right,
  Body
} from "native-base";
import { observer, inject } from "mobx-react";
import moment from "moment";

@inject("StarWarsState")
@observer
export default class DetailsScreen extends React.Component {
  // static navigationOptions = {
  //   title: "Movie Details"
  // };

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("title", "Movie Title")
    };
  };

  componentDidMount() {
    const movie = this.props.navigation.getParam("data", {});
    this.props.StarWarsState.clearPlanets();
    this.props.StarWarsState.getPlanets(movie.planets);
  }

  render() {
    const movie = this.props.navigation.getParam("data", {});
    const planets = this.props.StarWarsState.planets;
    console.log("updated planets: ", planets.map(planet => planet.name));

    return (
      <ScrollView style={styles.container}>
        <Content>
          <ListItem itemDivider>
            <Text>Plot</Text>
          </ListItem>
          <ListItem>
            <Text>{movie.opening_crawl.replace(/\n/g, "")}</Text>
          </ListItem>
        </Content>

        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Content>
              <ListItem itemDivider>
                <Text>Episode</Text>
              </ListItem>
              <ListItem>
                <Text>{movie.episode_id}</Text>
              </ListItem>

              <ListItem itemDivider>
                <Text>Release Date</Text>
              </ListItem>
              <ListItem>
                <Text>{moment(movie.release_date).format("MMMM Do YYYY")}</Text>
              </ListItem>
            </Content>
          </View>
          <View style={{ flex: 1 }}>
            <Content>
              <ListItem itemDivider>
                <Text>Director</Text>
              </ListItem>
              <ListItem>
                <Text>{movie.director}</Text>
              </ListItem>

              <ListItem itemDivider>
                <Text>Producer</Text>
              </ListItem>
              <ListItem>
                <Text>{movie.producer}</Text>
              </ListItem>
            </Content>
          </View>
        </View>
        <Content>
          {planets && planets.length > 0 && (
            <ListItem itemDivider>
              <Text>Planets in Movie</Text>
            </ListItem>
          )}

          {planets &&
            planets.length > 0 &&
            planets.map(planet => (
              <ListItem key={planet.name}>
                <Text>{planet.name}</Text>
              </ListItem>
            ))}
        </Content>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 15,
    backgroundColor: "#fff"
  }
});
