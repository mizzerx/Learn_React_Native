import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import styles from './Styles';

const RPSGame = () => {
  const [gamePrompt, setGamePrompt] = useState("Fight!");
  const [userChoice, setUserChoice] = useState({});
  const [computerChoice, setComputerChoice] = useState({});
  const [computerResult, setComputerResult] = useState(0);
  const [playerResult, setPlayerResult] = useState(0);
  const total = computerResult + playerResult;
  const playerResultPercent = (playerResult === 0 && computerResult === 0) ? 0 : Math.round(playerResult * 100 / total);
  const computerResultPercent = (computerResult === 0 && playerResult === 0) ? 0 : Math.round(computerResult * 100 / total);

  const getRoundOutcome = userChoice => {
    const computerChoice = CHOICES[Math.floor(Math.random() * CHOICES.length)].name;
    let result;

    if (userChoice === 'rock') {
      result = computerChoice === 'scissors' ? 'Victory!' : 'Defeat!';
    }
    if (userChoice === 'paper') {
      result = computerChoice === 'rock' ? 'Victory!' : 'Defeat!';
    }
    if (userChoice === 'scissors') {
      result = computerChoice === 'paper' ? 'Victory!' : 'Defeat!';
    }

    if (userChoice === computerChoice) result = 'Tie game!';
    return [result, computerChoice];
  };

  const GameBtn = (props) => (
    <TouchableOpacity
      style={styles.buttonStyle}
      onPress={() => props.onPress(props.name)}>
      <Text
        style={styles.buttonText}>
        {props.name.charAt(0).toUpperCase() + props.name.slice(1)}
      </Text>
    </TouchableOpacity>
  );

  const ChoiceCard = ({ player, choice: { uri, name } }) => {
    const title = name && name.charAt(0).toUpperCase() + name.slice(1);

    return (
      <View style={styles.choiceContainer}>
        <Text style={styles.choiceDescription}>{player}</Text>
        <Image source={{ uri }} resizeMode="contain" style={styles.choiceImage} />
        <Text style={styles.choiceCardTitle}>{title}</Text>
      </View>
    );
  };

  const _onPress = playerChoice => {
    const [result, compChoice] = getRoundOutcome(playerChoice);

    const newUserChoice = CHOICES.find(choice => choice.name === playerChoice);
    const newComputerChoice = CHOICES.find(choice => choice.name === compChoice);

    setGamePrompt(result);
    setUserChoice(newUserChoice);
    setComputerChoice(newComputerChoice);

    if (result === 'Victory!') setPlayerResult(playerResult + 1);
    else if (result === 'Defeat!') setComputerResult(computerResult + 1);
  }

  const getResultColor = () => {
    if (gamePrompt === 'Victory!') return 'green';
    if (gamePrompt === 'Defeat!') return 'red';
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 35, color: getResultColor() }}>{gamePrompt}</Text>
      <View style={styles.choicesContainer}>
        <ChoiceCard player="Player" choice={userChoice} />
        <Text style={{ color: '#250902' }}>VS</Text>
        <ChoiceCard player="Computer" choice={computerChoice} />
      </View>
      <Text>Player: Win {playerResult} ({playerResultPercent}%) - Lose {computerResult} ({computerResultPercent}%) </Text>
      <View style={styles.buttonContainer}>
        {CHOICES.map((choice) => {
          return (
            <GameBtn
              key={choice.name}
              name={choice.name}
              onPress={_onPress}
            />
          );
        })}
      </View>
      <TouchableOpacity 
        style={styles.buttonStyle}
        onPress={() => {
          setGamePrompt("Fight!");
          setUserChoice({});
          setComputerChoice({});
          setComputerResult(0);
          setPlayerResult(0);
        }}>
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const CHOICES = [
  {
    name: 'rock',
    uri: 'http://pngimg.com/uploads/stone/stone_PNG13622.png'
  },
  {
    name: 'paper',
    uri: 'https://www.stickpng.com/assets/images/5887c26cbc2fc2ef3a186046.png'
  },
  {
    name: 'scissors',
    uri:
      'http://pluspng.com/img-png/png-hairdressing-scissors-beauty-salon-scissors-clipart-4704.png'
  }
]

export default RPSGame;