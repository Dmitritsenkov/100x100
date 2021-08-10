import React from 'react'
import {Text, View, TouchableOpacity  } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { languageOptions } from '../languages/index.js'
import { Flag } from 'react-native-svg-flagkit'

const LanguageSelector = (props) => {
  
  const handleLanguageChange = async (lang) => {

    if(lang=='eng'){
      await AsyncStorage.setItem('lang', 'eng');
      props.setLang('eng')
    }
    if(lang=='rus'){
      await AsyncStorage.setItem('lang', 'rus');
      props.setLang('rus')
    }
  }

  return (
    <View style={{flexDirection: 'row', position: 'absolute', top: 180, alignSelf: 'center'}}>
    <TouchableOpacity style={{marginRight: 20}} onPress={()=>handleLanguageChange('eng')}>
      <Flag
        id={'GB'}
        width={55}
        height={55}
      />
      <Text style={{alignSelf: 'center'}}>English</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>handleLanguageChange('rus')}>
      <Flag
        id={'RU'}
        width={55}
        height={55}
      />
      <Text style={{alignSelf: 'center'}}>Русский</Text>
    </TouchableOpacity>
    </View>
  )
}

export default LanguageSelector
