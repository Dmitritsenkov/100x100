import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, BackHandler } from 'react-native';
import { Rating, AirbnbRating } from 'react-native-elements';
import { Button } from 'react-native-elements';
import LevelesDataContext from '../containers/LevelesDataContext/LevelesDataContext';
import Icon from 'react-native-vector-icons/FontAwesome';

import { MyText } from '../containers/Language/Language'
import AsyncStorage from '@react-native-community/async-storage';
import { AdMobInterstitial, AdMobBanner, setTestDeviceIDAsync } from "expo-ads-admob"


function StatisticScreen({ route, navigation }) {

    const {levelesDataValue, setLevelesDataValue} = useContext(LevelesDataContext);

    const { mistakes, currentLvlData, tasksAndAnswersArray } = route.params;

    const [stars, setStars] = useState();

    const handleBackButton = () => {
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

  const showAd = async () => {
    let result = await AsyncStorage.getItem('adCounter');
    let newResult = Number(result) + 1
    newResult = newResult.toString()
    await AsyncStorage.setItem('adCounter', newResult);
    if(newResult%2==0){
      await setTestDeviceIDAsync('EMULATOR');
      await AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712'); // Test ID, Replace with your-admob-unit-id
      await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true});
      await AdMobInterstitial.showAdAsync();
    }
  }

    useEffect(()=>{
      if(mistakes>3){
      showAd()
    }
      switch(mistakes){
        case 0:
        setStars(3)
        break;
        case 1:
        setStars(2)
        break;
        case 2: 
        setStars(2)
        break;
        case 3: 
        setStars(1)
        break;
        default:
        setStars(0)
        break;
      }
    },[])

    const setlvldata = async (newLevelesDataValue) => {
      await AsyncStorage.setItem('levelesData', JSON.stringify(newLevelesDataValue));
    }

    useEffect(()=>{
      if(mistakes<4){
        let newLevelesDataValue = [...levelesDataValue]
        let updatedLevelData = {...currentLvlData}
        updatedLevelData.isCompleted = true
        updatedLevelData.lvlRaiting = stars
        let index = newLevelesDataValue.findIndex((obj)=>obj.lvl==currentLvlData.lvl)
        newLevelesDataValue[index] = updatedLevelData;
        newLevelesDataValue[index+1].isOpened = true
        setLevelesDataValue(newLevelesDataValue)
        setlvldata(newLevelesDataValue)
      }
    },[stars])


    const playAgain = () => {
      navigation.navigate('PlayScreen', {lvl: currentLvlData.lvl})
    }

    const nextLevel = () => {
     navigation.navigate('PlayScreen', {lvl: currentLvlData.lvl + 1}) 
    }

    const showMyAnswers = () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton)
      navigation.navigate('MyAnswersScreen', 
        {
        tasksAndAnswersArray: tasksAndAnswersArray,
        previousScreenName: "statisticScreen"
        }
      )
    }

    let loseOrWonMessage;
    let againOrNextLevel;

    if(mistakes>3){
      loseOrWonMessage = 
        <View style={{alignItems: 'center'}}>
          <Text style={{color: 'red', fontSize: 25}}><MyText tid="wowYouLose"/></Text>
        </View>

       againOrNextLevel = 
       <View>
       <Button onPress={()=>playAgain()} title=<MyText tid="playAgain"/>><Text></Text></Button> 
       <View style={{width: 200, alignSelf: 'center', marginTop: 15,}}>
         <Button onPress={()=>navigation.navigate('Home')} type="outline" title={<MyText tid="mainMenu"/>}><Text></Text></Button>
       </View>
        <View style={{marginTop: 55}}>
        <TouchableOpacity style={styles.buyPremiumBtn}>
        <Text style={styles.noAdsText}><MyText tid="noads"/></Text>
        </TouchableOpacity>
      </View>
       </View>
    }

    if(mistakes<4){
      loseOrWonMessage = 
        <View style={{alignItems: 'center'}}>
          <Text style={{color: 'green', fontSize: 25}}><MyText tid="niceYouWon"/></Text>
        </View>  

        againOrNextLevel = 
        <View>
        <Button onPress={()=>nextLevel()} title={<MyText tid="nextLevel"/>}><Text></Text></Button>
                <View style={{width: 200, alignSelf: 'center', marginTop: 15,}}>
          <Button onPress={()=>navigation.navigate('Home')} type="outline" title={<MyText tid="mainMenu"/>}><Text></Text></Button>
        </View>
        <View>
        <TouchableOpacity style={styles.buyPremiumBtn}>
        <Text style={styles.noAdsText}><MyText tid="noads"/></Text>
        </TouchableOpacity>
        </View>
        </View>
    }

  return (
    <View style={styles.container}>
      <View style={styles.statisticContainer}>
        <View><Text style={styles.statisticText}><MyText tid="result"/> {10-mistakes}/10</Text></View>
        <View><Text style={styles.statisticText}><MyText tid="mistakes"/> {mistakes}</Text></View>
      </View>
      <View>
        <View style={{marginBottom: 20}}>
        <AirbnbRating
          isDisabled={true}
          count={3}
          reviews={[""]}
          defaultRating={stars}
          size={17}
        />
        </View>
      {loseOrWonMessage}
      <View style={{width: 200, marginTop: 30, alignSelf: 'center'}}><Button onPress={()=>showMyAnswers()} type="outline" title={<MyText tid="myAnswers"/>}></Button></View>
      </View>

      <View>
        <View style={{width: 200, alignSelf: 'center', marginTop: 15,}}>
          {againOrNextLevel}
        </View>
      </View>

<View style={{
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
}}>      
<AdMobBanner
  bannerSize="fullBanner"
  adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
  servePersonalizedAds // true or false
 />
</View>

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  statisticContainer: {
    alignItems: 'flex-start',
  },
  statisticText: {
    fontSize: 18,
  },
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
    marginTop: 25,
    marginBottom: 10,
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


export default StatisticScreen;

