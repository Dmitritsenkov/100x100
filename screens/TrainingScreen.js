import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, Text, View, TextInput, BackHandler } from 'react-native';
import NumPad from '../components/NumPad';
import { Button } from 'react-native-elements';
import Slider from '@react-native-community/slider';
import { MyText } from '../containers/Language/Language'
import AsyncStorage from '@react-native-community/async-storage';


function TrainingScreen({navigation, route}) {

  const [isGameStarted, setIsGameStarted] = useState(false)
  const [answerInputValue, setAnswerInputValue] = useState('')
  const [answerColor, setAnswerColor] = useState('black')
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null)

  const [timerId, setTimerId] = useState(undefined)
  const [minRange, setMinRange] = useState(null)
  const [maxRange, setMaxRange] = useState(null)
  //Task
  const [taskNumber, setTaskNumber] = useState(1)
  const [task, setTask] = useState()
  const [correctAnswer, setCorrectAnswer] = useState(0)

  const [mistakeNumber, setMistakeNumber] = useState(0)
  const [correctNumber, setCorrectNumber] = useState(0)

  const [tasksAndAnswersArray, setTasksAndAnswersArray] = useState([])
  const [rangeError, setRangeError] = useState(null)

  useEffect(()=>{
    getLang()
    getRange()
  },[])


  const [lang, setLang] = useState()

  const getLang = async ()=>{
    let currentLang =  await AsyncStorage.getItem('lang')
    if(currentLang){
      setLang(currentLang)
    }
  }

  const getRange = async () => {
      let minValue = await AsyncStorage.getItem('minRange')
      let maxValue = await AsyncStorage.getItem('maxRange')
      if(minValue)
        setMinRange(JSON.parse(minValue))
      else
        setMinRange(JSON.parse(1))

      if(maxValue)
        setMaxRange(JSON.parse(maxValue))
      else
        setMaxRange(JSON.parse(10))

  }


  const startGame = async () => {
    await AsyncStorage.setItem('minRange', JSON.stringify(minRange))
    await AsyncStorage.setItem('maxRange', JSON.stringify(maxRange))

    if(minRange>maxRange){
      setRangeError(true)
      return false;
    }
    else{
    setRangeError(null)  
    setTasksAndAnswersArray([])
    setMistakeNumber(0)
    setCorrectNumber(0)
    setTaskNumber(1)
    setIsGameStarted(true)    
    setTask(createTask())
    }
  }

    const checkAnswer = () => {
        let answerInputValueConverted =  parseInt(answerInputValue, 10);

        if(answerInputValueConverted===correctAnswer){
          let newTaskNumber = taskNumber+1
          setAnswerColor('green')
          setTaskNumber(newTaskNumber)
          setIsAnswerCorrect(true)
          let newCorrectNumber = correctNumber + 1
          setCorrectNumber(newCorrectNumber)
          setTimerId(setTimeout(function(){
            setAnswerInputValue('');
            setAnswerColor('black')
            setIsAnswerCorrect(null)
            nextTask(newTaskNumber, mistakeNumber, true)
            setTimerId(clearTimeout(timerId))
          },800));
        }

      else{
        let newTaskNumber = taskNumber + 1
        setAnswerColor('red')
        setTaskNumber(newTaskNumber)
        setIsAnswerCorrect(false)
        let newMistakeNumber = mistakeNumber + 1
        setMistakeNumber(newMistakeNumber)
        setTimerId(setTimeout(function(){
          setAnswerInputValue('');
          setAnswerColor('black')
          setIsAnswerCorrect(null)
          nextTask(newTaskNumber, newMistakeNumber, false)
          setTimerId(clearTimeout(timerId))
        },800));
      }
  }

  const beforeNextTask = (isCorrect) => {
    let result; 
    if(isCorrect){
      result = <Text style={{color: 'green', alignSelf: 'center'}}><MyText tid="yes"/></Text>
    }
    if(!isCorrect){
      result = <Text style={{color: 'red', alignSelf: 'center'}}><MyText tid="no"/></Text>
    }
    let arr = [task, answerInputValue, correctAnswer, result]
    let currentArr = [...tasksAndAnswersArray] 
    currentArr.push(arr)
    setTasksAndAnswersArray(currentArr)
  }

  const nextTask = (newTaskNumber, mistakes, prevIsCorrect) => {
    if(newTaskNumber<11){
      beforeNextTask(prevIsCorrect)
      setTask(createTask())
    }
    else{
      let result; 
      if(prevIsCorrect){
        result = <Text style={{color: 'green', alignSelf: 'center'}}><MyText tid="yes"/></Text>
      }
      if(!prevIsCorrect){
        result = <Text style={{color: 'red', alignSelf: 'center'}}><MyText tid="no"/></Text>
      }
      let arr = [task, answerInputValue, correctAnswer, result]
      let currentArr = [...tasksAndAnswersArray] 
      currentArr.push(arr)
      let tasksAndAnswersArrayLastVersion = currentArr;

      finishLevel(mistakes, tasksAndAnswersArrayLastVersion)
    }
  }

  const finishLevel = (mistakes, tasksAndAnswersArrayLastVersion) => {
    setIsGameStarted(false)
    navigation.navigate('TrainingStatisticScreen', 
      {mistakes: mistakes, tasksAndAnswersArray: tasksAndAnswersArrayLastVersion, minRange: minRange, maxRange: maxRange} )
  }

  const whichButtonPressed = (btnValue) => {
    if(!isGameStarted){
      return false;
    }
    if(btnValue==='remove'){
      let value = answerInputValue.substring(0, answerInputValue.length - 1);
        setAnswerInputValue(value)  
      
      return true;
    }
    if(btnValue==='clear'){
      let value = '';
      setAnswerInputValue(value)  
      return true;
    }
    if(btnValue==='answer' && !timerId===undefined){
      return false;
    }

    if(btnValue==='answer' && timerId===undefined){
      checkAnswer()
      return true;
    }

    if(btnValue==='answer'){
      return false;
    }
    
    if(answerInputValue.length>4){
      return false
    }

    let value = answerInputValue + btnValue
    setAnswerInputValue(value)
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const createTask = () => {
      let newTask;  
      let firstMult = getRandomInt(minRange, maxRange);
      let secondMult = getRandomInt(minRange, maxRange);
      newTask = firstMult + ' × ' + secondMult;
      let answer = firstMult*secondMult;
      setCorrectAnswer(answer)
      return newTask;
  }

  const setMaxRangeHandler = (value) => {
    setMaxRange(value)
  }

  const setMinRangeHandler = (value) => {
    setMinRange(value)
  }

  let rangeErrorView = <View><Text style={{alignSelf: 'center', marginBottom: 15}}></Text></View>;
  if(rangeError){
    rangeErrorView = <View><Text style={{color: 'red', alignSelf: 'center', marginBottom: 15}}><MyText tid="wrongRangeErr"/></Text></View>
  }

  let gameDisplay =  
     <View style={styles.startGameDisplay}>
     <View style={styles.rangeSliderView}>
     <View>
           {rangeErrorView}
       <Text style={{alignSelf: 'flex-start', fontSize: 18, alignSelf: 'center'}}><MyText tid="minNum"/> {minRange}</Text>
       <Slider
          style={{width: 300, height: 50, alignSelf: 'center'}}
          onValueChange={(value=>setMinRangeHandler(value))}
          value={minRange}
          step={1}
          minimumValue={1}
          maximumValue={100}
          minimumTrackTintColor="#54b2d1"
          maximumTrackTintColor="#000000"
        />
       <Text style={{alignSelf: 'flex-start', fontSize: 18, alignSelf: 'center'}}><MyText tid="maxNum"/> {maxRange}</Text>
       <Slider
          style={{width: 300, height: 50, alignSelf: 'center'}}
          onValueChange={(value=>setMaxRangeHandler(value))}
          value={maxRange}
          step={1}
          minimumValue={1}
          maximumValue={100}
          minimumTrackTintColor="#54b2d1"
          maximumTrackTintColor="#000000"
        />

      </View>
     </View>
     <View style={styles.startBtnView}><Button
        style={styles.startBtn}
        onPress={() =>
         startGame()
        }       
        title={<MyText tid="start"/> }
      /> 
      </View>
      </View>

      const answerColorFunc = (myColor) => {
        return{
          alignSelf: 'center',
          marginTop: 90,
          fontSize: 35,
          color: myColor
        }
      }

  let correctOrWrongMessage = null
  if(isAnswerCorrect){
    correctOrWrongMessage =  
    <View><Text style={{color: 'green', fontWeight: 'bold', fontSize: 25, position: 'absolute', alignSelf: 'center', bottom: 60}}>
    {lang=='eng' ? "Correct!" : "Правильно!"}
    </Text></View>
  }
  if(isAnswerCorrect===false){
    correctOrWrongMessage = 
    <View><Text style={{color: 'red', fontWeight: 'bold', fontSize: 25, position: 'absolute', alignSelf: 'center', bottom: 60}}>
    {lang=='eng' ? "Wrong!" : "Неправильно!"}
    </Text></View>
  }
  


  if(isGameStarted){
  gameDisplay = 
      <View style={styles.gameDisplay}>
        {correctOrWrongMessage}
        <View style={styles.taskView}><Text style={styles.task}>{task}</Text></View>
        <View style={styles.answerView}><Text style={ answerColor==='black' ?  answerColorFunc('black') : answerColor==='red' ? answerColorFunc('red') :  answerColorFunc('green')}>{answerInputValue}</Text></View>
      </View>
  }

  return (
    <View style={{
        marginTop: '10%',
        flex: 3,
      }}>
      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', marginLeft: 30}}>
        <Text style={styles.levelText}><MyText tid="trainingCaps"/></Text>
        <Text style={styles.correctText}><MyText tid="correct"/> {correctNumber}</Text>
        <Text style={styles.mistakesText}><MyText tid="wrong"/> {mistakeNumber}</Text>
        <Text style={styles.answerNumberText}>{taskNumber-1}/10</Text>
      </View>
      {gameDisplay}
      <NumPad whichButtonPressed={whichButtonPressed}/>      
    </View>
  );
}

const styles = StyleSheet.create({
  rangeSliderView:{
    alignSelf: 'center', 
  },
  startGameDisplay: {
    flex: 1,
    transform: [{ translateY: -80 }]
  },
  gameDisplay:{
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  levelText: { 
    alignSelf: 'center',
    fontSize: 18,
    marginTop: 30,
    marginRight: 30,
    marginBottom: 20,
  },
  answerNumberText: {
    color: 'grey',
    fontSize: 16,
  },
  taskView:{
  },
  task: {
    fontSize: 50
  },
  mistakesText: {
    color: 'grey',
    fontSize: 16,
  },
  correctText: {
    color: 'grey',
    fontSize: 16,
  },
  startBtnView:{
    alignSelf: 'center',
    marginTop: 20,
    width: '50%'
  },
  presStartTextView:{
    alignSelf: 'center',
  },
  presStartText:{
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold'
  },
  answerView:{
    width: '50%',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },

});


export default TrainingScreen;

