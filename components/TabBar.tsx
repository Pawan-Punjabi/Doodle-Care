import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter, usePathname } from 'expo-router';

type RouteType = '/' | '/camera' | '/happy' | '/settings' | '/profile' | '/adventure' | '/todo' | '/yoga' | '/books' | '/jar'; // Define allowed route types

const TabBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    {
      route: '/',
      icon: require('../assets/images/home_icon.png'),
      activeIcon: require('../assets/images/home_active_icon.png'),
    },
    {
      route: '/camera',
      icon: require('../assets/images/camera_icon.png'),
      activeIcon: require('../assets/images/camera_active_icon.png'),
    },
    {
      route: '/happy',
      icon: require('../assets/images/smile_icon.png'),
      activeIcon: require('../assets/images/smile_active_icon.png'),
    },
    {
      route: '/settings',
      icon: require('../assets/images/settings_icon.png'),
      activeIcon: require('../assets/images/settings_active_icon.png'),
    },
  ];

  return (
    <View style={styles.tabBar}>
      {tabs.map((tab, index) => {
        const isActive = tab.route === pathname;
        return (
          <TouchableOpacity
            key={index}
            style={styles.navButton}
            onPress={() => router.push(tab.route as RouteType)}
          >
            <Image
              source={isActive ? tab.activeIcon : tab.icon}
              style={styles.navIcon}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#AAD7F2',
    paddingVertical: 15,
    width: '100%',
  },
  navButton: {
    alignItems: 'center',
  },
  navIcon: {
    width: 30,
    height: 30,
  },
});

export default TabBar;