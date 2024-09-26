import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Labour = ({ navigation }) => {
  const [labourName, setLabourName] = useState('');
  const [labourSkill, setLabourSkill] = useState('');
  const [labourPrice, setLabourPrice] = useState('');
  const [labourLocation, setLabourLocation] = useState('');
  const [contact, setContact] = useState('');
  const [formVisible, setFormVisible] = useState(false);

  const toggleForm = () => {
    setFormVisible(!formVisible);
  };

  const handleSubmit = () => {
    if (!labourName || !labourSkill || !labourPrice || !labourLocation || !contact) {
      alert('Please fill out all fields');
      return;
    }

    console.log({ labourName, labourSkill, labourPrice, labourLocation, contact });
    setFormVisible(false);
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

              <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>

              {/* Close icon positioned below the submit button */}
              <TouchableOpacity style={styles.closeIconBottom} onPress={toggleForm}>
                <Ionicons name="close-circle" size={60} color="#ff9999" />
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}

        {!formVisible && (
          <View style={styles.middleContainer}>
            <Text style={styles.comingSoon}>Coming Soon...</Text>
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
  formContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 20,
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
  closeIconBottom: {
    alignSelf: 'center',
    marginTop: 20,
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
