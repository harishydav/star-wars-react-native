import React, { Component } from "react";
import { StyleSheet, Image } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Card,
  CardItem,
  Text,
  Thumbnail,
  Left,
  Body,
  Right,
  View
} from "native-base";
import moment from "moment";
const ANewHope = require("../assets/images/a-new-hope.jpg");

class MovieCard extends Component {
  shorten(s, n) {
    var cut = s.indexOf(" ", n);
    if (cut == -1) return s;
    return s.substring(0, cut);
  }

  render() {
    const { title, plot, episode, releaseDate } = this.props;
    console.log("AM I even accessible");
    return (
      <View>
        <Card style={styles.mb}>
          <CardItem>
            <Left>
              <Body>
                <Text>{title ? title : "Dummy Title"} </Text>
                <Text note>
                  {episode
                    ? `Episode : ${episode}, ${moment(releaseDate).format(
                        "MMMM Do YYYY"
                      )}`
                    : ""}
                </Text>
              </Body>
            </Left>
          </CardItem>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    width: "100%"
  },
  mb: {
    marginBottom: 0,
    flex: 1
  }
});

export default MovieCard;
