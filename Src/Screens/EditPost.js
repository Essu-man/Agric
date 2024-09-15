import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const EditPost = ({ route, navigation }) => {
  const { postId } = route.params; 
  const [equipment, setEquipment] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [editing, setEditing] = useState(false); 
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [city, setCity] = useState('');
  const [region, setRegion] = useState('');
  const [hirerName, setHirerName] = useState('');
  const [hirerPhone, setHirerPhone] = useState('');
  const [hirerEmail, setHirerEmail] = useState('');

  const db = getFirestore();
  const auth = getAuth();

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const docRef = doc(db, 'equipment', postId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setEquipment(data);
          setName(data.name);
          setDescription(data.description);
          setPrice(data.price);
          setCity(data.city);
          setRegion(data.region);
          setHirerName(data.hirerName);
          setHirerPhone(data.hirerPhone);
          setHirerEmail(data.hirerEmail);
          setImageUri(data.imageUrl);
        } else {
          Alert.alert('Error', 'No such document!');
        }
      } catch (error) {
        console.error('Error fetching equipment:', error.message);
        Alert.alert('Error', 'Failed to fetch equipment details.');
      }
    };

    fetchEquipment();
  }, [db, postId]);

  const handleImagePick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'We need camera roll permissions to make this work!');
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

  const handleSave = async () => {
    try {
      const docRef = doc(db, 'equipment', postId);
      await updateDoc(docRef, {
        name,
        description,
        price,
        city,
        region,
        hirerName,
        hirerPhone,
        hirerEmail,
        imageUrl: imageUri || equipment.imageUrl, 
      });

      Alert.alert('Success', 'Equipment updated successfully!');
      navigation.goBack(); 
    } catch (error) {
      console.error('Error updating equipment:', error.message);
      Alert.alert('Error', 'Failed to update equipment.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>{editing ? 'Edit Equipment' : 'Edit Equipment'}</Text>
      </View>
      
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
          value={name}
          onChangeText={setName}
          editable={editing}
        />
        <TextInput
          style={styles.input}
          placeholder="Equipment Description"
          value={description}
          onChangeText={setDescription}
          editable={editing}
        />
        <TextInput
          style={styles.input}
          placeholder="Equipment Price (GHS)"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
          editable={editing}
        />
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.halfWidth]}
            placeholder="City"
            value={city}
            onChangeText={setCity}
            editable={editing}
          />
          <TextInput
            style={[styles.input, styles.halfWidth]}
            placeholder="Region"
            value={region}
            onChangeText={setRegion}
            editable={editing}
          />
        </View>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.halfWidth]}
            placeholder="Hirer Name"
            value={hirerName}
            onChangeText={setHirerName}
            editable={editing}
          />
          <TextInput
            style={[styles.input, styles.halfWidth]}
            placeholder="Hirer Contact"
            value={hirerPhone}
            onChangeText={setHirerPhone}
            keyboardType="phone-pad"
            editable={editing}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Hirer Email"
          value={hirerEmail}
          onChangeText={setHirerEmail}
          keyboardType="email-address"
          editable={editing}
        />

        {editing && (
          <TouchableOpacity style={styles.submitButton} onPress={handleSave}>
            <Text style={styles.submitButtonText}>Save</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => setEditing(!editing)}
        >
          <Text style={styles.toggleButtonText}>{editing ? 'Cancel' : 'Edit'}</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
    textAlign: 'center',
    flex: 1,
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
  toggleButton: {
    marginTop: 16,
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 12,
    alignItems: 'center',
  },
  toggleButtonText: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EditPost;
