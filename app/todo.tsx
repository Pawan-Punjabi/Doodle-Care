import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';
import Checkbox from 'expo-checkbox';
import { useRouter } from 'expo-router'; // ✅ Import useRouter

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

const STORAGE_KEY = 'todo_tasks';

const TodoScreen = () => {
  const router = useRouter();
  const [isModalVisible, setModalVisible] = useState(true);
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const day = today.toLocaleDateString('en-US', { weekday: 'short' });
    const date = today.getDate();
    setSelectedDate(`${day} ${date}`);

    loadTasks(); // ✅ Load tasks when component mounts
  }, []);

  // ✅ Load tasks from AsyncStorage
  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error('Failed to load tasks:', error);
    }
  };

  // ✅ Save tasks to AsyncStorage
  const saveTasks = async (updatedTasks: Task[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
    } catch (error) {
      console.error('Failed to save tasks:', error);
    }
  };

  // ✅ Add task and save it
  const addTask = () => {
    if (task.trim() !== '') {
      const newTasks = [...tasks, { id: Date.now().toString(), text: task, completed: false }];
      setTasks(newTasks);
      saveTasks(newTasks); // Save to AsyncStorage
      setTask('');
    }
  };

  // ✅ Toggle task completion and save
  const toggleTaskCompletion = (id: string) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks); // Save to AsyncStorage
  };

  // ✅ Close modal and navigate back
  const closeModalAndGoBack = () => {
    setModalVisible(false);
    router.push('/');
  };

  // ✅ Render each task
  const renderItem = ({ item }: { item: Task }) => (
    <View style={styles.taskItem}>
      <Checkbox
        value={item.completed}
        onValueChange={() => toggleTaskCompletion(item.id)}
        style={styles.checkbox}
      />
      <Text style={[styles.taskText, item.completed && styles.completedTask]}>
        {item.text}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Modal isVisible={isModalVisible} onBackdropPress={closeModalAndGoBack}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>To-Do List</Text>

          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>{selectedDate}</Text>
          </View>

          <KeyboardAvoidingView
            style={styles.keyboardAvoidingView}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <FlatList
              data={tasks}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              style={styles.taskList}
            />

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Write your Task Here"
                value={task}
                onChangeText={setTask}
              />
              <TouchableOpacity style={styles.addButton} onPress={addTask}>
                <Image
                  source={require('../assets/images/plus_icon.png')}
                  style={styles.plusIcon}
                />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#FCFBDD',
    borderRadius: 20,
    padding: 20,
    width: 348,
    height: 690,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dateContainer: {
    marginBottom: 20,
  },
  dateText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  keyboardAvoidingView: {
    flex: 1,
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 30,
    width: 250,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#37518A',
    width: 55,
    height: 55,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusIcon: {
    width: 30,
    height: 30,
  },
  taskList: {
    width: '100%',
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  checkbox: {
    marginRight: 10,
  },
  taskText: {
    fontSize: 18,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
});

export default TodoScreen;