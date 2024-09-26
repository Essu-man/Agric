import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const TermsOfService = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Terms of Service for AgriRent</Text>
      <Text style={styles.date}>Effective Date: 2024</Text>

      <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
      <Text style={styles.text}>
        By accessing or using AgriRent, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use the App.
      </Text>

      <Text style={styles.sectionTitle}>2. Changes to Terms</Text>
      <Text style={styles.text}>
        We may modify these Terms of Service at any time. Your continued use of the App after any changes indicates your acceptance of the new Terms.
      </Text>

      <Text style={styles.sectionTitle}>3. User Accounts</Text>
      <Text style={styles.text}>
        You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
      </Text>

      <Text style={styles.sectionTitle}>4. Rental Transactions</Text>
      <Text style={styles.text}>
        AgriRent provides a platform for users to rent agricultural equipment. All rental agreements are between the renter and the equipment owner. We are not responsible for any disputes between users.
      </Text>

      <Text style={styles.sectionTitle}>5. Limitation of Liability</Text>
      <Text style={styles.text}>
        To the fullest extent permitted by law, AgriRent shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of the App.
      </Text>

      <Text style={styles.sectionTitle}>6. Governing Law</Text>
      <Text style={styles.text}>
        These Terms of Service shall be governed by and construed in accordance with the laws of your jurisdiction, without regard to its conflict of law principles.
      </Text>

      <Text style={styles.sectionTitle}>7. Contact Us</Text>
      <Text style={styles.text}>
        If you have any questions or concerns about these Terms of Service, please contact us at support@yourapp.com.
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
    marginBottom: 30, 
    marginTop: 50,    
  },
  date: {
    fontSize: 16,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default TermsOfService;
