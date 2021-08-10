import React, {useEffect, useContext, useState} from 'react';
import {StyleSheet, Text, View, BackHandler, Alert, TouchableOpacity  } from 'react-native';
import PlayScreen from './PlayScreen';
import LevelesDataContext from '../containers/LevelesDataContext/LevelesDataContext';
import LifeContext from '../containers/LifeContext/LifeContext';

import { MyText } from '../containers/Language/Language'
import LanguageSelector from '../components/LanguageSelector'
// UI LIBRARY
import { Button } from 'react-native-elements';
import Heart from '../components/Heart';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AdMobBanner, setTestDeviceIDAsync } from "expo-ads-admob"

function HomeScreen(props) {

  const {levelesDataValue, setLevelesDataValue, removeItemValue} = useContext(LevelesDataContext);
  const [lang, setLang] = useState()
  // const [life, setLife] = useState()

  const [seconds, setSeconds] = useState()
  const [minutes, setMinutes] = useState()

  const [stateTimer, setStateTimer] = useState()

  useEffect(()=>{
    setDefaultAdCounter()
  },[])

  const setDefaultAdCounter = async () => {
    let result = await AsyncStorage.getItem('adCounter');
    console.log('adCounter:' + result)
    if(result===null){
      let newResult = 2
      newResult = newResult.toString()
      await AsyncStorage.setItem('adCounter', newResult);
    }
  }


  const languageHandler = (newLang) => {
    let result = newLang;
    setLang(newLang)
  }


     const handleBackButton = () => {
        backAction()
        return true;
    }

    useEffect(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    }, [])

    useEffect(() => {
        return () => {
          BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
        }
    }, [])

    const backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want to quit the game?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => BackHandler.exitApp() }
    ]);
    return true;
  };

    const resetAchievements = () => {
      if(lang=="eng"){
        Alert.alert("Reset your achievements?", "You will not be able to restore your achievements", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          { text: "YES", onPress: () => removeItemValue('levelesData') }
        ]);
      }
      if(lang=="rus"){
        Alert.alert("Обнулить достижения?", "Вы не сможете восстановить ваши достижения", [
          {
            text: "Отмена",
            onPress: () => null,
            style: "cancel"
          },
          { text: "Да", onPress: () => removeItemValue('levelesData') }
        ]);
      }
    }

  return (
    <View style={{
        flex: 1,
        padding: 40,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
<View style={{
  position: 'absolute',
  top: 50,
  left: 0,
  right: 0,
}}>      
<AdMobBanner
  bannerSize="fullBanner"
  adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
  servePersonalizedAds // true or false
 />
</View>

      <LanguageSelector setLang={languageHandler}/>
      <View style={{alignItems: 'center', marginBottom: 20}}>
        <View><Text style={{fontSize: 35, color: '#2089DC'}}>100x100</Text></View>
        <View><Text style={{fontSize: 15, color: '#2089DC'}}><MyText tid="learnHowToMultiply"/></Text></View>
      </View>
      <View style={{
        width: 200,
      }}>
      <View         
        style={{
          marginBottom: 20
        }}>
      <Button
        onPress={() =>
          props.navigation.navigate('LevelSelectionScreen')
        }       
        title={<MyText tid="play"/>}
      /> 
      </View>
      <View         
        style={{
          marginBottom: 20
        }}>
      <Button
        onPress={() =>
          props.navigation.navigate('TrainingScreen', {lang: lang})
        }       
        title={<MyText tid="training"/>}
      /> 
      </View>

      <View>
      <Button
        onPress={() =>
          props.navigation.navigate('LearnTableScreen', {lang: lang})
        }       
        title={<MyText tid="learnTables"/>}
      /> 
      </View>
      
      </View> 

      <View style={{position: 'absolute', bottom: 70}}>

        <View style={{marginBottom: 25}}>

        <TouchableOpacity style={styles.buyPremiumBtn}>
        <Text style={styles.noAdsText}><MyText tid="noads"/></Text>
        </TouchableOpacity>
      </View>
      </View>

      <View style={styles.resetAchievementsView}>   
      <TouchableOpacity
        onPress={() =>
          resetAchievements()
        }>    
        <Text style={styles.resetAchievementsText}><MyText tid="resetAchievements"/></Text>
      </TouchableOpacity>
      </View> 
    </View>
  );
}

const styles = StyleSheet.create({
  resetAchievementsView: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  resetAchievementsText: {
    color: '#2089DC'
  },


// Livies
  watchVideoBtn: {
    display: 'flex',
    backgroundColor: '#FBD74A',
    flexDirection: 'row',
    width: 310,
    height: 40,
    borderRadius: 50,
  },
  watchVideoBtnHeart: {
    position: 'absolute',
    top: 7,
    left: 9
  },
  watchVideoBtnText:{
    zIndex: 2,
    top: 9,
    left: 20,
    fontSize: 16,
    color: '#FFF',
  },
  noAdsText:{
    alignSelf: 'center',
    fontSize: 16,
    color: '#4640A2',
  },
  limitlessSign:{
    zIndex: 2,
    color: '#FFF',
    top: 12,
    left: 23,
    position: 'absolute'
  },
  limitlessSign2:{
    zIndex: 2,
    color: '#FFF',
    top: 12,
    right: 23,
    position: 'absolute'
  },
  getFreeText: {
    position: 'absolute',
    color: '#4640A2',
    top: 10,
    left: 50,
    fontSize: 16,
  },
  buyPremiumBtn: {
    backgroundColor: '#FBD74A',
    paddingTop: 9,
    alignSelf: 'center',
    width: 150,
    height: 40,
    borderRadius: 50,
  },
  watchVideoBtnVideoCamera:{
    position: 'absolute',
    right: 0,
    top: 6,
    right: 10
  },
  displayNone: {
    display: 'none'
  }

});


export default HomeScreen;

