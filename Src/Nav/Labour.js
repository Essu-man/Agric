import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Labour = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [labourDetails, setLabourDetails] = useState({
    name: '',
    skill: '',
    contact: ''
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
    // Handle form submission, e.g., send data to Firebase or update state
    console.log(labourDetails);
    // Close form after submission
    setFormVisible(false);
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
        <View style={styles.formContainer}>
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
          <Button title="Submit" onPress={handleSubmit} />
        </View>
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
    padding: 10,
    marginVertical: 10,
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
