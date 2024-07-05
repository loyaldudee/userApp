import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity,Image } from 'react-native';

const App = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
      <TouchableOpacity style={styles.toggleButton} onPress={toggleSidebar}>
          Open 
        </TouchableOpacity>
      </View>
      {/* Sidebar */}
      {isSidebarVisible && (
        <View style={styles.sidebar}>
          <Text style={styles.sidebarItem}>Home</Text>
          <Text style={styles.sidebarItem}>Profile</Text>
          <Text style={styles.sidebarItem}>Nearby</Text>
          <Text style={styles.sidebarItem}>Bookmark</Text>
          <Text style={styles.sidebarItem}>Notification</Text>
          <Text style={styles.sidebarItem}>Message</Text>
          <Text style={styles.sidebarItem}>Setting</Text>
          <Text style={styles.sidebarItem}>Help</Text>
          <Text style={styles.sidebarItem}>Logout</Text>
        </View>
      )}

      {/* Main Content */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    position: 'absolute', 
    top: 0, 
    right: 0,
    width: 250,
    backgroundColor: '#007AFF',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  sidebarItem: {
    color: '#fff',
    fontSize: 18,
    paddingVertical: 10,
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    zIndex: 3,
  },
  toggleButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    margin: 10,
  },
  toggleButtonImage: {
    width: 30,
    height: 30,
  },
});

export default App;
