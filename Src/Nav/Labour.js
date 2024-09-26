import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { firestore } from '../Firebase/FirebaseConfig'; 

const Labour = ({ navigation }) => {
  const [labourName, setLabourName] = useState('');
  const [labourSkill, setLabourSkill] = useState('');
  const [labourPrice, setLabourPrice] = useState('');
  const [labourLocation, setLabourLocation] = useState('');
  const [contact, setContact] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [formVisible, setFormVisible] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState([]);

  const toggleForm = () => {
    setFormVisible(!formVisible);
  };

  const handleSubmit = async () => {
    if (!labourName || !labourSkill || !labourPrice || !labourLocation || !contact) {
      alert('Please fill out all fields');
      return;
    }

    try {
      await firestore.collection('labourers').add({
        name: labourName,
        skill: labourSkill,
        price: labourPrice,
        location: labourLocation,
        contact,
        equipment: selectedEquipment,
      });
      alert('Labourer details submitted successfully!');
      setFormVisible(false);
      // Reset form fields
      setLabourName('');
      setLabourSkill('');
      setLabourPrice('');
      setLabourLocation('');
      setContact('');
      setSelectedEquipment([]);
    } catch (error) {
      console.error("Error adding document: ", error);
      alert('Error submitting details. Please try again.');
    }
  };

  const equipmentOptions = ['Tractor', 'Baler', 'Sprayer', 'Harvester', 'Plow'];

  const handleEquipmentSelect = (equipment) => {
    if (selectedEquipment.includes(equipment)) {
      setSelectedEquipment(selectedEquipment.filter(item => item !== equipment));
    } else {
      setSelectedEquipment([...selectedEquipment, equipment]);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Looking for Manpower</Text>
          <TouchableOpacity style={styles.addButton} onPress={toggleForm}>
            <Ionicons name="add" size={30} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Form that covers the search field */}
        {formVisible && (
          <ScrollView contentContainerStyle={styles.formContainer}>
            <View style={styles.card}>
              <TextInput
                style={styles.input}
                placeholder="Labourer Name"
                value={labourName}
                onChangeText={setLabourName}
              />
              <TextInput
                style={styles.input}
                placeholder="Skill"
                value={labourSkill}
                onChangeText={setLabourSkill}
              />
              <TextInput
                style={styles.input}
                placeholder="Price per Day"
                value={labourPrice}
                onChangeText={setLabourPrice}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                placeholder="Location"
                value={labourLocation}
                onChangeText={setLabourLocation}
              />
              <TextInput
                style={styles.input}
                placeholder="Contact"
                value={contact}
                onChangeText={setContact}
                keyboardType="phone-pad"
              />

              <Text style={styles.equipmentText}>Equipment Type</Text>
              <View style={styles.equipmentContainer}>
                {equipmentOptions.map((equipment) => (
                  <TouchableOpacity
                    key={equipment}
                    style={[styles.equipmentButton, selectedEquipment.includes(equipment) && styles.equipmentSelected]}
                    onPress={() => handleEquipmentSelect(equipment)}
                  >
                    <Text style={[styles.equipmentButtonText, selectedEquipment.includes(equipment) && styles.selectedEquipmentText]}>
                      {equipment}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.closeIcon} onPress={toggleForm}>
                <Ionicons name="close-circle" size={60} color="#ff9999" />
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}

        {/* Search Field */}
        {!formVisible && (
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for labourers..."
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
          </View>
        )}
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fafafa',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
  },
  formContainer: {
    position: 'absolute',
    top: 0, 
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
    zIndex: 1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
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
  equipmentText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  equipmentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  equipmentButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 10,
    margin: 5,
    backgroundColor: '#fafafa',
    width: '45%',
    alignItems: 'center',
  },
  equipmentSelected: {
    backgroundColor: '#3d9d75',
    borderColor: '#3d9d75',
  },
  equipmentButtonText: {
    color: '#333',
  },
  selectedEquipmentText: {
    color: '#fff',
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
    marginBottom: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeIcon: {
    alignSelf: 'center',
  },
});

export default Labour;
