import { observable, action, computed, runInAction } from "mobx";
import { create, persist } from "mobx-persist";
import { AsyncStorage, Animated } from "react-native";
class StarWarsState {
  constructor() {}

  @observable movies = [];
  @observable planets = [];

  @action getMovies = async () => {
    try {
      const movies = await fetch(`https://swapi.co/api/films`).then(res =>
        res.json()
      );

      runInAction(() => {
        this.movies = movies.results.sort((a, b) => {
          if (a.episode_id > b.episode_id) return 1;
          return -1;

          return 0;
        });
      });
    } catch (error) {}
  };

  @action getPlanets = async planetArray => {
    try {
      console.log("getting planets");

      const planets = await Promise.all(
        planetArray.map(planetUrl => fetch(planetUrl).then(res => res.json()))
      );

      runInAction(() => {
        this.planets = planets;
        console.log("Got planets", this.planets.map(planet => planet.name));
      });
    } catch (error) {}
  };
  @action clearPlanets = async () => {
    runInAction(() => {
      console.log("Clearing The planets");
      this.planets = [];
    });
  };
}

/*
  We create and export a singleton (a single instance of our state).
  This allows us to use inject the same state across the app with ease.

  Some situations warrant having a new instance of state (e.g. login or sensitive state).
*/
const singleton = new StarWarsState();
export default singleton;

// const hydrate = create({
//   storage: AsyncStorage, // Choose our storage medium, ensure it's imported above
//   jsonify: true // if you use AsyncStorage, this needs to be true
// });

// // We hydrate anything we've persisted so that it is updated into the state on creation
// hydrate("persistedState", singleton).then(data => {});
