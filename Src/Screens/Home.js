import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { getDownloadURL, ref } from 'firebase/storage'; 
import { storage } from '../Firebase/FirebaseConfig'; 

const equipmentCategories = [
  { id: '1', name: 'Tractors' },
  { id: '2', name: 'Harvesters' },
  { id: '3', name: 'Balers' },
  { id: '4', name: 'Plows' },
  { id: '5', name: 'Sprayers' },
];

const equipmentData = [
  {
    id: '1',
    name: 'Plow',
    location: 'Accra, Ghana',
    price: '₵110/Day',
    trips: '30 Rentals',
    rating: '4.6',
    imagePath: 'https://firebasestorage.googleapis.com/v0/b/my-agrirent.appspot.com/o/cat.plow.png?alt=media&token=b2484ed2-2769-435d-8226-b93eb0a812e9', 
    category: 'Plows',
  },
  {
    id: '2',
    name: 'Harvester',
    location: 'Accra, Ghana',
    price: '₵150/Day',
    trips: '30 Rentals',
    rating: '4.9',
    imagePath: 'https://firebasestorage.googleapis.com/v0/b/my-agrirent.appspot.com/o/cat.harvester.jpg?alt=media&token=7fc424d5-792d-4c55-8750-c22ad60cb2e6',
    category: 'Harvesters',
  },
  {
    id: '3',
    name: 'Large Square Baler',
    location: 'Accra, Ghana',
    price: '₵150/Day',
    trips: '30 Rentals',
    rating: '4.9',
    imagePath: 'https://firebasestorage.googleapis.com/v0/b/my-agrirent.appspot.com/o/L331%20Large%20Square%20Baler.png?alt=media&token=63d780bf-e0da-42f8-b2be-84ef4483a0c7',
    },

];

const Home = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredEquipment, setFilteredEquipment] = useState(equipmentData);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchImages = async () => {
      const updatedEquipmentData = await Promise.all(
        equipmentData.map(async (item) => {
          const imageUrl = await getDownloadURL(ref(storage, item.imagePath));
          return { ...item, imageUrl };
        })
      );
      setFilteredEquipment(updatedEquipmentData);
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const filteredData = equipmentData.filter((item) => {
      const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    setFilteredEquipment(filteredData);
  }, [selectedCategory, searchQuery]);

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName === selectedCategory ? null : categoryName);
  };

  const handleEquipmentPress = (item) => {
    navigation.navigate('EquipmentDetails', { equipment: item });
  };

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
        <View style={styles.equipmentHeader}>
          <Text style={styles.equipmentName}>{item.name}</Text>
          <View style={styles.equipmentRating}>
            <Ionicons name="star" size={16} color="gold" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
        <View style={styles.equipmentLocationContainer}>
          <Ionicons name="location-outline" size={16} color="#888" />
          <Text style={styles.equipmentLocation}>{item.location}</Text>
        </View>
        <View style={styles.equipmentInfo}>
          <Text style={styles.equipmentPrice}>{item.price}</Text>
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
    width: '95%',
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
  equipmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  equipmentName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  equipmentRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 5,
  },
  equipmentLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  equipmentLocation: {
    fontSize: 14,
    color: '#888',
    marginLeft: 5,
  },
  equipmentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  equipmentPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3d9d75',
  },
  bookButton: {
    backgroundColor: '#3d9d75',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  bookButtonText: {
    color: '#FFF',
    fontSize: 14,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#3d9d75',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
});

export default Home;