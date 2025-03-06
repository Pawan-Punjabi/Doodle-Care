import React from 'react';
import { StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const ProfileScreen = () => {
  const router = useRouter();

  const handleImagePress = () => {
    router.push('/'); // Navigates back to index.tsx
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.fullScreenTouchable} onPress={handleImagePress} activeOpacity={1}>
        <Image 
          source={require('../assets/images/Account.png')} 
          style={styles.fullImage} 
          resizeMode="cover"
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  fullScreenTouchable: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: width,
    height: height,
    marginTop: 50, // Moved the image slightly down
  },
});

export default ProfileScreen;
