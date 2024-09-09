import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

const Post = () => {
  const [equipmentName, setEquipmentName] = useState('');
  const [equipmentDescription, setEquipmentDescription] = useState('');
  const [equipmentPrice, setEquipmentPrice] = useState('');

  const handleSubmit = () => {
   
    console.log('Equipment Name:', equipmentName);
    console.log('Equipment Description:', equipmentDescription);
    console.log('Equipment Price:', equipmentPrice);
  
    setEquipmentName('');
    setEquipmentDescription('');
    setEquipmentPrice('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Post New Equipment</Text>
      <TextInput
        style={styles.input}
        placeholder="Equipment Name"
        value={equipmentName}
        onChangeText={setEquipmentName}
      />
      <TextInput
        style={styles.input}
        placeholder="Equipment Description"
        value={equipmentDescription}
        onChangeText={setEquipmentDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Equipment Price"
        value={equipmentPrice}
        onChangeText={setEquipmentPrice}
        keyboardType="numeric"
      />
      <Button title="Submit" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default Post;
