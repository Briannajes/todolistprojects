import { useState } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { Text, Input, Button, CheckBox } from '@rneui/themed';


export default function App() {
  const [tasks, setTasks] = useState([
    { key: '1', description: 'Walk the dog', completed: false },
    { key: '2', description: 'Clean room', completed: false },
    { key: '3', description: 'Work on portfolio', completed: false },
    { key: '4', description: 'Make bed', completed: false },
    { key: '5', description: 'Go grocery shopping', completed: false },
  ]);

  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim() === '') return;

    const newItem = {
      key: Date.now().toString(),
      description: newTask,
      completed: false,
    };

    setTasks([...tasks, newItem]);
    setNewTask('');
  };

  const toggleTask = (key) => {
    setTasks(
      tasks.map((task) =>
        task.key === key
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.taskContainer}>
        <CheckBox
  checked={item.completed}
  onPress={() => toggleTask(item.key)}
  checkedIcon="check-square"
  uncheckedIcon="square-o"
/>
        <Text
          style={[
            styles.taskText,
            item.completed && styles.completedText
          ]}
        >
          {item.description}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TODO App</Text>

      <View style={styles.inputContainer}>
        <Input
          placeholder="Enter a task..."
          value={newTask}
          onChangeText={setNewTask}
          onSubmitEditing={addTask} // bonus
          containerStyle={{ flex: 1 }}
        />
        <Button title="Add" onPress={addTask} />
      </View>

      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E6F2FF',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },

  taskText: {
    fontSize: 18,
  },

  completedText: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: 'gray',
  },
});