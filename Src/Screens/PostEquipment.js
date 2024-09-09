import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const PostEquipment = ({ navigation }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');

  const postEquipment = async () => {
    if (name && description && price && location) {
      try {
        await firestore().collection('equipment').add({
          name,
          description,
          price,
          location,
          postedAt: firestore.FieldValue.serverTimestamp(),
        });
        Alert.alert('Success', 'Equipment posted successfully!');
        navigation.navigate('Home');  
      } catch (error) {
        Alert.alert('Error', 'Failed to post equipment. Try again.');
      }
    } else {
      Alert.alert('Validation', 'All fields are required');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Equipment Name"
        value={name}
        onChangeText={setName}
        style={{ borderBottomWidth: 1, marginBottom: 15 }}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={{ borderBottomWidth: 1, marginBottom: 15 }}
      />
      <TextInput
        placeholder="Price"
        value={price}
        keyboardType="numeric"
        onChangeText={setPrice}
        style={{ borderBottomWidth: 1, marginBottom: 15 }}
      />
      <TextInput
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
        style={{ borderBottomWidth: 1, marginBottom: 15 }}
      />
      <Button title="Post Equipment" onPress={postEquipment} />
    </View>
  );
};

export default PostEquipment;
