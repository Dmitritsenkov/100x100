import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TextInput, BackHandler, SafeAreaView, ScrollView, } from 'react-native';
import { MyText } from '../containers/Language/Language'
import { AdMobBanner, setTestDeviceIDAsync } from "expo-ads-admob"
import TableSquare from '../components/TableSquare'
import AsyncStorage from '@react-native-community/async-storage';
import Constants from 'expo-constants';

function LearnTableScreen({navigation, route}) {

	const [squares , setSquares] = useState(null)

	const getSquares = async () => {
		let item = await AsyncStorage.getItem('squares');
		let result = JSON.parse(item)

		if(result==null){
			let squares = [];
			for(let i = 1; i<=100; i++){
				let initialSquareInfo = {
					squareNumber: i,
					isMarked: false,
				}
				squares.push(initialSquareInfo)
			}
			await AsyncStorage.setItem('squares', JSON.stringify(squares));
			setSquares(squares)
		}
		else{
			setSquares(result)
		}
	}

	useEffect(()=>{
		getSquares()
	},[])


	let rows = [];
	let row = [];

	if(squares){	
	  let tableSquares = squares.map((el) =>
	   <TableSquare  
	   	setSquares={setSquares} 
	   	squareNumber={el.squareNumber} 
	   	isMarked={el.isMarked}
	   	navigation={navigation}
	   	/>)
	  let i = 1;
	  let j = 0;
	  tableSquares.forEach((oneSquare)=>{
	    row.push(oneSquare)
	    if(i%5===0){
	      rows.push(<View style={{flexDirection: 'row', justifyContent: 'space-around', marginBottom: 50}} key={oneSquare.squareNumber}>{row}</View>)
	      row = []
	      j++;
	    }
	    i++
	  })
	}

  return (
 	<SafeAreaView style={styles.SafeAreaViewContainer}>
	    <View style={styles.container}>
			<ScrollView style={styles.scrollView}>
	    		<View style={styles.tablesWrapper}>
	    			<View style={styles.infoMessage}><Text style={styles.infoMessageText}><MyText tid="holdSquare"/></Text></View>
	    			{rows}
	    		</View>
			</ScrollView>
	    </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  infoMessage: {
  	flexDirection: 'column',
  	alignSelf: 'center',
  	bottom: 50,
  },
  infoMessageText: {
  	fontWeight: 'bold'
  },
  tablesWrapper:{
  	marginTop: 100,
  },
  SafeAreaViewContainer: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },

});


export default LearnTableScreen;

