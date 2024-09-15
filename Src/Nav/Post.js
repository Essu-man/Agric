import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { db, storage } from '../Firebase/FirebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const Post = ({ navigation }) => {
  const [equipmentName, setEquipmentName] = useState('');
  const [equipmentDescription, setEquipmentDescription] = useState('');
  const [equipmentPrice, setEquipmentPrice] = useState('');
  const [equipmentCity, setEquipmentCity] = useState('');
  const [equipmentRegion, setEquipmentRegion] = useState('');
  const [hirerName, setHirerName] = useState('');
  const [hirerContact, setHirerContact] = useState('');
  const [hirerEmail, setHirerEmail] = useState('');
  const [equipmentType, setEquipmentType] = useState('');
  const [imageUri, setImageUri] = useState(null);

  const handleImagePick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!equipmentName || !equipmentDescription || !equipmentPrice || !equipmentCity || !equipmentRegion || !hirerName || !hirerContact || !hirerEmail || !equipmentType) {
      alert('Please fill out all fields');
      return;
    }

    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        alert('User is not authenticated');
        return;
      }

      const imageName = imageUri ? imageUri.substring(imageUri.lastIndexOf('/') + 1) : '';
      let imageUrl = '';

      if (imageUri) {
        const storageRef = ref(storage, `equipment/${imageName}`);
        const response = await fetch(imageUri);
        const blob = await response.blob();
        await uploadBytes(storageRef, blob);
        imageUrl = await getDownloadURL(storageRef);
      }

      await addDoc(collection(db, 'equipment'), {
        name: equipmentName,
        description: equipmentDescription,
        price: equipmentPrice,
        city: equipmentCity,
        region: equipmentRegion,
        hirerName: hirerName,
        hirerPhone: hirerContact,
        hirerEmail: hirerEmail,
        imageUrl: imageUrl,
        userId: user.uid, // Ensure userId is stored
      });

      alert('Equipment added successfully!');
      navigation.navigate('Home');

      // Clear form
      setEquipmentName('');
      setEquipmentDescription('');
      setEquipmentPrice('');
      setEquipmentCity('');
      setEquipmentRegion('');
      setHirerName('');
      setHirerContact('');
      setHirerEmail('');
      setEquipmentType('');
      setImageUri(null);
    } catch (error) {
      console.error('Error adding equipment:', error);
      Alert.alert('Error adding equipment', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Post New Equipment</Text>

      <TouchableOpacity style={styles.imagePicker} onPress={handleImagePick}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <Ionicons name="camera" size={40} color="#888" />
        )}
      </TouchableOpacity>

      <View style={styles.card}>
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
          placeholder="Equipment Price (GHS)"
          value={equipmentPrice}
          onChangeText={setEquipmentPrice}
          keyboardType="numeric"
        />
        
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.halfWidth]}
            placeholder="City"
            value={equipmentCity}
            onChangeText={setEquipmentCity}
          />
          <TextInput
            style={[styles.input, styles.halfWidth]}
            placeholder="Region"
            value={equipmentRegion}
            onChangeText={setEquipmentRegion}
          />
        </View>

        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.halfWidth]}
            placeholder="Hirer Name"
            value={hirerName}
            onChangeText={setHirerName}
          />
          <TextInput
            style={[styles.input, styles.halfWidth]}
            placeholder="Hirer Contact"
            value={hirerContact}
            onChangeText={setHirerContact}
            keyboardType="phone-pad"
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Hirer Email"
          value={hirerEmail}
          onChangeText={setHirerEmail}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Equipment Type"
          value={equipmentType}
          onChangeText={setEquipmentType}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
    textAlign: 'center',
  },
  imagePicker: {
    height: 200,
    backgroundColor: '#e0e0e0',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#ccc',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 0,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#fafafa',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  halfWidth: {
    flex: 1,
    marginRight: 8,
  },
  submitButton: {
    backgroundColor: '#3d9d75',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Post;
