import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const EditPost = ({ route, navigation }) => {
  const { postId } = route.params;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [city, setCity] = useState('');
  const [region, setRegion] = useState('');
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
          setEquipment([equipmentData]);  // Store the fetched equipment in the array
          setName(equipmentData.name);
          setDescription(equipmentData.description);
          setPrice(equipmentData.price);
          setCity(equipmentData.city);
          setRegion(equipmentData.region);
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

      // Check if a new image is selected and upload it
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
        city,
        region,
        hirerName,
        hirerPhone,
        hirerEmail,
        imageUrl: updatedImageUrl
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
      quality: 1
    });

    if (!result.canceled) {
      setImageUri(result.uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {equipment.map((item, index) => (
        <View key={index}>
          <TouchableOpacity style={styles.imagePicker} onPress={handleImagePick}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.image} />
            ) : (
              <Image source={{ uri: item.imageUrl }} style={styles.image} />
            )}
          </TouchableOpacity>

          <View style={styles.card}>
            <TextInput
              style={styles.input}
              placeholder="Equipment Name"
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Equipment Description"
              value={description}
              onChangeText={(text) => setDescription(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Price per Day"
              value={price}
              onChangeText={(text) => setPrice(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="City/Town"
              value={city}
              onChangeText={(text) => setCity(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Region"
              value={region}
              onChangeText={(text) => setRegion(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Hirer Name"
              value={hirerName}
              onChangeText={(text) => setHirerName(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Hirer Phone"
              value={hirerPhone}
              onChangeText={(text) => setHirerPhone(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Hirer Email"
              value={hirerEmail}
              onChangeText={(text) => setHirerEmail(text)}
            />

            <Button title="Update Equipment" onPress={handleUpdate} />
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  imagePicker: {
    alignItems: 'center',
    marginBottom: 15,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
});

export default EditPost;
