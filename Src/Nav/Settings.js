import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal, Button, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database'; 

const SettingsScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); 
  const auth = getAuth();
  const db = getDatabase();

  useEffect(() => {
    const currentUser = auth.currentUser;
    setUser(currentUser);

    if (currentUser) {
      const postsRef = ref(db, 'posts');
      get(postsRef).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const userPosts = Object.keys(data).filter(key => data[key].userId === currentUser.uid).map(key => ({ id: key, ...data[key] }));
          setPosts(userPosts);
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    }
  }, [auth, db]);

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

  const handleManagePosts = () => {
    navigation.navigate('ManagePosts', { posts }); 
  };

  const handleContactSupport = () => {
    setModalVisible(true); // Show the modal
  };

  const closeModal = () => {
    setModalVisible(false); // Hide the modal
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Account Settings</Text>
      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('ChangePassword')}>
        <Text style={styles.optionText}>Change Password</Text>
        <Ionicons name="chevron-forward" size={20} color="gray" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={handleDeleteAccount}>
        <Text style={styles.optionText}>Delete Account</Text>
        <Ionicons name="trash" size={20} color="red" />
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Manage Your Posts</Text>
      <TouchableOpacity style={styles.option} onPress={handleManagePosts}>
        <Text style={styles.optionText}>View and Edit Posts</Text>
        <Ionicons name="create" size={20} color="gray" />
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Help and Support</Text>
      <TouchableOpacity style={styles.option} onPress={handleContactSupport}>
        <Text style={styles.optionText}>Contact Customer Support</Text>
        <Ionicons name="call-outline" size={20} color="gray" />
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Privacy and Terms</Text>
      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('PrivacyPolicy')}>
        <Text style={styles.optionText}>Privacy Policy</Text>
        <Ionicons name="document-text-outline" size={20} color="gray" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('TermsOfService')}>
        <Text style={styles.optionText}>Terms of Service</Text>
        <Ionicons name="document-outline" size={20} color="gray" />
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Logout</Text>
      <TouchableOpacity style={styles.option} onPress={handleLogout}>
        <Text style={styles.optionText}>Log out of the App</Text>
        <Ionicons name="log-out-outline" size={20} color="gray" />
      </TouchableOpacity>

      {/* Modal for Contact Support */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Contact Customer Support</Text>
            <Text style={styles.modalText}>Email: AgriRent2@gmail.com</Text>
            <Text style={styles.modalText}>Telephone: 030 </Text>
            <Button title="Close" onPress={closeModal} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingTop: 40,  
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', 
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default SettingsScreen;
