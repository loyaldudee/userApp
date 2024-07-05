import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import Navbar from './Components/Navbar';
const App = () => {
  const [screen, setScreen] = useState('register'); // Possible values: 'register', 'login', 'verifyOTP', 'home'
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOTP] = useState('');
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check for token on initial load (simulating auto-login)
    const storedToken = ''; // Fetch token from wherever it's stored (e.g., AsyncStorage or elsewhere)
    if (storedToken) {
      setToken(storedToken);
      setScreen('home');
    }
  }, []);

  const handleRegister = async () => {
    try {
      const response = await fetch('http://192.168.68.248:3000/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, phoneNumber, password }),
      });

      if (response.status === 200) {
        setScreen('verifyOTP'); // Move to OTP verification screen
        Alert.alert('Registration successful', 'Please verify your phone number using OTP sent to your phone number');
      } else {
        Alert.alert('Registration failed', 'Unknown error occurred');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      Alert.alert('Registration failed', 'An error occurred during registration');
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.68.248:3000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      setToken(data.token); // Save token to state (not storing in AsyncStorage in this example)
      setScreen('home'); // Move to home screen after successful login
      Alert.alert('Login successful', 'Welcome!');
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('Login failed', 'An error occurred during login');
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const response = await fetch('http://192.168.68.248:3000/user/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber, otp }),
      });

      if (response.status === 200) {
        Alert.alert('OTP verified', 'Phone number verified successfully');
        setScreen('home'); // Move to home screen after OTP verification
      } else {
        Alert.alert('OTP verification failed', 'Invalid OTP entered');
      }
    } catch (error) {
      console.error('Error during OTP verification:', error);
      Alert.alert('OTP verification failed', 'An error occurred during OTP verification');
    }
  };

  const handleLogout = () => {
    setToken(null); // Clear token from state
    setScreen('login'); // Move to login screen after logout
  };

  const renderScreen = () => {
    switch (screen) {
      case 'register':
        return (
          <View style={styles.container}>
            <Text style={styles.header}>Register</Text>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <Button title="Register" onPress={handleRegister} />
            <Text style={styles.toggleText} onPress={() => setScreen('login')}>
              Already have an account? Login
            </Text>
          </View>
        );
      case 'login':
        return (
          <View style={styles.container}>
            <Text style={styles.header}>Login</Text>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <Button title="Login" onPress={handleLogin} />
            <Text style={styles.toggleText} onPress={() => setScreen('register')}>
              Don't have an account? Register
            </Text>
          </View>
        );
      case 'verifyOTP':
        return (
          <View style={styles.container}>
            <Text style={styles.header}>Verify OTP</Text>
            <TextInput
              style={styles.input}
              placeholder="OTP"
              value={otp}
              onChangeText={setOTP}
              keyboardType="numeric"
            />
            <Button title="Verify OTP" onPress={handleVerifyOTP} />
          </View>
        );
      case 'home':
        return (
          <View >
            <Navbar /> 
            {/* <Text style={styles.header}>Home</Text>
            <Text style={styles.text}>Welcome, {username}!</Text>
            <Button title="Profile" onPress={() => Alert.alert('Profile', 'View profile functionality to be implemented')} />
            <Button title="Logout" onPress={handleLogout} /> */}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {renderScreen()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  navbar:{
    flex:1,
    position: 'absolute',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },

  header: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  toggleText: {
    marginTop: 16,
    color: 'blue',
    textAlign: 'center',
  },
});

export default App;
