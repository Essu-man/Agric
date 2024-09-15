import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
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

  const handleDeletePost = async (postId) => {
    try {
      await deleteDoc(doc(db, 'equipment', postId));
      setPosts(posts.filter(post => post.id !== postId));
      Alert.alert('Success', 'Post deleted successfully.');
    } catch (error) {
      console.error('Error deleting post:', error.message);
      Alert.alert('Error', 'Error deleting post. Please try again later.');
    }
  };

  const renderPostItem = ({ item }) => (
    <View style={styles.postItem}>
      <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
      <View style={styles.postDetails}>
        <Text style={styles.postTitle}>{item.name}</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => handleEditPost(item.id)}
          >
            <Text style={styles.buttonText}>Edit</Text>
            <Ionicons name="pencil" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeletePost(item.id)}
          >
            <Text style={styles.buttonText}>Delete</Text>
            <Ionicons name="trash" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.header}>Manage Your Posts</Text>
      </View>
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
    marginBottom: -60,

  },
  backButton: {
    padding: 10,
    marginRight: 10,
    position: 'absolute',
    left: 0,
    top: 10, 
    padding: 10,
    
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
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  postImage: {
    width: 80,
    height: 60,
    borderRadius: 15,
    marginRight: 15,
  },
  postDetails: {
    flex: 1,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#3d9d75',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#d9534f',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
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
