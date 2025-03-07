import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Switch, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router'; // Import router from expo-router
import Svg, { Path } from 'react-native-svg';

// Define the props type for MenuItem component
type MenuItemProps = {
  icon: React.ReactNode;
  title: string;
  hasChevron?: boolean;
  hasSwitch?: boolean;
};

const ProfileScreen = () => {
  const [isReminderEnabled, setIsReminderEnabled] = React.useState(true);

  const toggleSwitch = () => {
    setIsReminderEnabled(previousState => !previousState);
  };

  const handleBackPress = () => {
    // Use router.push to navigate to the index page
    router.push('/');
  };

  // Add type annotation to the MenuItem component
  const MenuItem: React.FC<MenuItemProps> = ({ icon, title, hasChevron = true, hasSwitch = false }) => (
    <TouchableOpacity style={styles.menuItem}>
      <View style={styles.menuItemLeft}>
        {icon}
        <Text style={styles.menuItemText}>{title}</Text>
      </View>
      {hasSwitch ? (
        <Switch
          trackColor={{ false: '#D1D1D6', true: '#2196F3' }}
          thumbColor={'#FFFFFF'}
          onValueChange={toggleSwitch}
          value={isReminderEnabled}
        />
      ) : hasChevron ? (
        <Ionicons name="chevron-forward" size={24} color="#CCCCCC" />
      ) : null}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            {/* Use the corgi image as profile picture */}
            <Image 
              source={require('../assets/images/corgi_profile.png')} 
              style={styles.avatar} 
              resizeMode="contain"
            />
          </View>
          <Text style={styles.profileName}>Admin</Text>
        </View>
        
        <View style={styles.menuContainer}>
          <MenuItem 
            icon={<Ionicons name="person-outline" size={24} color="black" style={styles.menuIcon} />} 
            title="Account" 
          />
          <MenuItem 
            icon={<Ionicons name="information-circle-outline" size={24} color="black" style={styles.menuIcon} />} 
            title="Personal information" 
          />
          <MenuItem 
            icon={<Feather name="bell" size={24} color="black" style={styles.menuIcon} />} 
            title="Reminders" 
            hasChevron={false}
            hasSwitch={true}
          />
          <MenuItem 
            icon={<Ionicons name="star-outline" size={24} color="black" style={styles.menuIcon} />} 
            title="Rate App" 
          />
          <MenuItem 
            icon={<Ionicons name="headset-outline" size={24} color="black" style={styles.menuIcon} />} 
            title="Contact Support" 
          />
          <MenuItem 
            icon={<MaterialIcons name="format-list-bulleted" size={24} color="black" style={styles.menuIcon} />} 
            title="Terms Of Use" 
          />
          <MenuItem 
            icon={<Feather name="edit" size={24} color="black" style={styles.menuIcon} />} 
            title="Privacy Policy" 
          />
        </View>
      </ScrollView>
      
      {/* Background wave */}
      
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    zIndex: 1,
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#4169E1',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatar: {
    width: 100,
    height: 100,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  menuContainer: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    marginRight: 15,
  },
  menuItemText: {
    fontSize: 16,
  },
  backgroundWaveContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.6,
    zIndex: 0,
  },
  backgroundWave: {
    position: 'absolute',
    bottom: 0,
  },
});

export default ProfileScreen;