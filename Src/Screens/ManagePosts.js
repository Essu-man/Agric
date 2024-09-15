import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const ManagePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigation = useNavigation();
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(''); 
      try {
        const user = auth.currentUser;
        if (!user) {
          throw new Error('User is not authenticated');
        }

        const postsRef = collection(db, 'equipment'); 
        const q = query(postsRef, where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);

     
        console.log('Query Snapshot:', querySnapshot.docs.map(doc => doc.data()));

        if (querySnapshot.empty) {
          setError('No posts found for this user.');
        } else {
          const postsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setPosts(postsList);
        }
      } catch (error) {
        console.error('Error fetching posts:', error.message);
        setError('Error fetching posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [auth, db]);

  const handleEditPost = (postId) => {
    navigation.navigate('EditPost', { postId });
  };

  const renderPostItem = ({ item }) => (
    <View style={styles.postItem}>
      <Text style={styles.postTitle}>{item.name}</Text>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => handleEditPost(item.id)}
      >
        <Text style={styles.editButtonText}>Edit</Text>
        <Ionicons name="pencil" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Manage Your Posts</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={posts}
          renderItem={renderPostItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
        />
      )}
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
  list: {
    paddingBottom: 20,
  },
  postItem: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  editButton: {
    backgroundColor: '#3d9d75',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    marginRight: 5,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});

export default ManagePosts;
