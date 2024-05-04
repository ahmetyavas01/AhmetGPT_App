import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet, ScrollView, StatusBar, SafeAreaView, ActivityIndicator, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Ionicons } from '@expo/vector-icons';
import { Clipboard } from 'expo';
import Header from './components/Header';
import Loading from './components/Loading'

const API_KEY = 'api_key';
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

  const handleGenerateText = () => {
    generateText(prompt);
  };

  const copyToClipboard = () => {
    Clipboard.setString(response);
    Alert.alert('Copied', 'Response copied to clipboard!');
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.scrollView}>
        {loading ? (
          <Loading />
        ) : response !== '' ? (
          <>
            <Text style={styles.question}>You</Text>
            <Text style={styles.questionText}>{prompt}</Text>
            <Text style={styles.result}>AhmetGPT</Text>
            <Text style={styles.resultText}>{response}</Text>
          </>
        ) : null}

      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : 'height'}
        style={styles.inputContainer}
      >
        <TextInput
          style={styles.TextInput}
          placeholder="Write your message."
          onChangeText={(text) => setPrompt(text)}
          value={prompt}
          placeholderTextColor={'gray'}
          autoCorrect={false}
        />
        <View style={{
          marginTop: 18,
          marginLeft: 12
        }}>
          <TouchableOpacity onPress={handleGenerateText}>
            <Ionicons name="send" size={30} color="gray" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <StatusBar style='light' />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(17, 22, 27)',
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
    fontSize: 18,
    color: 'white',
    marginHorizontal: 35,
    margin: 5
  },
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginHorizontal: 35,
    marginTop: 20
  },
  questionText: {
    fontSize: 18,
    color: 'white',
    marginHorizontal: 35,
    marginTop: 5,
    marginBottom: 20
  },
  activityIndicatorContainer: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    bottom: 45,
  },
  result: {
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
    marginHorizontal: 35,
    marginBottom: 5,
    fontWeight: 'bold'
  },
  scrollView: {
    marginBottom: 50,
  },
});

export default App;
