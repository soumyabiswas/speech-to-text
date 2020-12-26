/**
 * React Native Speech To Text
 */

import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View, Image, TouchableHighlight, ScrollView,StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


// import Voice
import Voice from 'react-native-voice';

const App: () => React$Node = () => {
  const [pitch, setPitch] = useState('');
  const [error, setError] = useState('');
  const [end, setEnd] = useState('');
  const [started, setStarted] = useState('');
  const [results, setResults] = useState([]);
  const [partialResults, setPartialResults] = useState([]);

  useEffect(() => {
    //Setting callbacks for the process status
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;

    return () => {
      //destroy the process after switching the screen
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = (e) => {
    //Invoked when .start() is called without error
    console.log('onSpeechStart: ', e);
    setStarted('-');
  };

  const onSpeechEnd = (e) => {
    //Invoked when SpeechRecognizer stops recognition
    console.log('onSpeechEnd: ', e);
    setEnd('-');
  };

  const onSpeechError = (e) => {
    //Invoked when an error occurs.
    console.log('onSpeechError: ', e);
    setError(JSON.stringify(e.error));
  };

  const onSpeechResults = (e) => {
    //Invoked when SpeechRecognizer is finished recognizing
    console.log('onSpeechResults: ', e);
    setResults(e.value);
  };

  const onSpeechPartialResults = (e) => {
    //Invoked when any results are computed
    console.log('onSpeechPartialResults: ', e);
    setPartialResults(e.value);
  };

  const onSpeechVolumeChanged = (e) => {
    //Invoked when pitch that is recognized changed
    console.log('onSpeechVolumeChanged: ', e);
    setPitch(e.value);
  };

  const startRecognizing = async () => {
    //Starts listening for speech for a specific locale
    try {
      await Voice.start('en-US');
      setPitch('');
      setError('');
      setStarted('');
      setResults([]);
      setPartialResults([]);
      setEnd('');
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  const stopRecognizing = async () => {
    //Stops listening for speech
    try {
      await Voice.stop();
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  const cancelRecognizing = async () => {
    //Cancels the speech recognition
    try {
      await Voice.cancel();
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  const destroyRecognizer = async () => {
    //Destroys the current SpeechRecognizer instance
    try {
      await Voice.destroy();
      setPitch('');
      setError('');
      setStarted('');
      setResults([]);
      setPartialResults([]);
      setEnd('');
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      <StatusBar backgroundColor="#6456C0" barStyle={'light-content'} />

      <View style={styles.container}>
        <Text style={styles.titleText}>
         Convert Text To Speech
        </Text>
        <Text style={styles.textStyle}>Press mike to start Recognition</Text>
        
        <TouchableHighlight onPress={startRecognizing} style={styles.microphone}>
          <Icon size={32} color="white" name="microphone" />
        </TouchableHighlight>

        <View style={styles.headerContainer}>
          <Text style={styles.textWithSpaceStyle}>{`Started: ${started}`}</Text>
          <Text style={styles.textWithSpaceStyle}>{`End: ${end}`}</Text>
        </View>
        
        <Text style={styles.textStyle}>Results</Text>
        <ScrollView style={{marginBottom: 42}}>
          {results &&
              <Text key={`result-0`} style={{...styles.textStyle, ...styles.resultStyle}}>
                {results[0]}
              </Text>
        }
        </ScrollView>
        <View style={styles.horizontalView}>
          <TouchableHighlight
            onPress={stopRecognizing}
            style={{...styles.buttonStyle,...styles.primaryButton}}>
            <Text style={styles.buttonTextStyle}>
              Stop&nbsp;
              <Icon size={16} color="white" name="stop" />
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={cancelRecognizing}
            style={{...styles.buttonStyle}}>
            <Text style={styles.buttonTextStyle}>
              Cancel&nbsp;
              <Icon size={16} color="white" name="times" />
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={destroyRecognizer}
            style={{...styles.buttonStyle, ...styles.primaryButton}}>
            <Text style={styles.buttonTextStyle}>
              Delete&nbsp;
              <Icon size={16} color="white" name="trash" />
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#EBECF0',
    marginTop: 5
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  titleText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  microphone:{
    backgroundColor:'#6456C0',
    width: 100,
    height: 100,
    borderRadius: 50,
    display: 'flex',
    justifyContent:'center',
    alignItems:'center',
  },
  buttonStyle: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 15,
    padding: 10,
    backgroundColor: '#73AAF8',
    marginRight: 2,
    marginLeft: 2,
  },
  primaryButton: {
    backgroundColor: '#6456C0'
  },
  buttonTextStyle: {
    color: '#fff',
    textAlign: 'center',
  },
  horizontalView: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
  },
  textStyle: {
    textAlign: 'center',
    padding: 12,
    fontWeight: '700'
  },
  resultStyle: {
    fontSize: 24,
  },
  imageButton: {
    width: 50,
    height: 50,
  },
  textWithSpaceStyle: {
    flex: 1,
    textAlign: 'center',
    color: '#B0171F',
  },
});

export default App;
