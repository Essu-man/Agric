import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const PrivacyPolicy = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Privacy Policy for AgriRent</Text>
      <Text style={styles.date}>Effective Date: 2024</Text>

      <Text style={styles.sectionTitle}>1. Introduction</Text>
      <Text style={styles.text}>
        This Privacy Policy explains how AgriRent ("we," "us," or "our") collects, uses, and discloses information about you when you use our mobile application for agricultural equipment rental.
      </Text>

      <Text style={styles.sectionTitle}>2. Information We Collect</Text>
      <Text style={styles.text}>
        - Personal Information: We may collect personal information such as your name, email address, phone number, and location when you create an account or use our services.
      </Text>
      <Text style={styles.text}>
        - Usage Data: We may collect information about how you access and use the App, including your device information, IP address, and usage patterns.
      </Text>

      <Text style={styles.sectionTitle}>3. How We Use Your Information</Text>
      <Text style={styles.text}>
        We may use your information for the following purposes:
      </Text>
      <Text style={styles.text}>
        - To provide and maintain our services.
        - To communicate with you, including sending notifications and updates.
        - To process transactions and manage your account.
        - To improve our App and develop new features.
        - To analyze usage trends and enhance user experience.
        - To comply with legal obligations.
      </Text>

      <Text style={styles.sectionTitle}>4. Sharing Your Information</Text>
      <Text style={styles.text}>
        We do not sell or rent your personal information to third parties. We may share your information with service providers who assist us in operating the App, with law enforcement or regulatory authorities as required by law, and in connection with a business transfer or merger.
      </Text>

      <Text style={styles.sectionTitle}>5. Data Security</Text>
      <Text style={styles.text}>
        We take reasonable measures to protect your information from unauthorized access, use, or disclosure. However, no method of transmission over the internet or electronic storage is 100% secure.
      </Text>

      <Text style={styles.sectionTitle}>6. Your Rights</Text>
      <Text style={styles.text}>
        You have the right to access and update your personal information, request the deletion of your information, and withdraw consent to our processing of your information.
      </Text>

      <Text style={styles.sectionTitle}>7. Changes to This Privacy Policy</Text>
      <Text style={styles.text}>
        We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy in the App.
      </Text>

      <Text style={styles.sectionTitle}>8. Contact Us</Text>
      <Text style={styles.text}>
        If you have any questions or concerns about this Privacy Policy, please contact us at support@yourapp.com.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  date: {
    fontSize: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default PrivacyPolicy;
