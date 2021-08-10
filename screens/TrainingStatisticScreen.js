import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, BackHandler } from 'react-native';
import { Rating, AirbnbRating } from 'react-native-elements';
import { Button } from 'react-native-elements';
import LevelesDataContext from '../containers/LevelesDataContext/LevelesDataContext';
import { MyText } from '../containers/Language/Language'
import AsyncStorage from '@react-native-community/async-storage';

import { AdMobInterstitial, AdMobBanner, setTestDeviceIDAsync } from "expo-ads-admob"




function TrainingStatisticScreen({ route, navigation }) {

    const { mistakes, tasksAndAnswersArray } = route.params;

    const [stars, setStars] = useState();



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

    const playAgain = () => {
      navigation.navigate('TrainingScreen')
    }

    const showMyAnswers = () => {
      navigation.navigate('MyAnswersScreen', 
        {
          tasksAndAnswersArray: tasksAndAnswersArray,
          previousScreenName: "trainingStatisticScreen"
        })
    }

    let loseOrWonMessage;
    let againView;

    if(mistakes>3){
      loseOrWonMessage = 
        <View style={{alignItems: 'center'}}>
          <Text style={{color: 'red', fontSize: 25}}><MyText tid="wowYouCanBetter"/></Text>
        </View>

       againView = <Button onPress={()=>playAgain()} title={<MyText tid="playAgain"/>}><Text></Text></Button> 
    }

    if(mistakes<4){
      loseOrWonMessage = 
        <View style={{alignItems: 'center'}}>
          <Text style={{color: 'green', fontSize: 25}}>Nice!</Text>
        </View>  

        againView = <Button onPress={()=>playAgain()} title='Play Again'><Text></Text></Button> 
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
          {againView}
        </View>
        <View style={{width: 200, alignSelf: 'center', marginTop: 15,}}>
          <Button onPress={()=>navigation.navigate('Home')} type="outline" title={<MyText tid="mainMenu"/>}><Text></Text></Button>
        </View>
        <TouchableOpacity style={styles.buyPremiumBtn}>
        <Text style={styles.noAdsText}><MyText tid="noads"/></Text>
        </TouchableOpacity>
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
  noAdsText:{
    alignSelf: 'center',
    fontSize: 16,
    color: '#4640A2',
  },
});


export default TrainingStatisticScreen;

