import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getAuth } from 'firebase/auth';

const SettingsScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const currentUser = auth.currentUser;
    setUser(currentUser);
  }, [auth]);

  const handleLogout = () => {
    Alert.alert("Logged out", "You have been logged out.");
    navigation.navigate('Splash');
  };

  const handleDeleteAccount = () => {
    Alert.alert("Delete Account", "Are you sure you want to delete your account?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", onPress: () => console.log("Account deleted") },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Account Settings */}
      <Text style={styles.sectionTitle}>Account Settings</Text>
      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('ChangePassword')}>
        <Text style={styles.optionText}>Change Password</Text>
        <Ionicons name="chevron-forward" size={20} color="gray" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={handleDeleteAccount}>
        <Text style={styles.optionText}>Delete Account</Text>
        <Ionicons name="trash" size={20} color="red" />
      </TouchableOpacity>

      {/* Help and Support */}
      <Text style={styles.sectionTitle}>Help and Support</Text>
      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('ContactSupport')}>
        <Text style={styles.optionText}>Contact Customer Support</Text>
        <Ionicons name="call-outline" size={20} color="gray" />
      </TouchableOpacity>

      {/* Privacy and Terms */}
      <Text style={styles.sectionTitle}>Privacy and Terms</Text>
      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('PrivacyPolicy')}>
        <Text style={styles.optionText}>Privacy Policy</Text>
        <Ionicons name="document-text-outline" size={20} color="gray" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('TermsOfService')}>
        <Text style={styles.optionText}>Terms of Service</Text>
        <Ionicons name="document-outline" size={20} color="gray" />
      </TouchableOpacity>

      {/* Logout */}
      <Text style={styles.sectionTitle}>Logout</Text>
      <TouchableOpacity style={styles.option} onPress={handleLogout}>
        <Text style={styles.optionText}>Log out of the App</Text>
        <Ionicons name="log-out-outline" size={20} color="gray" />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingTop: 40,  // This adds space at the top
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 15,
    color: '#333',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    fontSize: 16,
    color: '#555',
  },
});

export default SettingsScreen;
