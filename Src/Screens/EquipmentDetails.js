import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import {
  ScrollView,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const EquipmentDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { equipment } = route.params;

  const handleContactPress = () => {
    alert(`Contact: ${equipment.hirerPhone}`);
  };

  const handleEmailPress = () => {
    alert(`Email: ${equipment.hirerEmail}`);
  };

  const handleBookNowPress = () => {
    navigation.navigate('OrderDetails', {
      equipmentId: equipment.id,
      baseCostPerDay: equipment.price,
      location: equipment.location,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>

      <View style={styles.headerContainer}>
        <Text style={styles.orderSummaryTitle}>Equipment Details</Text>
      </View>

      <View style={styles.imageContainer}>
        {equipment.imageUrl ? (
          <Image source={{ uri: equipment.imageUrl }} style={styles.equipmentImage} />
        ) : (
          <Text style={styles.imageFallback}>Image not found</Text>
        )}
      </View>

      <View style={styles.hirerInfoCard}>
        <View style={styles.hirerInfo}>
          <Text style={styles.hirerName}>{equipment.hirerName}</Text>
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
            <Text style={styles.infoText}>GHS {equipment.price} / day</Text>
          </View>
        </View>
        <View style={styles.infoCard}>
          <Ionicons name="location" size={24} color="#3d9d75" style={styles.icon} />
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTitle}>Location</Text>
            <Text style={styles.infoText}>{equipment.location}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeader}>Category</Text>
        <Text style={styles.categoryText}>{equipment.type}</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.infoCard}>
          <Ionicons name="information-circle" size={24} color="#3d9d75" style={styles.icon} />
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTitle}>Tool Info</Text>
            <Text style={styles.infoText}>
              {equipment.description || 'No description available.'}
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
  imageFallback: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginVertical: 60,
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
    flexDirection: 'row', 
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  icon: {
    marginRight: 10, 
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
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 16,
    color: '#333',
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
