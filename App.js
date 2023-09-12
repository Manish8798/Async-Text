import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [value1, setValue1] = useState(1);
  const [value2, setValue2] = useState(2);
  const [asyncData, setAsyncData] = useState(null);

  const handleOnChange = (val, type) => {
    if (type == 1) {
      setValue1(val);
    } else {
      setValue2(val);
    }
  };

  const storeData = async () => {
    const data = { val1: value1, val2: value2 };
    try {
      await AsyncStorage.setItem("key", JSON.stringify(data));
      console.log("Data stored successfully.");
    } catch (error) {
      console.error("Error storing data:", error);
    }
  };

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("key");
      if (value !== null) {
        console.log("Retrieved value:", value);
        setAsyncData(JSON.parse(value));
      } else {
        console.log("Value does not exist in AsyncStorage.");
      }
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.text}>{asyncData?.val1}</Text>
        <Text style={styles.text}>{asyncData?.val2}</Text>
        <TextInput
          placeholder="Input 1"
          style={styles.input}
          value={value1}
          onChange={(v) => handleOnChange(v.nativeEvent.text, 1)}
        />
        <TextInput
          placeholder="Input 2"
          style={styles.input}
          value={value2}
          onChange={(v) => handleOnChange(v.nativeEvent.text, 2)}
        />
        <Button
          style={styles.button}
          title="Store"
          onPress={() => storeData()}
        />
        <Button title="Get Data" onPress={() => retrieveData()} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 10,
  },
  input: {
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
  text: {
    fontSize: 32,
    textAlign: "center",
    fontWeight: "bold",
  },
  button: {
    marginHorizontal: 10,
  },
});
