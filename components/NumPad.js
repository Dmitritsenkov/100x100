import React from 'react';
import { Text, View, Button, TouchableOpacity } from 'react-native';
import { MyText } from '../containers/Language/Language'

function NumPad(props) {



  return (
      <View style={{

      	flex: 1,
      }}>
      <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', flex: 1}}>
	      <TouchableOpacity onPress={()=>props.whichButtonPressed('1')} style={{width: '23%', height: '75%', borderRadius: 3, alignItems: 'center', justifyContent: 'center', backgroundColor: '#C8C9CE'}}><View><Text style={{color: 'black', fontSize: 25, fontWeight: 'bold'}}>1</Text></View></TouchableOpacity>
	      <TouchableOpacity onPress={()=>props.whichButtonPressed('2')} style={{width: '23%', height: '75%', borderRadius: 3, alignItems: 'center', justifyContent: 'center', backgroundColor: '#C8C9CE'}}><View><Text style={{color: 'black', fontSize: 25, fontWeight: 'bold', }}>2</Text></View></TouchableOpacity>
	      <TouchableOpacity onPress={()=>props.whichButtonPressed('3')} style={{width: '23%', height: '75%', borderRadius: 3, alignItems: 'center', justifyContent: 'center', backgroundColor: '#C8C9CE'}}><View><Text style={{color: 'black', fontSize: 25, fontWeight: 'bold'}}>3</Text></View></TouchableOpacity>
	      <TouchableOpacity onPress={()=>props.whichButtonPressed('remove')} style={{width: '23%', height: '75%', borderRadius: 3, alignItems: 'center', justifyContent: 'center', backgroundColor: '#4C4C4C'}}><View><Text style={{color: 'white'}}><MyText tid="delete"/></Text></View></TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', flex: 1}}>
        <TouchableOpacity onPress={()=>props.whichButtonPressed('4')} style={{width: '23%', height: '75%', borderRadius: 3, alignItems: 'center', justifyContent: 'center', backgroundColor: '#C8C9CE'}}><View><Text style={{color: 'black', fontSize: 25, fontWeight: 'bold'}}>4</Text></View></TouchableOpacity>
        <TouchableOpacity onPress={()=>props.whichButtonPressed('5')} style={{width: '23%', height: '75%', borderRadius: 3, alignItems: 'center', justifyContent: 'center', backgroundColor: '#C8C9CE'}}><View><Text style={{color: 'black', fontSize: 25, fontWeight: 'bold'}}>5</Text></View></TouchableOpacity>
        <TouchableOpacity onPress={()=>props.whichButtonPressed('6')} style={{width: '23%', height: '75%', borderRadius: 3, alignItems: 'center', justifyContent: 'center', backgroundColor: '#C8C9CE'}}><View><Text style={{color: 'black', fontSize: 25, fontWeight: 'bold'}}>6</Text></View></TouchableOpacity>
        <TouchableOpacity onPress={()=>props.whichButtonPressed('clear')} style={{width: '23%', height: '75%', borderRadius: 3, alignItems: 'center', justifyContent: 'center', backgroundColor: '#4C4C4C'}}><View><Text style={{color: 'white'}}><MyText tid="clear"/></Text></View></TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', flex: 1}}>
        <TouchableOpacity onPress={()=>props.whichButtonPressed('7')} style={{width: '23%', height: '75%', borderRadius: 3, alignItems: 'center', justifyContent: 'center', backgroundColor: '#C8C9CE'}}><View><Text style={{color: 'black', fontSize: 25, fontWeight: 'bold'}}>7</Text></View></TouchableOpacity>
        <TouchableOpacity onPress={()=>props.whichButtonPressed('8')} style={{width: '23%', height: '75%', borderRadius: 3, alignItems: 'center', justifyContent: 'center', backgroundColor: '#C8C9CE'}}><View><Text style={{color: 'black', fontSize: 25, fontWeight: 'bold'}}>8</Text></View></TouchableOpacity>
        <TouchableOpacity onPress={()=>props.whichButtonPressed('9')} style={{width: '23%', height: '75%', borderRadius: 3, alignItems: 'center', justifyContent: 'center', backgroundColor: '#C8C9CE'}}><View><Text style={{color: 'black', fontSize: 25, fontWeight: 'bold'}}>9</Text></View></TouchableOpacity>
        <TouchableOpacity onPress={()=>props.whichButtonPressed('')} style={{visibility: 'hidden', width: '23%', height: '75%', borderRadius: 3, alignItems: 'center', justifyContent: 'center'}}><View><Text style={{color: 'white'}}>:)</Text></View></TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', flex: 1}}>
	      <TouchableOpacity onPress={()=>props.whichButtonPressed('0')} style={{width: '46%', height: '75%', borderRadius: 3, alignItems: 'center', justifyContent: 'center', backgroundColor: '#C8C9CE'}}><View><Text style={{color: 'black', fontSize: 25, fontWeight: 'bold'}}>0</Text></View></TouchableOpacity>
	      <TouchableOpacity onPress={()=>props.whichButtonPressed('answer')} style={{width: '46%', height: '75%', borderRadius: 3, alignItems: 'center', justifyContent: 'center', backgroundColor: '#2089DC'}}><View><Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', fontFamily: 'sans-serif'}}><MyText tid="answer"/></Text></View></TouchableOpacity>
      </View>
      </View>
  );
}

export default NumPad;

