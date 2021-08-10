import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';

import { Text, View, Button, BackHandler } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import PlayScreen from './screens/PlayScreen';
import LevelSelectionScreen from './screens/LevelSelectionScreen';
import StatisticScreen from './screens/StatisticScreen';
import MyAnswersScreen from './screens/MyAnswersScreen';
import TrainingScreen from './screens/TrainingScreen'
import TrainingStatisticScreen from './screens/TrainingStatisticScreen'
import SpesificTableScreen from './screens/SpesificTableScreen'
import LearnTableScreen from './screens/LearnTableScreen'
import AsyncStorage from '@react-native-community/async-storage';
import initialLevelesData from './LevelsData/InitialLevelesData'
import LevelesDataContext from './containers/LevelesDataContext/LevelesDataContext'
import LifeContext from './containers/LifeContext/LifeContext'

import {
  AdMobRewarded,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';

const Stack = createStackNavigator();

function App() {

  Date.prototype.addHours = function(h) {
    this.setTime(this.getTime() + (h*60*60*1000));
    return this;
  }

  const [levelesDataValue, setLevelesDataValue] = useState(null);
  const [lang, setLang] = useState('eng')
  const [life, setLife] = useState(null)


  const setLevelesData = async (lvlsData) => {
      await AsyncStorage.setItem('levelesData', JSON.stringify(lvlsData));
  }

  const setLifeHandler = async () => {
    let item = await AsyncStorage.getItem('lifeCount')
      if(item !== null){
        setLife(item)
      }
      else{
        await AsyncStorage.setItem('lifeCount', '3');
        setLife(3)
      }
  }

  const getLevelesData = async () => {
      let item = await AsyncStorage.getItem('levelesData')
      let result = JSON.parse(item);

      if(result !== null){
        setLevelesDataValue(result)
      }
      else{
        setLevelesData(initialLevelesData)
        setLevelesDataValue(initialLevelesData)
      }
  }

  const removeItemValue = async (key) => {
          await AsyncStorage.removeItem(key);
          setLevelesDataValue(initialLevelesData)
          return true;
  }


const handleBackButton = () =>{
          return true;
        }

  const getLang = async ()=>{
    let currentLang =  await AsyncStorage.getItem('lang')
    if(currentLang){
      setLang(currentLang)
    }
  }


const setAsTestDEVICE = async () => {
  await setTestDeviceIDAsync('EMULATOR');
}

const setInitialAddCounter = async () => {
  let result = await AsyncStorage.getItem('adCounter');
  console.log(result)
  if(result==null){
    await AsyncStorage.setItem('adCounter', '1');
  }
}

  useEffect(() => {
    // AD
    setInitialAddCounter()
    setAsTestDEVICE()


    getLevelesData()
    // AsyncStorage.removeItem('adCounter')
    // AsyncStorage.removeItem('squares');
    // AsyncStorage.removeItem('lifeCount');
    // AsyncStorage.removeItem('timer');
    // AsyncStorage.removeItem('extraLifeTime')
    setLifeHandler()
    getLang()
    },[]);

  return (

<LevelesDataContext.Provider value={{levelesDataValue, setLevelesDataValue, removeItemValue}}>
<LifeContext.Provider value={{setLife, life}}>
    <NavigationContainer headerMode="none">
    <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home">
          {(props) => <HomeScreen {...props} lang={lang} life={life}/>}
        </Stack.Screen>
        <Stack.Screen name="LevelSelectionScreen" component={LevelSelectionScreen}/>
        <Stack.Screen name="LearnTableScreen" component={LearnTableScreen}/>
        <Stack.Screen name="SpesificTableScreen" component={SpesificTableScreen}/>
        <Stack.Screen name="PlayScreen">
          {(props) => <PlayScreen {...props} lang={lang} />}
        </Stack.Screen>
        <Stack.Screen name="StatisticScreen" component={StatisticScreen}/>
        <Stack.Screen name="MyAnswersScreen" component={MyAnswersScreen}/>
        <Stack.Screen name="TrainingScreen">
          {(props) => <TrainingScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="TrainingStatisticScreen" component={TrainingStatisticScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
</LifeContext.Provider>
</LevelesDataContext.Provider>
  );
}

export default App;