import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Platform,
} from 'react-native';
import { CameraType, useCameraPermissions, PermissionStatus, CameraView} from 'expo-camera';

interface CameraPageProps {}

const CameraPage: React.FC<CameraPageProps> = () => {
  const [type, setType] = useState<CameraType>('back');
  const [permissionInfo, requestPermission] = useCameraPermissions();
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    (async () => {
      if (permissionInfo?.status === PermissionStatus.UNDETERMINED) {
        await requestPermission();
      }
      setHasPermission(permissionInfo?.status === PermissionStatus.GRANTED);
    })();
  }, [permissionInfo]);

  if (permissionInfo?.status === PermissionStatus.DENIED) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button title="Grant permission" onPress={requestPermission} />
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setType(current => (current === 'back' ? 'front' : 'back'));
  };

  return (
    <View style={styles.container}>
      {hasPermission && (
        <CameraView style={styles.camera} facing={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});

export default CameraPage;