import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, RefreshControl } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Firebase/FirebaseConfig'; 

const equipmentCategories = [
  { id: '1', name: 'Tractor' },
  { id: '2', name: 'Harvester' },
  { id: '3', name: 'Baler' },
  { id: '4', name: 'Plow' },
  { id: '5', name: 'Sprayer' },
];

const Home = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [equipmentData, setEquipmentData] = useState([]);
  const [filteredEquipment, setFilteredEquipment] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchEquipmentData = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'equipment'));
      const equipmentList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEquipmentData(equipmentList);
      setFilteredEquipment(equipmentList);
    } catch (e) {
      setError('Error fetching equipment data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchEquipmentData();
  }, []);

  useEffect(() => {
    const filteredData = equipmentData.filter((item) => {
      const matchesCategory = selectedCategory ? item.type === selectedCategory : true;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    setFilteredEquipment(filteredData);
  }, [selectedCategory, searchQuery, equipmentData]);

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName === selectedCategory ? null : categoryName);
  };

  const handleEquipmentPress = (item) => {
    navigation.navigate('EquipmentDetails', { equipment: item });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchEquipmentData();
  }, []);

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryBox,
        {
          backgroundColor: item.name === selectedCategory ? '#3d9d75' : '#E0E0E0',
        },
      ]}
      onPress={() => handleCategorySelect(item.name)}
    >
      <Text
        style={[
          styles.categoryText,
          {
            color: item.name === selectedCategory ? '#FFF' : '#333',
          },
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderEquipmentItem = ({ item }) => (
    <View style={styles.equipmentCard}>
      <TouchableOpacity onPress={() => handleEquipmentPress(item)}>
        {item.imageUrl ? (
          <Image source={{ uri: item.imageUrl }} style={styles.equipmentImage} />
        ) : (
          <Text style={styles.imageFallback}>Image not found</Text>
        )}
      </TouchableOpacity>
      <View style={styles.equipmentDetails}>
        <Text style={styles.equipmentName}>{item.name}</Text>
        <Text style={styles.equipmentType}>{item.type}</Text>
        <View style={styles.equipmentLocationContainer}>
          <Ionicons name="location-outline" size={16} color="#888" />
          <Text style={styles.equipmentLocation}>{item.location}</Text>
        </View>
        <View style={styles.equipmentInfo}>
          <Text style={styles.equipmentPrice}>GHS {item.price} / day</Text>
          <TouchableOpacity
            style={styles.bookButton}
            onPress={() => handleEquipmentPress(item)}
          >
            <Text style={styles.bookButtonText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Find Your Equipment</Text>
        <TouchableOpacity>
          <Ionicons name="person-circle-outline" size={30} color="#333" />
        </TouchableOpacity>
      </View>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="gray" />
        <TextInput
          placeholder="Search equipment..."
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options-outline" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <View style={styles.categoryContainer}>
        <FlatList
          data={equipmentCategories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <FlatList
        data={filteredEquipment}
        renderItem={renderEquipmentItem}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />

      <TouchableOpacity style={styles.fab}>
        <Ionicons name="help-circle-outline" size={28} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 15,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    padding: 10,
    marginBottom: 20,
  },
  searchInput: {
    marginLeft: 10,
    fontSize: 16,
    flex: 1,
  },
  filterButton: {
    backgroundColor: '#3d9d75',
    padding: 10,
    borderRadius: 10,
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryBox: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  equipmentCard: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
    position: 'relative',
  },
  equipmentImage: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 15,
  },
  imageFallback: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginVertical: 60,
  },
  equipmentDetails: {
    flexDirection: 'column',
  },
  equipmentName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  equipmentType: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  equipmentLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  equipmentLocation: {
    marginLeft: 5,
    fontSize: 14,
    color: '#888',
  },
  equipmentInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  equipmentPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    backgroundColor: '#3d9d75',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  bookButton: {
    backgroundColor: '#3d9d75',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  bookButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 15,
    backgroundColor: '#3d9d75',
    borderRadius: 50,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
});

export default Home;
