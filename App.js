import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet, ScrollView, StatusBar, SafeAreaView, Pressable } from 'react-native';
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = 'AIzaSyCJx4kxQ8FGVA20_MhQ3eoPOo6tzcdEiec';
const genAI = new GoogleGenerativeAI(API_KEY);

const App = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const generateText = async (prompt) => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(prompt);
      const text = await result.response.text();

      setResponse(text);
    } catch (error) {
      console.error('API isteği başarısız:', error);
      Alert.alert('Hata', 'Metin oluşturulamadı. Lütfen daha sonra tekrar deneyin.');
    }
  };

  const handleGenerateText = () => {
    generateText(prompt);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.headerText}>Welcome to AhmetGPT 👋</Text>
      </View>
      <View>
        <TextInput
          style={styles.TextInput}
          placeholder="Write your message."
          onChangeText={(text) => setPrompt(text)}
          value={prompt}
          placeholderTextColor={'gray'}
          autoCapitalize='none'
          autoCorrect={false}
        />
      </View>
      <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
        <Button title="Send" onPress={handleGenerateText} />
        
      </View>
      {response !== '' &&
        <ScrollView>
          <Text style={styles.resultText}>{response}</Text>
        </ScrollView>
      }
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
    margin: 20
  },
  TextInput: {
    width: '90%',
    height: 50,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 15,
    margin: 8,
    backgroundColor: 'rgb(51, 59, 76)',
    fontSize: 16,
    color: 'white',
    marginTop: 20,
    alignSelf: 'center'
  },
  resultText: {
    fontSize: 20,
    fontWeight: 600,
    color: 'white',
    marginHorizontal: 35,
    marginVertical: 12
  },
  copyButton: {
    fontSize: 16,
    color: 'white',
    alignSelf: 'center',
    marginVertical: 20
  }
});


export default App;
