import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ScrollView, Text, KeyboardAvoidingView, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const EditPost = ({ route, navigation }) => {
  const { postId } = route.params;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState(''); // Changed to single location field
  const [hirerName, setHirerName] = useState('');
  const [hirerPhone, setHirerPhone] = useState('');
  const [hirerEmail, setHirerEmail] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [equipment, setEquipment] = useState([]);

  const auth = getAuth();
  const db = getFirestore();
  const storage = getStorage();

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          Alert.alert('Error', 'User not authenticated');
          return;
        }

        const docRef = doc(db, 'equipment', postId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const equipmentData = docSnap.data();
          setEquipment([equipmentData]);
          setName(equipmentData.name);
          setDescription(equipmentData.description);
          setPrice(equipmentData.price);
          setLocation(equipmentData.location); // Use the location field
          setHirerName(equipmentData.hirerName);
          setHirerPhone(equipmentData.hirerPhone);
          setHirerEmail(equipmentData.hirerEmail);
          setImageUri(equipmentData.imageUrl);
        } else {
          Alert.alert('Error', 'No equipment found with that ID.');
        }
      } catch (error) {
        console.error('Error fetching equipment:', error.message);
        Alert.alert('Error', 'Failed to fetch equipment details.');
      }
    };

    fetchEquipment();
  }, [db, postId]);

  const handleUpdate = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert('Error', 'User not authenticated');
        return;
      }

      const equipmentRef = doc(db, 'equipment', postId);
      let updatedImageUrl = imageUri;

      if (imageUri && imageUri.startsWith('file:')) {
        const imageRef = ref(storage, `images/${Date.now()}.jpg`);
        const response = await fetch(imageUri);
        const blob = await response.blob();
        await uploadBytes(imageRef, blob);
        updatedImageUrl = await getDownloadURL(imageRef);
      }

      await updateDoc(equipmentRef, {
        name,
        description,
        price,
        location, // Updated to use the location field
        hirerName,
        hirerPhone,
        hirerEmail,
        imageUrl: updatedImageUrl,
      });

      Alert.alert('Success', 'Equipment details updated successfully.');
      navigation.goBack();
    } catch (error) {
      console.error('Error updating document:', error.message);
      Alert.alert('Error', 'Failed to update equipment details.');
    }
  };

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.uri);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header with Back Button and Title */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Edit Equipment</Text>
        </View>

        <TouchableOpacity style={styles.imagePicker} onPress={handleImagePick}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.image} />
          ) : (
            <Image source={{ uri: equipment.length > 0 ? equipment[0].imageUrl : '' }} style={styles.image} />
          )}
        </TouchableOpacity>

        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="Equipment Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Equipment Description"
            value={description}
            onChangeText={setDescription}
          />
          <TextInput
            style={styles.input}
            placeholder="Price per Day (GHS)"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Location"
            value={location} // Updated to location
            onChangeText={setLocation}
          />
          <TextInput
            style={styles.input}
            placeholder="Hirer Name"
            value={hirerName}
            onChangeText={setHirerName}
          />
          <TextInput
            style={styles.input}
            placeholder="Hirer Phone"
            value={hirerPhone}
            onChangeText={setHirerPhone}
          />
          <TextInput
            style={styles.input}
            placeholder="Hirer Email"
            value={hirerEmail}
            onChangeText={setHirerEmail}
            keyboardType="email-address"
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleUpdate}>
            <Text style={styles.submitButtonText}>Update Equipment</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
    marginBottom: 24,
  },
  backButton: {
    marginRight: 10,
  },
  backButtonText: {
    fontSize: 34,
    color: '#000', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    flex: 1,
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
    marginBottom: 20,
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

export default EditPost;
