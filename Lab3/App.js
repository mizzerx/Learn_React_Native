import React, { Component } from 'react';
import { View, Text, StyleSheet, Keyboard } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: 0,
      conversation: 0,
      flag: ''
    }
  };

  Calculate = (text) => {
   this.setState(
     (previousState) => {
       return {
         currency: text,
         conversation: text / 23
       }
     }
   )
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.txtDesc}>Please enter the value of the currency you want to convert</Text>
        <TextInput
          style={styles.txtInput}
          textAlign='center'
          keyboardType='number-pad'
          onChangeText={this.Calculate}
          placeholder="0"
          autoFocus={true}
          onSubmitEditing={Keyboard.dismiss}></TextInput>
        <ButtonOpacity from="VND" to="USD"></ButtonOpacity>
        <ButtonOpacity from="USD" to="VND"></ButtonOpacity>
        <Text>Current Currency</Text>
        <Text style={styles.currencyTxt}>{this.state.currency}</Text>
        <Text>Conversation Currency</Text>
        <Text style={styles.currencyTxt}>{this.state.conversation}</Text>
      </View>
    );
  }
}

const ButtonOpacity = (props) => {
  return(
    <TouchableOpacity style={styles.btnChange}>
      <Text>{props.from} to {props.to}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtInput: {
    width: 330,
    height: 50,
    borderWidth: 1,
    borderColor: 'skyblue',
    padding: 10
  },
  txtDesc: {
    fontSize: 20,
    marginBottom: 10,
    marginLeft: 10
  },
  btnChange: {
    height: 35,
    width: 200,
    margin: 10,
    borderWidth: 2,
    borderRadius: 20,
    alignItems: 'center',
    borderColor: 'lightblue',
    justifyContent: 'center'
  },
  currencyTxt: {
    fontSize: 30,
    color: 'green',
    fontWeight: 'bold'
  }
});

export default App
