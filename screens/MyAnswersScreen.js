import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TextInput, BackHandler } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { MyText } from '../containers/Language/Language'
import { AdMobBanner, setTestDeviceIDAsync } from "expo-ads-admob"

// UI LIBRARY
import { Button } from 'react-native-elements';

function MyAnswersScreen({navigation, route}) {

	const {previousScreenName} = route.params;

	 const handleBackButton = () => {
	 	if(previousScreenName=="trainingStatisticScreen"){
	 		navigation.navigate("TrainingStatisticScreen")
	 	}
	 	else{
	 		navigation.navigate("StatisticScreen")	
	 	}
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

	const { tasksAndAnswersArray } = route.params;

	let taskText = <Text style={{textAlign: 'center'}}><MyText tid="task"/></Text>
	let yourAnsText = <Text style={{textAlign: 'center'}}><MyText tid="yourAnswer"/></Text>
	let correctAnsText = <Text style={{textAlign: 'center'}}><MyText tid="correctAnswer"/></Text>
	let resultText = <Text style={{textAlign: 'center'}}><MyText tid="myResult"/></Text>

	let HeadTable = [taskText, yourAnsText, correctAnsText, resultText]
    let DataTable = tasksAndAnswersArray
	
	let table = (
		<Table borderStyle={{ alignItems: 'center'}}>
          <Row style={styles.row} textStyle={styles.text} data={HeadTable}/>
          <Rows style={styles.row} textStyle={styles.text}  data={DataTable}/>
        </Table> 
        )



  return (
    <View style={styles.container}>
	    <View style={{alignItems: 'center'}}>
	        <Text style={{fontSize: 25, marginTop: 30}}><MyText tid="myAnswers"/></Text>
	    </View>  
	    <View style={styles.answersTable}>
	    	{table}
	    </View>
	    <View></View>

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
	answersTable:{
		flexDirection: 'column',
		width: '100%',
	},
	row: { height: 40, backgroundColor: '#E7E6E1' },
	text: { textAlign: 'center' }

});


export default MyAnswersScreen;

