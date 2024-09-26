import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { db } from '../Firebase/FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const Labour = ({ navigation }) => {
  const [labourers, setLabourers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    const fetchLabourers = async () => {
      const labourersCollection = collection(db, 'labourers');
      const labourersSnapshot = await getDocs(labourersCollection);
      const labourersList = labourersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLabourers(labourersList);
    };

    fetchLabourers();
  }, []);

  const filteredLabourers = labourers.filter(labourer => 
    labourer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleForm = () => {
    // Logic for toggling form visibility if needed
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Looking for Labourers</Text>
          <TouchableOpacity style={styles.addButton} onPress={toggleForm}>
            <Ionicons name="add" size={30} color="#fff" />
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.searchInput}
          placeholder="Search for labourers..."
          value={searchTerm}
          onChangeText={setSearchTerm}
        />

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {filteredLabourers.map((labourer) => (
            <View key={labourer.id} style={styles.labourerCard}>
              <View style={styles.labourerInfo}>
                <Text style={styles.labourerName}>{labourer.name}</Text>
                <View style={styles.labourerSkills}>
                  <Text style={styles.skillsLabel}>Skills: </Text>
                  <Text style={styles.labourerSkill}>{labourer.skill}</Text>
                </View>
                <Text style={styles.labourerDetails}>
                  Price: <Text style={styles.priceText}>90 GHS/Day</Text>
                </Text>
                <View style={styles.locationContainer}>
                  <Ionicons name="location-outline" size={20} color="#3d9d75" />
                  <Text style={styles.labourerLocation}>{labourer.location}</Text>
                </View>
                <View style={styles.contactBox}>
                  <Text style={styles.contactBoxText}>Contact: {labourer.contact}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#3d9d75',
    borderRadius: 50,
    padding: 10,
    elevation: 3,
  },
  searchInput: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#fafafa',
  },
  scrollContainer: {
    paddingBottom: 100,
  },
  labourerCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
  },
  labourerInfo: {
    marginBottom: 10,
  },
  labourerName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  labourerSkills: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  skillsLabel: {
    fontWeight: 'bold',
    color: '#555',
  },
  labourerSkill: {
    fontSize: 16,
    color: '#555',
    marginLeft: 4,
  },
  labourerDetails: {
    marginTop: 8,
  },
  labourerLocation: {
    fontSize: 16,
    color: '#333',
    marginLeft: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  priceText: {
    fontWeight: 'bold',
    color: '#3d9d75',
  },
  contactBox: {
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#e0f7fa',
    borderColor: '#3d9d75',
    borderWidth: 1,
  },
  contactBoxText: {
    fontSize: 16,
    color: '#333',
  },
});

export default Labour;
