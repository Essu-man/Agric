import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const EditPost = ({ route, navigation }) => {
  const { postId } = route.params;
  const [post, setPost] = useState({ title: '', description: '' });
  const db = getFirestore();
  const auth = getAuth();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postRef = doc(db, 'posts', postId);
        const docSnap = await getDoc(postRef);

        if (docSnap.exists()) {
          setPost(docSnap.data());
        } else {
          Alert.alert('Error', 'Post not found.');
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        Alert.alert('Error', 'Could not fetch post.');
      }
    };

    fetchPost();
  }, [postId, db]);

  const handleSave = async () => {
    try {
      const postRef = doc(db, 'posts', postId);
      await updateDoc(postRef, post);
      Alert.alert('Post Saved', 'Your changes have been saved.');
      navigation.goBack();
    } catch (error) {
      console.error('Error updating post:', error);
      Alert.alert('Error', 'Could not save changes.');
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Post</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={post.title}
        onChangeText={(text) => setPost({ ...post, title: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={post.description}
        onChangeText={(text) => setPost({ ...post, description: text })}
        multiline
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    borderColor: '#ddd',
    borderWidth: 1,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    backgroundColor: '#3d9d75',
    borderRadius: 5,
    padding: 15,
    width: '48%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f44336',
    borderRadius: 5,
    padding: 15,
    width: '48%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default EditPost;
