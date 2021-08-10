import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Vibration } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

function TableSquare(props) {


  const markHandler = async () =>{
    Vibration.vibrate(60)
    let item = await AsyncStorage.getItem('squares');
    let result = JSON.parse(item)

    let markedSquareIndex = result.findIndex((obj)=>{
      return obj.squareNumber==props.squareNumber
    })

    let newSquares = [...result]
    newSquares[markedSquareIndex].isMarked = !newSquares[markedSquareIndex].isMarked

      await AsyncStorage.setItem('squares', JSON.stringify(newSquares));
      props.setSquares(newSquares)
    }

  const openTable = () => {
    props.navigation.navigate('SpesificTableScreen', {number: props.squareNumber, isChecked: props.isMarked, setIsChecked: markHandler})
  }

  return (
      <View>
        <TouchableOpacity onPress={()=>{openTable()}} onLongPress={()=>{markHandler()}}>
        <View style={[(props.isMarked) ? styles.squareMarked : styles.squareNotMarked]}>
          <Text style={{fontSize: 25}}>{props.squareNumber}x</Text>
        </View>
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  squareMarked: {
    width: 65, 
    height: 65,
    borderWidth: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: '#C9E481',
    borderColor: '#9C992D'
  },
  squareNotMarked: {
    width: 65, 
    height: 65,
    borderWidth: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderColor: '#9C992D'

  }

});


export default TableSquare;

