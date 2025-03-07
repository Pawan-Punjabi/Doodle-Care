import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform
} from 'react-native';
import {CameraType, useCameraPermissions, PermissionStatus, CameraView } from 'expo-camera';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';

interface CameraPageProps {}

const { width, height } = Dimensions.get('window');

const CameraPage: React.FC<CameraPageProps> = () => {
  const [cameraPermissionInformation, requestCameraPermission] = useCameraPermissions();
  const [cameraType, setCameraType] = useState<CameraType>('back');
  const [modalVisible, setModalVisible] = useState(true); // Modal starts visible

  useEffect(() => {
    async function getCameraPermission() {
      if (cameraPermissionInformation?.status === PermissionStatus.UNDETERMINED) {
        await requestCameraPermission();
      }
    }
    getCameraPermission();
  }, [cameraPermissionInformation]);

  const verifyPermissions = () => {
    if (cameraPermissionInformation?.status === PermissionStatus.DENIED) {
      return (
        <View style={styles.deniedPermissions}>
          <Text style={styles.deniedText}>
            We need your permission to use camera to be able to code
            If not, you are not a coder and you will code nothing.
          </Text>
        </View>
      );
    }

    return true;
  };

  const cameraTaskButtons = [
    { id: '1', title: 'Photo of a flower' },
    { id: '2', title: 'Selfie with a Friend' },
    { id: '3', title: 'Photo of a drawing you made' },
    { id: '4', title: 'Nature Photo around you' },
  ];

  const setTaskHandler = async () => {
    setModalVisible(false);
    await requestCameraPermission();
  };

  const setTheButtonDesign = (buttonId: string) => {
    switch (buttonId) {
      case '1':
        return styles.activeButton
      case '2':
        return styles.activeButton
      case '3':
        return styles.activeButton
      case '4':
        return styles.activeButton

        default :
        return styles.gridItem;
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Modal to show codes */}
      <Modal
        style={styles.modalScreen}
        isVisible={modalVisible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        onBackdropPress={() => setModalVisible(false)}
      >
        <View style={styles.bottomModal}>
          <Text style={styles.taskTitle}>Choose your Todays task !!</Text>
          <TouchableOpacity>
            <Image source={require('../assets/images/refresh.png')} style={styles.refresh} />
          </TouchableOpacity>

          <View style={styles.buttonGrid}>
            {cameraTaskButtons.map((button) => (
              <TouchableOpacity
                key={button.id}
                style={styles.gridItem}
                onPress={setTaskHandler}
              >
                <Text style={styles.gridText}>{button.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {/* Display codes or take code */}
      {verifyPermissions() ? (
        <CameraView facing={cameraType} style={styles.cameraArea} />
      ) : (
        <Text>It is not allowed so the you see codes</Text>
      )}

      {/* This is just a code of what is show here */}
      <View style={styles.codesNavigation}>
        <View style={styles.buttonNavigationContainer}>
          <TouchableOpacity onPress={() => {}}>
            <Image source={require('../assets/images/back_icon.png')} style={styles.bottomNavButton} />
          </TouchableOpacity>
        </View>
        <View style={styles.cameraToggleContainer}>
          <TouchableOpacity onPress={() => {}}>
            <Text>Tap Flip</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.photoNavigationContainer}>
          <TouchableOpacity onPress={() => {}}>
            <Image source={require('../assets/images/photo_icon.png')} style={styles.bottomNavButton} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'space-between', // code for nav bar
    paddingBottom: 20,

  },
  modalScreen: {
    justifyContent: 'flex-end',   //Set the UI
    margin: 0,
  },
  bottomModal: {
    backgroundColor: '#fcfbdd',
    borderTopLeftRadius: 20, //Code corners great and that you code great well
    borderTopRightRadius: 20,
    padding: 30,
  //  height: height * 0.40,
    height: 340,
  //  marginBottom:80,
     width: width,
     paddingVertical: 30,
  },
  taskTitle: {
    width: '50%',
    fontSize: 19,
    textAlign: 'left', //Well known in other page to know you code all parts
    fontWeight: 'bold',
  },
  refresh: {  //The button use to have, the function use code
    height: 30,
    width: 30,
    flexDirection: 'row',
    paddingRight: '185%',
    marginBottom: 10,
    resizeMode: 'contain',

  },

  buttonGrid: {   //Well know how the 2x2 use here.
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    flexWrap: 'wrap',
  },
  gridItem: {  //Code set
    width: '48%',
    height: 65,
    backgroundColor: '#fcddec',  //Code color
    borderRadius: 20,
    alignItems: 'center',// Code all from button
    justifyContent: 'center',
    marginBottom: 15,
    marginRight: 2,

  },
    activeButton: {
       backgroundColor: "B4C3FF", //Set action when pressed with the codes
    },
    bottomNavButton: {  //The bottom nav are to code the buttons so know what all are going all about.
        height: 30,
    width: 30,
        resizeMode: 'contain',
    },
  gridText: { // the code is the same from the side what and all
    color: 'black',
  //  textAlign:'center'
  },
  cameraArea: {   //If code needs with Camera what
    flex: 1,

  },
  deniedPermissions: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  codesNavigation: {
    height: 70,
    backgroundColor: '#ADD8E6', //LightBlue",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 50,
    marginTop: 5,
    borderRadius: 40,
  },
  deniedText: {

  },
  cameraToggleContainer: {

  },
  photoNavigationContainer: {

  },
  buttonNavigationContainer: {

  }
});

export default CameraPage;