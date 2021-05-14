/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Alert,
  Image
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';




const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [weatherTemp, setWeatherTemp] = useState('')
  const [weatherDescription, setWeatherDescription] = useState('')
  const [weatherIcon, setWeatherIcon] = useState('')
  const [cityName, setCityName] = useState('')
  const [tempMin, setTempMin] = useState('')
  const [tempMax, setTempMax] = useState('')

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  function pressButton() {
    console.log("test")
  }

  function weatherBalloon( ) {
    let key = "4d6c538a32c71a436dbcaeba2665e833"
    let cityID = "2711537"
    fetch('https://api.openweathermap.org/data/2.5/weather?id=' + cityID+ '&appid=' + key + '&units=metric')  
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
      console.log(data.main.temp_min);
      setWeatherTemp(data.main.temp)
      setWeatherDescription(data.weather[0].description)
      setWeatherIcon( data.weather[0].icon)
      setCityName(data.name)
      setTempMin(data.main.temp_min)
      setTempMax(data.main.temp_max)
      
    })
    .catch(function() {
      // catch any errors
    });
  }

  useEffect(() => {
    weatherBalloon()
  });

  return (
    
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(31, 41, 55, var(--tw-bg-opacity))'
      }}>
        
        <Text style={{color: 'white', fontSize: 30, marginBottom: 100,}}>{cityName}</Text>
      <Text style={{ fontSize: 20, color: 'white'}}>{weatherDescription}</Text>
      <Image

        style={{width: 50, height: 50}}
        source={{
          uri: 'http://openweathermap.org/img/w/' + weatherIcon + '.png',
        }}
      />
      
      <Text style={{color: 'white'}}>Current Temperature:</Text>
      <Text style={{color: 'white'}}>{Math.floor(weatherTemp)} °C</Text>

      <View style={{flexDirection: 'row', marginTop: 10}}>
        <Text style={{color: 'white', marginRight: 10}}>Min temp today: {Math.floor(tempMin)} °C</Text>
        <Text style={{color: 'white'}}>Max temp today: {Math.floor(tempMax)} °C</Text>
      </View>
     
    </View>
    
  );
};

const styles = StyleSheet.create({});

export default App;
