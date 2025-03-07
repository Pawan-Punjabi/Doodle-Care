import React, { useRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const images = [
  require('../assets/images/carousel1.png'),
  require('../assets/images/carousel2.png'),
];

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  const router = useRouter();
  const [currentImage, setCurrentImage] = useState(0);
  const scrollRef = useRef<ScrollView>(null); // specify the type here

  useEffect(() => {
    const timer = setInterval(() => {
      const nextImage = (currentImage + 1) % images.length;
      setCurrentImage(nextImage);
      scrollRef.current?.scrollTo({
        x: nextImage * width,
        animated: true,
      });
    }, 5000); // Change image every 3 seconds

    return () => clearInterval(timer); // Clear interval on unmount
  }, [currentImage]);

  const handleScroll = (event: any) => {
    const x = event.nativeEvent.contentOffset.x;
    const imageIndex = Math.round(x / width);
    setCurrentImage(imageIndex);
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* Carousel */}
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={200}
        style={styles.carouselContainer}
      >
        {images.map((image, index) => (
          <Image key={index} source={image} style={styles.carouselImage} />
        ))}
      </ScrollView>

      {/* Profile Button */}
      <TouchableOpacity
        onPress={() => router.push('/profile')}
        style={styles.profileButton}
      >
           <View style={styles.profileButtonBackground}>
        <Image
          source={require('../assets/images/profile_icon.png')} // Replace with your profile icon
          style={styles.profileIcon}
        />
      </View>
      </TouchableOpacity>

      {/* Welcome Text */}
      <Text style={styles.welcomeText}>
        Welcome, <Text style={styles.boldText}>User</Text>
      </Text>

      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/adventure')}>
          <Image source={require('../assets/images/adventure_icon.png')} style={styles.icon} />
          <Text>Adventure</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/todo')}>
          <Image source={require('../assets/images/todo_icon.png')} style={styles.icon} />
          <Text>To-Do List</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/yoga')}>
          <Image source={require('../assets/images/yoga_icon.png')} style={styles.icon} />
          <Text>Yoga</Text>
        </TouchableOpacity>
      </View>

      {/* Books Library Button */}
      <TouchableOpacity style={styles.libraryButton} onPress={() => router.push('/books')}>
        <Text style={styles.libraryButtonText}>‎ ‎ ‎ ‎ ‎ Books Library</Text>
        <Image
          source={require('../assets/images/arrow_right.png')} // Replace with your arrow icon
          style={styles.arrowIcon}
        />
      </TouchableOpacity>

      {/* Jar of Memories Button */}
      <TouchableOpacity style={styles.memoriesButton} onPress={() => router.push('/jar')}>
        <Text style={styles.memoriesButtonText}>‎ ‎ ‎ ‎ ‎ Achieve</Text>
        <View style={styles.imageContainer}>
        <Image source={require('../assets/images/jar_icon.png')} style={styles.jarIcon}/>
        </View>
        <Image source={require('../assets/images/arrow_right.png')} style={styles.arrowIcon} />
      </TouchableOpacity>

      {/* Daily Quote */}
      <View style={styles.quoteContainer}>
        <Text style={styles.quoteText}>
          <Text style={styles.boldText}>Today's Quote</Text>  
          {'\n'}A wagging tail is contagious—share your joy and feel it grow.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  carouselContainer: {
    width: width,
    height: 284,
  },
  carouselWrapper: {  //The container well scale it and can see to the sides, top, bottom to fix it
    position: 'relative',
    marginTop: 20,   //If not well you can give well scale
},
  carouselImage: {
    width: width,
    height: 284,
  },
  profileButton: {
    position: 'absolute',
    top: 40,  //Scale  tag value in order to move down or you push the value
    right: 20,    // where is pushed right
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileButtonBackground: {
    backgroundColor: 'white',
    width: 45,
    height: 45,
    borderRadius: 27.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileIcon: {
    width: 35,
    height: 35,
    borderRadius: 22.5,
  },
  welcomeText: {
    fontSize: 30,
    marginTop: 20,
    width: '90%',   //added to align left text
    textAlign: 'left' , //added to align left text
    padding: 3
  },
  boldText: {
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '95%', // Expand to 90% of the screen width
    height: 100,
    marginTop: 20,
  },
  iconButton: {
    backgroundColor: '#AAD7F2',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',  //added
    flex: 1,      //added
    marginHorizontal: 5,   //added
  },
  icon: {
    width: 40,
    height: 40,
  },
  libraryButton: {
    backgroundColor: '#FCDDEC',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    width: '90%', // Adjusted width
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  libraryButtonText: {
    fontSize: 16,
  },
  memoriesButton: {
    backgroundColor: '#FCDDEC',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    width: '90%', // Adjusted width
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  memoriesButtonText: {
    fontSize: 16,
  },
  imageContainer: {
    width: 30,    // Adjusted width for image size (The height and width should be same)
    height: 30,   // Adjusted height for image size (The height and width should be same)
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 30,
  },
  jarIcon: {
    width: 100,
    height: 100,
  },
  arrowIcon: {
    width: 20,
    height: 20,
  },
  quoteContainer: {
    backgroundColor: '#EAFCDD',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    width: '90%', // Adjusted width
    alignItems: 'center',
  },
  quoteText: {
    fontStyle: 'italic',
    textAlign: 'center',
  },
  tabBar: {
    backgroundColor: '#7DCBED',
    height: 101,
  },
  tabBarIcon: {
    width: 30,
    height: 30,
  },
});

export default HomeScreen;