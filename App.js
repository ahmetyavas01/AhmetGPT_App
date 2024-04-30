import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet, ScrollView, StatusBar, SafeAreaView, ActivityIndicator, TouchableOpacity ,} from 'react-native';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Ionicons } from '@expo/vector-icons';
import { Clipboard } from 'expo';


const API_KEY = 'API_KEY';
const genAI = new GoogleGenerativeAI(API_KEY);

const App = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const generateText = async (prompt) => {
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(prompt);
      const text = await result.response.text();
      setResponse(text);
    } catch (error) {
      console.error('API request failed:', error);
      Alert.alert('Error', 'Text could not be generated. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  const copyToClipboard = () => {
    Clipboard.setString(response);
    Alert.alert('Copied', 'Response copied to clipboard!');
  };
  
  const handleGenerateText = () => {
    generateText(prompt);
  };

  return (
    <SafeAreaView style={styles.container}>

      <View>
        <Text style={styles.headerText}>Welcome to AhmetGPT 👋</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.TextInput}
          placeholder="Write your message."
          onChangeText={(text) => setPrompt(text)}
          value={prompt}
          placeholderTextColor={'gray'}
          autoCapitalize='none'
        />
        <View style={{
          paddingTop: 17,
          marginLeft: 10
        }}>
          <TouchableOpacity onPress={handleGenerateText}>
            <Ionicons name="send" size={25} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {loading ? (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size={'large'} color={'#121481'} />
        </View>
      ) : response !== '' ? (
        <ScrollView>
          <Text style={styles.questionText}>➡️Message : {prompt}</Text>
          <View style={{flexDirection:'row'}}>
          <Text style={styles.resultText}>⬇️Response⬇️</Text>

          </View>
         
          <Text style={styles.resultText}>{response}</Text>
        </ScrollView>
      ) : null}

      <StatusBar style='light' />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(17, 22, 27)',
  },
  headerText: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 30,
  },
  TextInput: {
    width: '90%',
    height: 50,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 22,
    backgroundColor: 'rgb(51, 59, 76)',
    fontSize: 20,
    color: 'white',
    marginTop: 20,
    alignSelf: 'center'
  },
  resultText: {
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
    marginHorizontal: 35,
    margin:5
  },
  questionText: {
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
    marginHorizontal: 35,
    marginVertical: 20
  },
  activityIndicatorContainer: {
    flex:0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center', 
  },
});

export default App;
