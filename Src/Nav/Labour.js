import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Labour = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [labourDetails, setLabourDetails] = useState({
    name: '',
    skill: '',
    contact: '',
    pricePerDay: '',
    location: ''
  });

  const toggleForm = () => {
    setFormVisible(!formVisible);
  };

  const handleInputChange = (field, value) => {
    setLabourDetails({
      ...labourDetails,
      [field]: value
    });
  };

  const handleSubmit = () => {
    console.log(labourDetails);
    setFormVisible(false); // Close form after submission
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Looking for Manpower</Text>
        <TouchableOpacity style={styles.addButton} onPress={toggleForm}>
          <Ionicons name="add" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      {formVisible && (
        <ScrollView style={styles.formContainer}>
          {/* Close icon in the top-right corner */}
          <TouchableOpacity style={styles.closeIconTopRight} onPress={toggleForm}>
            <Ionicons name="close-circle" size={60} color="#ff9999" />
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Name"
            value={labourDetails.name}
            onChangeText={(text) => handleInputChange('name', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Skill"
            value={labourDetails.skill}
            onChangeText={(text) => handleInputChange('skill', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Contact"
            value={labourDetails.contact}
            onChangeText={(text) => handleInputChange('contact', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Price per Day"
            value={labourDetails.pricePerDay}
            onChangeText={(text) => handleInputChange('pricePerDay', text)}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Location"
            value={labourDetails.location}
            onChangeText={(text) => handleInputChange('location', text)}
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      {!formVisible && (
        <View style={styles.middleContainer}>
          <Text style={styles.comingSoon}>Coming Soon...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
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
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 15,
    marginVertical: 10,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#3d9d75',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeIconTopRight: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  middleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  comingSoon: {
    fontSize: 26,
    color: '#3d9d75',
  },
});

export default Labour;
