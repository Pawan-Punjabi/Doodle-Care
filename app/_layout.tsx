import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import TabBar from '../components/TabBar'; // Import TabBar

const Layout = () => {
  return (
    <SafeAreaProvider>
      <StatusBar hidden={true} />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="camera" options={{ headerShown: false }} />
        <Stack.Screen name="happy" options={{ headerShown: false }} />
        <Stack.Screen name="settings" options={{ headerShown: false }} />
        <Stack.Screen name="profile" options={{ headerShown: false }} />
        <Stack.Screen name="adventure" options={{ headerShown: false }} />
        <Stack.Screen name="todo" options={{ headerShown: false }} />
        <Stack.Screen name="yoga" options={{ headerShown: false }} />
        <Stack.Screen name="books" options={{ headerShown: false }} />
        <Stack.Screen name="jar" options={{ headerShown: false }} />
      </Stack>
      <TabBar /> {/* Add TabBar here */}
    </SafeAreaProvider>
  );
};

export default Layout;