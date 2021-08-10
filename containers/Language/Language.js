import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { dictionaryList } from '../../languages/index'

export const MyText = (props) => {
	let [currentLang, setCurrentLang] = useState('eng')
	const getcurrentLang = async () => {
		currentLang =  await AsyncStorage.getItem('lang')
		setCurrentLang(currentLang)
	}

	useEffect(()=>{
		getcurrentLang()
	}, [props])



  if (!dictionaryList[currentLang]) {
    return dictionaryList['rus'][props.tid]
  }
  return dictionaryList[currentLang][props.tid]
}
