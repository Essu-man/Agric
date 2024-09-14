import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal, RefreshControl } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Firebase/FirebaseConfig';
import SkeletonPlaceholder from "react-native-skeleton-placeholder"; 

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
  const [expandedItemId, setExpandedItemId] = useState(null); 
  const [modalVisible, setModalVisible] = useState(false); 


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

  // Filter based on category and search
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
    setExpandedItemId(expandedItemId === item.id ? null : item.id); // Toggle expansion
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchEquipmentData();
  }, []);

  // Render Category Item
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

  // Render Skeleton Loader
  const renderSkeletonLoader = () => (
    <SkeletonPlaceholder>
      <View style={styles.skeletonCard} />
      <View style={styles.skeletonCard} />
      <View style={styles.skeletonCard} />
    </SkeletonPlaceholder>
  );

  // Render Equipment Item with progressive disclosure (expand on click)
  const renderEquipmentItem = ({ item }) => (
    <TouchableOpacity style={styles.equipmentCard} onPress={() => handleEquipmentPress(item)}>
      {item.imageUrl ? (
        <Image source={{ uri: item.imageUrl }} style={styles.equipmentImage} />
      ) : (
        <Text style={styles.imageFallback}>Image not found</Text>
      )}
      <View style={styles.equipmentDetails}>
        <Text style={styles.equipmentName}>{item.name}</Text>
        {expandedItemId === item.id && (
          <>
            <Text style={styles.equipmentType}>{item.type}</Text>
            <View style={styles.equipmentLocationContainer}>
              <Ionicons name="location-outline" size={16} color="#888" />
              <Text style={styles.equipmentLocation}>{item.location}</Text>
            </View>
            <Text style={styles.equipmentPrice}>GHS {item.price} / day</Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );

  // No results illustration
  const renderNoResults = () => (
    <View style={styles.noResultsContainer}>
      <Image source={require('../assets/no-results.png')} style={styles.noResultsImage} />
      <Text style={styles.noResultsText}>No equipment found</Text>
    </View>
  );

  // Advanced filter modal
  const renderFilterModal = () => (
    <Modal visible={modalVisible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Filter Equipment</Text>
          {/* Add filter components like sliders, checkboxes here */}
          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalCloseButton}>
            <Text style={styles.modalCloseButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  // Conditional rendering based on loading, error, or data
  if (loading) {
    return renderSkeletonLoader();
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Find Your Equipment</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.filterButton}>
          <Ionicons name="options-outline" size={20} color="#FFF" />
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
      </View>

      {/* Categories */}
      <FlatList
        data={equipmentCategories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryContainer}
      />

      {/* Equipment List or No Results */}
      {filteredEquipment.length > 0 ? (
        <FlatList
          data={filteredEquipment}
          renderItem={renderEquipmentItem}
          keyExtractor={(item) => item.id}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      ) : (
        renderNoResults()
      )}

      {/* Advanced Filter Modal */}
      {renderFilterModal()}
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
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  equipmentImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  imageFallback: {
    fontSize: 14,
    color: '#888',
  },
  equipmentDetails: {
    flex: 1,
  },
  equipmentName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  equipmentType: {
    fontSize: 14,
    color: '#888',
  },
  equipmentLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  equipmentLocation: {
    marginLeft: 5,
    fontSize: 14,
    color: '#888',
  },
  equipmentPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  noResultsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  noResultsImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  noResultsText: {
    fontSize: 18,
    color: '#888',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalCloseButton: {
    marginTop: 20,
    paddingVertical: 10,
    backgroundColor: '#3d9d75',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalCloseButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  skeletonCard: {
    height: 150,
    borderRadius: 10,
    marginBottom: 15,
  },
});

export default Home;
