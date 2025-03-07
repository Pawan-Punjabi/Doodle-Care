import { View, Text, StyleSheet, Image, ScrollView, Dimensions, StatusBar } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const { height: screenHeight } = Dimensions.get("window")

const YogaApp = () => {

  const sectionHeight = screenHeight / 4

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar translucent backgroundColor="transparent" />
      <ScrollView style={styles.scrollView} snapToInterval={sectionHeight} decelerationRate="fast">
        {/* Sarvangasana Section */}
        <View style={[styles.sectionContainer, styles.sarvangasanaSection, { height: sectionHeight }]}>
          <View style={styles.textContainer}>
            <Text style={styles.poseTitle}>Sarvangasana</Text>
            <Text style={styles.poseSubtitle}>Shoulderstand</Text>
            <Text style={styles.poseDescription}>
              A dynamic inversion of 3 minutes that strengthens the core and spine while increasing blood flow to the
              brain and face.
            </Text>
          </View>
          <Image source={require("../assets/images/asan1.png")} style={styles.poseImage} resizeMode="contain" />
        </View>

        {/* Padahastasana*/}
        <View style={[styles.sectionContainer, styles.padahastasanaSection, { height: sectionHeight }]}>
          <View style={styles.textContainer}>
            <Text style={styles.poseTitle}>Padahastasana</Text>
            <Text style={styles.poseSubtitle}>Standing Forward Bend</Text>
            <Text style={styles.poseDescription}>
              Stretch your hamstrings and spine while strengthening your legs. Keep your back flat and reach for a soft,
              even bend.
            </Text>
          </View>
          <Image source={require("../assets/images/asan2.png")} style={styles.poseImage} resizeMode="contain" />
        </View>

        {/* Matsyasana */}
        <View style={[styles.sectionContainer, styles.matsyasanaSection, { height: sectionHeight }]}>
          <View style={styles.textContainer}>
            <Text style={styles.poseTitle}>Matsyasana</Text>
            <Text style={styles.poseSubtitle}>Fish</Text>
            <Text style={styles.poseDescription}>
              Boost your strength and endurance by opening the chest and hips. Counterpose to shoulderstand for a
              balanced practice.
            </Text>
          </View>
          <Image source={require("../assets/images/asan3.png")} style={styles.poseImage} resizeMode="contain" />
        </View>

        {/* Halasana */}
        <View style={[styles.sectionContainer, styles.halasanaSection, { height: sectionHeight }]}>
          <View style={styles.textContainer}>
            <Text style={styles.poseTitle}>Halasana</Text>
            <Text style={styles.poseSubtitle}>Plough</Text>
            <Text style={styles.poseDescription}>
              A calming inversion that stretches the spine and shoulders while reducing stress and fatigue.
            </Text>
          </View>
          <Image source={require("../assets/images/asan4.png")} style={styles.poseImage} resizeMode="contain" />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  sectionContainer: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  sarvangasanaSection: {
    backgroundColor: "#ffd6e6",
  },
  padahastasanaSection: {
    backgroundColor: "#d6f5e3",
  },
  matsyasanaSection: {
    backgroundColor: "#d6e6ff",
  },
  halasanaSection: {
    backgroundColor: "#ffe9cc",
  },
  textContainer: {
    flex: 1,
    paddingRight: 15,
  },
  poseTitle: {
    fontSize: 24,  
    fontWeight: "600",
    fontFamily: "System",  
  },
  poseSubtitle: {
    fontSize: 16, 
    marginBottom: 8,
    fontFamily: "System",
    color: "#555", 
  },
  poseDescription: {
    fontSize: 14, 
    lineHeight: 22, 
    fontFamily: "System",
    color: "#444",
  },
  poseImage: {
    width: 100,
    height: 100,
  },
})

export default YogaApp