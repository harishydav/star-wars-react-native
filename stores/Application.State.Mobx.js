import { observable, action, computed, extendObservable } from "mobx";
import { create, persist } from "mobx-persist";
import { AsyncStorage, Animated } from "react-native";
import { Amplitude } from "expo";
import Fuse from "fuse.js";
import _ from "lodash";

class ApplicationState {
  constructor() {}

  @persist("list") @observable _AnExampleArray = [];
  @persist @observable _APersistedVariable = "Motorbike";
  @persist("object") @observable _AnExampleObject = {
    a: "foo",
    b: "bar",
    c: 2,
    d: true
  };
  @observable _exampleStateValue = "cat";

  @action updateExampleStateValue(newValue) {
    this._exampleStateValue = newValue;
  }
  @computed get exampleStateValue() {
    return this._exampleStateValue;
  }

  @action updatePersistedVariable(newValue) {
    this._APersistedVariable = newValue;
  }
  @computed get APersistedVariable() {
    return this._APersistedVariable;
  }
}

/*
  We create and export a singleton (a single instance of our state).
  This allows us to use inject the same state across the app with ease.

  Some situations warrant having a new instance of state (e.g. login or sensitive state).
*/
const singleton = new ApplicationState();
export default singleton;

const hydrate = create({
  storage: AsyncStorage, // Choose our storage medium, ensure it's imported above
  jsonify: true // if you use AsyncStorage, this needs to be true
});

// We hydrate anything we've persisted so that it is updated into the state on creation
hydrate("persistedState", singleton).then(data => {
  // console.log("Hydrated persisted data; ", data);
});
