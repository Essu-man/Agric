import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert, Image, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

// Images with fallback
const defaultImage = 'https://via.placeholder.com/65x60?text=No+Image';
const images = {
  Tractors: 'https://firebasestorage.googleapis.com/v0/b/my-agrirent.appspot.com/o/cat.tractor.jpg?alt=media&token=3fa44470-5dd9-4fae-a844-9d284fdfe60a',
  Harvesters: 'https://firebasestorage.googleapis.com/v0/b/my-agrirent.appspot.com/o/cat.harvester.jpg?alt=media&token=910c8753-097f-4e1f-b3c7-1d747180520c',
  Balers: 'https://firebasestorage.googleapis.com/v0/b/my-agrirent.appspot.com/o/cat.Baler.png?alt=media&token=dcdfdfa2-643d-409b-a732-293b021698e1',
  Plows: 'https://firebasestorage.googleapis.com/v0/b/my-agrirent.appspot.com/o/cat.plow.png?alt=media&token=b2484ed2-2769-435d-8226-b93eb0a812e9',
  Sprayers: 'https://firebasestorage.googleapis.com/v0/b/my-agrirent.appspot.com/o/cat.sprayer.png?alt=media&token=846473e1-fabc-4e9f-9b59-7f6237e478cd',
  Cultivators: 'https://firebasestorage.googleapis.com/v0/b/my-agrirent.appspot.com/o/cat.Cultivators.png?alt=media&token=a159b009-7bae-4dad-acdf-8a80126536a9',
};

const typeImages = {
  'Utility Tractor': 'https://firebasestorage.googleapis.com/v0/b/my-agrirent.appspot.com/o/Tractor%2Futility-tractor.png?alt=media&token=1dbb45b2-f99c-40ee-9f6d-707ec3da6d5b',
  'Raw Crop Tractor': 'https://firebasestorage.googleapis.com/v0/b/my-agrirent.appspot.com/o/Tractor%2FRaw-Crop-tractor.png?alt=media&token=6ec06ba2-324b-420a-a0a6-5250f377dcf9',
  'Compact Tractor': 'https://firebasestorage.googleapis.com/v0/b/my-agrirent.appspot.com/o/Tractor%2FCompact-tractor.png?alt=media&token=a442ec56-2444-4734-8c7a-71e8a2c3c7f5',
  'Combine Harvester': 'https://firebasestorage.googleapis.com/v0/b/my-agrirent.appspot.com/o/Harvester%2FCombine%20Harvester.png?alt=media&token=003fb05f-b58a-4b2f-ada5-6d7b700b924c',
  'Forage Harvester': 'https://firebasestorage.googleapis.com/v0/b/my-agrirent.appspot.com/o/Harvester%2FForage.png?alt=media&token=3450406f-25b3-4d75-a5ba-296b65df0544',
};

const OrderDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedCategory, selectedType, baseCostPerDay = 0, location } = route.params;
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [totalCost, setTotalCost] = useState(0);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [isPickup, setIsPickup] = useState(true);
  const [address, setAddress] = useState('');
  const [savedAddress, setSavedAddress] = useState('');

  useEffect(() => {
    if (startDate && endDate) {
      const start = moment(startDate);
      const end = moment(endDate);
      const numberOfDays = end.diff(start, 'days') + 1;
      const newTotalCost = numberOfDays * baseCostPerDay;
      setTotalCost(newTotalCost.toFixed(2));
    }
  }, [startDate, endDate, baseCostPerDay]);

  useEffect(() => {
    if (route.params?.selectedAddress) {
      setSavedAddress(route.params.selectedAddress);
    }
  }, [route.params?.selectedAddress]);

  const handleDateChange = (event, selectedDate, type) => {
    const currentDate = selectedDate || new Date();
    if (type === 'start') {
      setShowStartPicker(false);
      setStartDate(moment(currentDate).format('YYYY-MM-DD'));
    } else if (type === 'end') {
      setShowEndPicker(false);
      setEndDate(moment(currentDate).format('YYYY-MM-DD'));
    }
  };

  const handleConfirmOrderPress = () => {
    if (startDate && endDate) {
      if (isPickup || (!isPickup && (address || savedAddress))) {
        navigation.navigate('Payment', {
          totalCost,
          email: 'essumanconstance514@gmail.com', 
        });
      } else {
        Alert.alert('Error', 'Please enter your delivery address.');
      }
    } else {
      Alert.alert('Error', 'Please select both start and end dates.');
    }
  };
   

  const formatDate = (date) => {
    return moment(date).format('D MMMM YYYY');
  };

  const equipmentImage = typeImages[selectedType] || defaultImage;

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>

      <View style={styles.headerContainer}>
        <Text style={styles.orderSummaryTitle}>Order Summary</Text>
      </View>

      <View style={styles.orderDetailsContainer}>
        <Text style={styles.sectionTitle}>Selected Equipment</Text>
        <View style={styles.equipmentContainer}>
          <Image source={{ uri: equipmentImage }} style={styles.equipmentImage} />
          <View style={styles.equipmentInfo}>
            <Text style={styles.detailText}>{selectedCategory} - {selectedType}</Text>
            <Text style={styles.equipmentCost}>Cost: {baseCostPerDay} GHS per day</Text>
          </View>
        </View>
      </View>

      <View style={styles.orderDetailsContainer}>
        <Text style={styles.sectionTitle}>Location</Text>
        <View style={styles.locationContainer}>
          <Ionicons name="location-sharp" size={20} color="#FF6347" />
          <Text style={styles.locationText}>{location}</Text>
        </View>
      </View>

      <View style={styles.orderDetailsContainer}>
        <Text style={styles.sectionTitle}>Pickup or Delivery</Text>
        <View style={styles.toggleContainer}>
          <TouchableOpacity style={styles.radioContainer} onPress={() => setIsPickup(true)}>
            <Ionicons name={isPickup ? 'radio-button-on' : 'radio-button-off'} size={20} color="#3d9d75" />
            <Text style={styles.radioText}>Pickup</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.radioContainer} onPress={() => setIsPickup(false)}>
            <Ionicons name={!isPickup ? 'radio-button-on' : 'radio-button-off'} size={20} color="#3d9d75" />
            <Text style={styles.radioText}>Delivery</Text>
          </TouchableOpacity>
        </View>
        {!isPickup && (
          <>
            <TextInput
              style={styles.addressInput}
              placeholder="Enter Delivery Address"
              value={address}
              onChangeText={setAddress}
            />
            <TouchableOpacity
              style={styles.manageAddressButton}
              onPress={() => navigation.navigate('Address')}
            >
              <Text style={styles.manageAddressText}>Manage Addresses</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <View style={styles.orderDetailsContainer}>
        <Text style={styles.sectionTitle}>Select Start Date</Text>
        <TouchableOpacity style={styles.dateButton} onPress={() => setShowStartPicker(true)}>
          <Text style={styles.dateText}>{startDate ? formatDate(startDate) : 'Select Start Date'}</Text>
        </TouchableOpacity>
        {showStartPicker && (
          <DateTimePicker
            value={new Date(startDate || Date.now())}
            mode="date"
            display="default"
            onChange={(event, date) => handleDateChange(event, date, 'start')}
          />
        )}
      </View>

      <View style={styles.orderDetailsContainer}>
        <Text style={styles.sectionTitle}>Select End Date</Text>
        <TouchableOpacity style={styles.dateButton} onPress={() => setShowEndPicker(true)}>
          <Text style={styles.dateText}>{endDate ? formatDate(endDate) : 'Select End Date'}</Text>
        </TouchableOpacity>
        {showEndPicker && (
          <DateTimePicker
            value={new Date(endDate || Date.now())}
            mode="date"
            display="default"
            onChange={(event, date) => handleDateChange(event, date, 'end')}
          />
        )}
      </View>

      <View style={styles.orderSummaryContainer}>
        <Text style={styles.totalCostText}>Total Cost: {totalCost} GHS</Text>
      </View>

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmOrderPress}>
        <Text style={styles.confirmButtonText}>Confirm Order</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  backButton: {
    marginBottom: 20,
  },
  headerContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  orderSummaryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  orderDetailsContainer: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#FFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  equipmentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  equipmentImage: {
    width: 65,
    height: 60,
    borderRadius: 4,
    marginRight: 10,
  },
  equipmentInfo: {
    flex: 1,
  },
  detailText: {
    fontSize: 16,
    color: '#333',
  },
  equipmentCost: {
    fontSize: 16,
    color: '#666',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  addressInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  manageAddressButton: {
    padding: 10,
    backgroundColor: '#3d9d75',
    borderRadius: 8,
    alignItems: 'center',
  },
  manageAddressText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateButton: {
    padding: 10,
    backgroundColor: '#3d9d75',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  dateText: {
    color: '#fff',
    fontSize: 16,
  },
  orderSummaryContainer: {
    padding: 16,
    backgroundColor: '#FFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  totalCostText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  confirmButton: {
    padding: 15,
    backgroundColor: '#3d9d75',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OrderDetails;
