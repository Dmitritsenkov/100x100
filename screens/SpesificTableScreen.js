import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, CheckBox } from 'react-native';
import { Button } from 'react-native-elements';

import AsyncStorage from '@react-native-community/async-storage';
import { MyText } from '../containers/Language/Language'

function SpesificTableScreen({navigation, route}) {

	const {number, isChecked, setIsChecked} = route.params;

	const [toggleCheckBox, setToggleCheckBox] = useState(isChecked)


	const isMarkedHandler = (newValue) => {
		setToggleCheckBox(newValue)
 		setIsChecked()
 	}

 let sums = []

 for(let i = 1; i<=10; i++){
 	let ans = number*i
 	sums.push(<Text style={{marginBottom: 10, fontSize: 20}}>{number} x {i} = {ans}</Text>)
 }


  return (
      <View style={styles.container}>
      	<View>
      	<Text style={{alignSelf: 'center', fontSize: 25, fontWeight: 'bold', marginTop: 15}}><MyText tid="learnTable"/></Text>
      	<Text style={{alignSelf: 'center', fontSize: 25, color: 'purple'}}>x{number}</Text>
      	</View>
        <View style={toggleCheckBox ? styles.tableContainerGreen : styles.tableContainerWhite}>
        	{sums}
        	<View style={{flexDirection: 'row', marginTop: 15}}>
			<CheckBox
          		value={toggleCheckBox}
    			onValueChange={(newValue) => isMarkedHandler(newValue)}
          		style={styles.checkbox}
        	/>
        	<Text style={{alignSelf: 'center'}}><MyText tid="learned"/></Text>
        	</View>
        </View>
        <View>
	     <View         
	        style={{
	          alignSelf: 'center',
	          width: 130,
	          marginBottom: 30
	        }}>
	      <Button
	        onPress={() =>
	        navigation.goBack()
	        }       
	        title={<MyText tid="back"/>}
	      /> 
	      </View>
	     <View         
	        style={{
	          alignSelf: 'center',
	          width: 130
	        }}>
	      <Button
	        onPress={() =>
	          navigation.navigate('Home')
	        }       
	        title={<MyText tid="mainMenu"/>}
	        type="outline"
	      /> 
	      </View>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
	container:{
		flex: 1,
		justifyContent: 'space-around'
	},
	tableContainerGreen: {
		backgroundColor: '#C9E481',
		width: 300,
		paddingTop: 20,
		paddingBottom: 10,
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 25,
	},
	tableContainerWhite: {
		backgroundColor: '#FFF',
		width: 300,
		paddingTop: 20,
		paddingBottom: 10,
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 25,
	},
	checkbox:{

	}

});


export default SpesificTableScreen;

