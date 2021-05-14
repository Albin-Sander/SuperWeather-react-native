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
  Image,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {Header} from 'react-native-elements';

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [weatherTemp, setWeatherTemp] = useState('');
  const [weatherDescription, setWeatherDescription] = useState('');
  const [weatherIcon, setWeatherIcon] = useState('');
  const [cityName, setCityName] = useState('');
  const [tempMin, setTempMin] = useState('');
  const [tempMax, setTempMax] = useState('');
  const [feelsLike, setFeelsLike] = useState('')

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  function weatherBalloon() {
    let key = '4d6c538a32c71a436dbcaeba2665e833';
    let cityID = '2711537';
    fetch(
      'https://api.openweathermap.org/data/2.5/weather?id=' +
        cityID +
        '&appid=' +
        key +
        '&units=metric',
    )
      .then(function (resp) {
        return resp.json();
      }) // Convert data to json
      .then(function (data) {
        console.log(data.main.feels_like);
        setWeatherTemp(data.main.temp);
        setWeatherDescription(data.weather[0].description);
        setWeatherIcon(data.weather[0].icon);
        setCityName(data.name);
        setTempMin(data.main.temp_min);
        setTempMax(data.main.temp_max);
        setFeelsLike(data.main.feels_like)
      })
      .catch(function () {
        // catch any errors
      });
  }

  useEffect(() => {
    weatherBalloon();
  });

  return (
    <View
      style={{
        flex: 1,

        alignItems: 'center',
        backgroundColor: 'black',
      }}>
      <Header centerComponent={{text: cityName, style: {color: '#fff', fontSize: 25}}} 
        containerStyle={{
          backgroundColor: 'black',
          padding: 10
          
        }}/>

      <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 120}}>
      
      <View style={{flexDirection: 'row',}}>
      <Text style={{color: 'white', fontSize: 30, fontWeight: 'bold', marginRight: 5}}>{Math.floor(weatherTemp)} °C</Text>
      <Image
        style={{width: 50, height: 50}}
        source={{
          uri: 'http://openweathermap.org/img/w/' + weatherIcon + '.png',
        }}
      />

</View>

      <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold'}}>{weatherDescription}</Text>

      
      <View style={{marginTop: 100}}>
        <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Feels like {Math.floor(feelsLike)} °C</Text>
      <View style={{flexDirection: 'row', }}>
        <Text style={{color: 'white', marginRight: 10, fontSize: 15}}>
          Min: {Math.floor(tempMin)} °C
        </Text>
        <Text style={{color: 'white', fontSize: 15}}>
          Max: {Math.floor(tempMax)} °C
        </Text>
      </View>
      </View>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default App;
