import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// Firebase Storage URLs for categories
const imageUrls = {
  Tractors: 'https://firebasestorage.googleapis.com/v0/b/my-agrirent.appspot.com/o/cat.tractor.jpg?alt=media&token=3fa44470-5dd9-4fae-a844-9d284fdfe60a',
  Harvesters: 'https://firebasestorage.googleapis.com/v0/b/my-agrirent.appspot.com/o/cat.harvester.jpg?alt=media&token=910c8753-097f-4e1f-b3c7-1d747180520c',
  Balers: 'https://firebasestorage.googleapis.com/v0/b/my-agrirent.appspot.com/o/cat.Baler.png?alt=media&token=dcdfdfa2-643d-409b-a732-293b021698e1',
  Plows: 'https://firebasestorage.googleapis.com/v0/b/my-agrirent.appspot.com/o/cat.plow.png?alt=media&token=b2484ed2-2769-435d-8226-b93eb0a812e9',
  Sprayers:'https://firebasestorage.googleapis.com/v0/b/my-agrirent.appspot.com/o/cat.sprayer.png?alt=media&token=846473e1-fabc-4e9f-9b59-7f6237e478cd' ,
  Cultivators: 'https://firebasestorage.googleapis.com/v0/b/my-agrirent.appspot.com/o/cat.Cultivators.png?alt=media&token=a159b009-7bae-4dad-acdf-8a80126536a9',
};

// Firebase Storage URLs for equipment types
const typeImages = {
  'Utility Tractor': 'https://firebasestorage.googleapis.com/v0/b/my-agrirent.appspot.com/o/Tractor%2Futility-tractor.png?alt=media&token=1dbb45b2-f99c-40ee-9f6d-707ec3da6d5b',
  'Raw Crop Tractor': 'https://firebasestorage.googleapis.com/v0/b/my-agrirent.appspot.com/o/Tractor%2FRaw-Crop-tractor.png?alt=media&token=6ec06ba2-324b-420a-a0a6-5250f377dcf9',
  'Compact Tractor': 'https://firebasestorage.googleapis.com/v0/b/my-agrirent.appspot.com/o/Tractor%2FCompact-tractor.png?alt=media&token=a442ec56-2444-4734-8c7a-71e8a2c3c7f5',
  'Combine Harvester': 'https://firebasestorage.googleapis.com/v0/b/my-agrirent.appspot.com/o/Harvester%2FCombine%20Harvester.png?alt=media&token=003fb05f-b58a-4b2f-ada5-6d7b700b924c',
  'Forage Harvester': 'https://firebasestorage.googleapis.com/v0/b/my-agrirent.appspot.com/o/Harvester%2FForage.png?alt=media&token=3450406f-25b3-4d75-a5ba-296b65df0544',
  // Add URLs for other types similarly
};

const equipmentCategories = [
  { id: '1', name: 'Tractors', cost: '₵120/Day' },
  { id: '2', name: 'Harvesters', cost: '₵150/Day' },
  { id: '3', name: 'Balers', cost: '₵140/Day' },
  { id: '4', name: 'Plows', cost: '₵110/Day' },
  { id: '5', name: 'Sprayers', cost: '₵130/Day' },
  { id: '6', name: 'Cultivators', cost: '₵100/Day' },
];

const equipmentTypes = {
  Tractors: ['Utility Tractor', 'Raw Crop Tractor', 'Compact Tractor'],
  Harvesters: ['Combine Harvester', 'Forage Harvester'],
  Balers: ['Round Baler', 'Square Baler', 'Silage Baler'],
  Plows: ['MoldBoard Plow', 'Disc Plow', 'Chisel Plow'],
  Sprayers: ['Boom Sprayer', 'Mist Sprayer', 'Air Blast Sprayer'],
  Cultivators: ['Field Cultivator', 'Row Crop Cultivator', 'Rotary Cultivator'],
};

const EquipmentDetails = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedType(null);
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
  };

  const handleContactPress = () => {
    alert('Contact: +233 555 555 555');
  };

  const handleEmailPress = () => {
    alert('Email: johndoe@gmail.com');
  };

  const handleBookNowPress = () => {
    if (selectedCategory && selectedType) {
      navigation.navigate('OrderDetails', {
        selectedCategory,
        selectedType,
        baseCostPerDay: parseFloat(getCategoryCost().replace(/₵|\/Day/g, '')),
        location: 'Accra, Ghana',
      });
    } else {
      alert('Please select both a category and type.');
    }
  };

  const renderEquipmentImage = () => {
    if (selectedType) {
      const typeImageUrl = typeImages[selectedType];
      return typeImageUrl ? <Image source={{ uri: typeImageUrl }} style={styles.equipmentImage} /> : null;
    }

    if (selectedCategory) {
      const categoryImageUrl = imageUrls[selectedCategory];
      return categoryImageUrl ? <Image source={{ uri: categoryImageUrl }} style={styles.equipmentImage} /> : null;
    }

    return null;
  };

  const getCategoryCost = () => {
    const category = equipmentCategories.find(cat => cat.name === selectedCategory);
    return category ? category.cost : '₵0/Day';
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>

      <View style={styles.headerContainer}>
        <Text style={styles.orderSummaryTitle}>Equipment Details</Text>
      </View>

      {selectedCategory && (
        <View style={styles.imageContainer}>
          {renderEquipmentImage()}
        </View>
      )}

      <View style={styles.hirerInfoCard}>
        <View style={styles.hirerInfo}>
          <Text style={styles.hirerName}>John Doe</Text>
          <View style={styles.contactActions}>
            <TouchableOpacity onPress={handleContactPress} style={styles.contactButton}>
              <Ionicons name="call" size={24} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleEmailPress} style={styles.contactButton}>
              <Ionicons name="mail" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.infoRowContainer}>
        <View style={styles.infoCard}>
          <Ionicons name="cash" size={24} color="#3d9d75" style={styles.icon} />
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTitle}>Cost</Text>
            <Text style={styles.infoText}>{getCategoryCost()}</Text>
          </View>
        </View>
        <View style={styles.infoCard}>
          <Ionicons name="location" size={24} color="#3d9d75" style={styles.icon} />
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTitle}>Location</Text>
            <Text style={styles.infoText}>Accra, Ghana</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeader}>Category</Text>
        <FlatList
          data={equipmentCategories}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryBox,
                selectedCategory === item.name && styles.selectedCategoryBox,
              ]}
              onPress={() => handleCategorySelect(item.name)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === item.name && styles.selectedCategoryText,
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.categoryContainer}
        />
      </View>

      {selectedCategory && (
        <View style={styles.section}>
          <Text style={styles.subHeader}>Type</Text>
          <FlatList
            data={equipmentTypes[selectedCategory]}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.typeBox,
                  selectedType === item && styles.selectedTypeBox,
                ]}
                onPress={() => handleTypeSelect(item)}
              >
                <Text
                  style={[
                    styles.typeText,
                    selectedType === item && styles.selectedTypeText,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.typeContainer}
          />
        </View>
      )}

      <View style={styles.section}>
        <View style={styles.infoCard}>
          <Ionicons name="information-circle" size={24} color="#3d9d75" style={styles.icon} />
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTitle}>Tool Info</Text>
            <Text style={styles.infoText}>
              This tool is essential for ensuring smooth operations in the field, offering reliability and efficiency.
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.infoCard}>
          <Ionicons name="document-text" size={24} color="#3d9d75" style={styles.icon} />
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTitle}>Terms & Conditions</Text>
            <Text style={styles.infoText}>
              By booking this equipment, you agree to our terms and conditions. Ensure proper handling and timely return to avoid penalties.
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.bookButton} onPress={handleBookNowPress}>
        <Text style={styles.bookButtonText}>Book Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    left: -15,
    top: 0,
    padding: 15,
    zIndex: 1,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  orderSummaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  equipmentImage: {
    width: 250,
    height: 150,
    borderRadius: 10,
  },
  hirerInfoCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 5,
  },
  hirerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  hirerName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactActions: {
    flexDirection: 'row',
  },
  contactButton: {
    backgroundColor: '#3d9d75',
    borderRadius: 50,
    padding: 10,
    marginLeft: 10,
  },
  infoRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  infoCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    flex: 1,
    marginHorizontal: 10,
    flexDirection: 'row', // Align items horizontally
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  icon: {
    marginRight: 10, // Space between icon and text
  },
  infoTextContainer: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
  },

  section: {
    marginBottom: 20,
  },
  categoryContainer: {
    flexGrow: 1,
  },
  categoryBox: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCategoryBox: {
    backgroundColor: '#3d9d75',
  },
  categoryText: {
    fontSize: 14,
    color: '#333',
  },
  selectedCategoryText: {
    color: '#FFF',
  },
  typeContainer: {
    flexGrow: 1,
  },
  typeBox: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedTypeBox: {
    backgroundColor: '#3d9d75',
  },
  typeText: {
    fontSize: 14,
    color: '#333',
  },
  selectedTypeText: {
    color: '#FFF',
  },
  bookButton: {
    backgroundColor: '#3d9d75',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EquipmentDetails;
