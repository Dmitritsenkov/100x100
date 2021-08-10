import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Rating, AirbnbRating } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

function Level(props) {

    const [isCompleted, setIsCompleted] = useState(false)
    const [stars, setStars] = useState(0)
    const [countOfQuestions, setCountOfQuestions] = useState(10)
    const [questions, setQuestions] = useState([]) // Shoud generate automatically on each level 

    // useEffect(()=>{
    //     let item = await AsyncStorage.getItem('lifeCount')
    // },[])

    const startLevel = async () => {
      let item = await AsyncStorage.getItem('lifeCount')
      if(!props.lvlData.isOpened){
        return false;
      }
      else{
        props.navigation.navigate('PlayScreen', {lvl: props.lvlData.lvl})
      }
    }



  return (
        <View>
          <TouchableOpacity onPress={()=>{startLevel()}}>
          <View style={[(props.lvlData.isOpened) ? styles.lvlBoxContainer : styles.lvlBoxContainerDisabled]}>
          <Text style={{color: 'white', fontSize: 25}}>{props.lvlData.lvl}</Text>
            <View style={{position: 'absolute', top: 20}}>
            <AirbnbRating
              isDisabled={true}
              count={3}
              reviews={[""]}
              defaultRating={props.lvlData.lvlRaiting}
              size={17}
            />
            </View>
          </View>
          </TouchableOpacity>
        </View>
  );
}

const styles = StyleSheet.create({
  lvlBoxContainer: {
    width: 60, 
    height: 60, 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: '#C9E481', 
    borderColor: '#9C992D'
  },
  lvlBoxContainerDisabled: {
    width: 60, 
    height: 60, 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: '#AAB5BB', 
    borderColor: '#9C992D'
  }
});


export default Level;

