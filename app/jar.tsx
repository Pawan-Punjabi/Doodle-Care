import React, { useState } from 'react';
import { 
  View, 
  Text,

  TouchableOpacity, 
  Modal, 
  TextInput, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView,
  StatusBar
} from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';

interface Achievement {
  id: string;
  title: string;
  days: number;
  completionDate: Date;
  reminderTime: string;
  progress: number;
}

const jar: React.FC = () => {
  // Empty achievements array - user will add their own
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  const [showPopup, setShowPopup] = useState(false);
  const [newAchievement, setNewAchievement] = useState({
    title: '',
    days: 7,
    reminderTime: '8am'
  });

  const calculateDaysRemaining = (completionDate: Date): string => {
    const now = new Date();
    const diffTime = completionDate.getTime() - now.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    return `${diffDays} Days ${diffHours} hrs`;
  };

  const handleAddAchievement = () => {
    if (!newAchievement.title.trim()) return;
    
    const completionDate = new Date();
    completionDate.setDate(completionDate.getDate() + newAchievement.days);
    
    const achievement: Achievement = {
      id: Date.now().toString(),
      title: newAchievement.title,
      days: newAchievement.days,
      completionDate,
      reminderTime: newAchievement.reminderTime,
      progress: 0
    };
    
    setAchievements([...achievements, achievement]);
    setNewAchievement({ title: '', days: 7, reminderTime: '8am' });
    setShowPopup(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {achievements.map(achievement => (
          <View key={achievement.id} style={styles.card}>
            <Text style={styles.cardTitle}>{achievement.title}</Text>
            <Text style={styles.reminderText}>Reminder: {achievement.reminderTime}</Text>
            <View style={styles.cardFooter}>
              <Text style={styles.daysText}>Days to Go : {calculateDaysRemaining(achievement.completionDate)}</Text>
              <View style={styles.progressContainer}>
                <Svg height="50" width="50" viewBox="0 0 50 50">
                  <Circle
                    cx="25"
                    cy="25"
                    r="20"
                    stroke="#E0E0E0"
                    strokeWidth="3"
                    fill="transparent"
                  />
                  <Circle
                    cx="25"
                    cy="25"
                    r="20"
                    stroke="#8B5CF6"
                    strokeWidth="3"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 20}
                    strokeDashoffset={2 * Math.PI * 20 * (1 - achievement.progress / 100)}
                    strokeLinecap="round"
                  />
                </Svg>
                <Text style={styles.progressText}>{achievement.progress}%</Text>
              </View>
            </View>
          </View>
        ))}

        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setShowPopup(true)}
        >
          <Text style={styles.plusIcon}>+</Text>
          <Text style={styles.addButtonText}>Add Something to Achieve</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={showPopup}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Achievement</Text>
            
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>What do you want to achieve?</Text>
              <TextInput
                style={styles.textInput}
                value={newAchievement.title}
                onChangeText={(text) => setNewAchievement({...newAchievement, title: text})}
                placeholder="Enter your goal"
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Time to complete</Text>
              <View style={styles.optionsRow}>
                {[7, 14, 30].map(day => (
                  <TouchableOpacity
                    key={day}
                    style={[
                      styles.optionButton,
                      newAchievement.days === day && styles.selectedOption
                    ]}
                    onPress={() => setNewAchievement({...newAchievement, days: day})}
                  >
                    <Text 
                      style={[
                        styles.optionText,
                        newAchievement.days === day && styles.selectedOptionText
                      ]}
                    >
                      {day} days
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Notification time</Text>
              <View style={styles.timePicker}>
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.timePickerContent}
                >
                  {Array.from({length: 24}, (_, i) => {
                    const hour = i;
                    const ampm = hour >= 12 ? 'pm' : 'am';
                    const hour12 = hour % 12 || 12;
                    const time = `${hour12}${ampm}`;
                    return (
                      <TouchableOpacity
                        key={time}
                        style={[
                          styles.timeOption,
                          newAchievement.reminderTime === time && styles.selectedTimeOption
                        ]}
                        onPress={() => setNewAchievement({...newAchievement, reminderTime: time})}
                      >
                        <Text 
                          style={[
                            styles.timeOptionText,
                            newAchievement.reminderTime === time && styles.selectedTimeOptionText
                          ]}
                        >
                          {time}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
            </View>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowPopup(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addActionButton}
                onPress={handleAddAchievement}
              >
                <Text style={styles.addActionButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 80, // Space for nav bar
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    marginTop: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  reminderText: {
    fontSize: 12,
    color: '#666666',
    marginTop: 4,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  daysText: {
    fontSize: 12,
    color: '#333333',
  },
  progressContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    position: 'absolute',
    fontSize: 12,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#000000',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 12,
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  plusIcon: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginRight: 8,
  },
  addButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  navBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#87CEEB',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
  },
  navButton: {
    padding: 8,
  },
  navButtonActive: {
    padding: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000000',
  },
  formGroup: {
    marginBottom: 16,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333333',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionButton: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#8B5CF6',
  },
  optionText: {
    color: '#333333',
    fontSize: 14,
  },
  selectedOptionText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  timePicker: {
    height: 50,
  },
  timePickerContent: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  timeOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 16,
    backgroundColor: '#F0F0F0',
  },
  selectedTimeOption: {
    backgroundColor: '#8B5CF6',
  },
  timeOptionText: {
    color: '#333333',
  },
  selectedTimeOptionText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  cancelButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    marginRight: 8,
  },
  cancelButtonText: {
    color: '#333333',
  },
  addActionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#8B5CF6',
    borderRadius: 8,
  },
  addActionButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default jar;