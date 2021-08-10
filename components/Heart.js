import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';

function Heart(props) {

  const [life, setLife] = useState(null)

  const getLife = async () => {
    if(props.life){
      if(life!==props.life){
        setLife(props.life)
      }
    }
  }
  
  useEffect(()=>{
    getLife()
  },[props])


  let top = 70;
  let right = 40;
  if(props.top){
    top = props.top
  }
  if(props.right){
    right = props.right
  }

  return (
      <View style={{flexDirection:'row', position: 'absolute', right, top}}>
        <Icon name="heart" size={30} color="#E53631" />
        <Text style={{fontWeight: 'bold', marginRight: 2, marginTop: 2, fontSize: 18}}> x {life}</Text>
      </View>
  );
}


export default Heart;

