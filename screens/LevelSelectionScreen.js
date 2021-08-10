import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, BackHandler, Modal } from 'react-native';
import { Rating, AirbnbRating } from 'react-native-elements';
import LevelesDataContext from '../containers/LevelesDataContext/LevelesDataContext';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import { AdMobRewarded, setTestDeviceIDAsync } from "expo-ads-admob"

import Level from '../components/Level';

function LevelSectionScreen({navigation, route}) {

  const {levelesDataValue, setLevelesDataValue} = useContext(LevelesDataContext);
  const [countOfLevels, setCountOfLevels] = useState(100)

  let rows = [];
  let row = [];
  let leveles = levelesDataValue.map((lvl)=><Level lvlData={lvl} navigation={navigation}/>)
  let i = 1;
  let j = 0;
  leveles.forEach((lvl)=>{
    row.push(lvl)
    if(i%4===0){
      rows.push(
        <View style={{flexDirection: 'row', justifyContent: 'space-around', marginBottom: 75}} key={lvl.lvl}>{row}</View>
        )
      row = []
      j++;
    }
    i++
  })

  return (
      <SafeAreaView style={styles.SafeAreaViewContainer}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.lvelesView}>
              {rows}
          </View>  
        </ScrollView>
        <TouchableOpacity></TouchableOpacity>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  blackScreenShown:{
   justifyContent: 'center',
    alignContent: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 2,
    backgroundColor: 'rgba(0, 0, 0, .6)',
  },
  newLifeInText:{
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 20,  
    color: '#2b2b2b',
  },
  newLifeInView:{
    position: 'absolute',
    bottom: 10,
    right: 5,
  },
  SafeAreaViewContainer: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  scrollView: {
    backgroundColor: '#FFF',
    marginTop: 10,
    paddingTop: 15
  },
  lvelesView: {
  },
  levelSelectionView: {
    alignItems: 'center', 
  },
  levelSelectionText:{
    alignSelf: 'center' 
  },
  getLivesTitle:{
    color: '#2b2b2b',
    marginBottom: 35,
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center' ,

  },


  noAdsText:{
    alignSelf: 'center',
    fontSize: 16,
    color: '#4640A2',
  },
  
  getFreeText: {
    position: 'absolute',
    color: '#4640A2',
    top: 10,
    left: 50,
    fontSize: 16,
  },
  buyPremiumBtn: {
    flexDirection: 'row',
    backgroundColor: '#FBD74A',
    alignSelf: 'center',
    width: 160,
    height: 50,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 50,
  },
  buyPremiumBtn2: {
    flexDirection: 'row',
    backgroundColor: '#FBD74A',
    alignSelf: 'center',
    width: 160,
    height: 50,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 50,
    marginBottom: 50
  },
  displayNone: {
    display: 'none'
  }
});



export default LevelSectionScreen;

