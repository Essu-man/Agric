import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, Image, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { getAuth, updateProfile, updateEmail } from 'firebase/auth';

const EditProfile = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '');
      setEmail(user.email || '');
      // Set additional user data if available
    }
  }, [user]);

  const handleUpdateProfile = async () => {
    setError(null);
    setLoading(true);

    if (!displayName || !email) {
      setLoading(false);
      return setError('Please fill in all required fields.');
    }

    try {
      if (user) {
        await updateProfile(user, { displayName, photoURL });
        await updateEmail(user, email);
        Alert.alert('Success', 'Profile updated successfully');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleProfilePictureChange = () => {
    // Add functionality to update profile picture
    Alert.alert('Change Profile Picture', 'This feature is under development.');
  };

  return (
    <LinearGradient
      colors={['#f8f9fa', '#e9ecef']}
      style={styles.container}
    >
      <View style={styles.profileCard}>
        <TouchableOpacity onPress={handleProfilePictureChange} style={styles.profilePictureContainer}>
          <Image
            source={{ uri: photoURL || 'https://via.placeholder.com/150' }}
            style={styles.profilePicture}
          />
          <Ionicons name="camera-outline" size={24} color="white" style={styles.editIcon} />
        </TouchableOpacity>

        <Text style={styles.label}>Display Name</Text>
        <TextInput
          style={styles.input}
          value={displayName}
          onChangeText={setDisplayName}
          placeholder="Enter display name"
          placeholderTextColor="#adb5bd"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholder="Enter email"
          placeholderTextColor="#adb5bd"
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          placeholder="Enter phone number"
          placeholderTextColor="#adb5bd"
        />

        <Text style={styles.label}>Bio</Text>
        <TextInput
          style={styles.input}
          value={bio}
          onChangeText={setBio}
          placeholder="Tell us about yourself"
          placeholderTextColor="#adb5bd"
        />

        {error && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity style={styles.updateButton} onPress={handleUpdateProfile} disabled={loading}>
          <LinearGradient
            colors={['#6a11cb', '#2575fc']}
            style={styles.updateButtonGradient}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Update Profile</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileCard: {
    width: '85%',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 30,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { height: 5, width: 0 },
    elevation: 5,
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#6a11cb',
    borderRadius: 15,
    padding: 5,
  },
  label: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#adb5bd',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: '#f8f9fa',
    color: '#495057',
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { height: 2, width: 0 },
  },
  updateButton: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  updateButtonGradient: {
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  error: {
    color: '#e74c3c',
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default EditProfile;
