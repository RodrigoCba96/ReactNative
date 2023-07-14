import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, FlatList } from 'react-native';

export default function App() {

 
  const [inputText, setInputText] = useState('');
  const [items, setItems] = useState([]);
  const [completedItems, setCompletedItems] = useState([]);

  const handleCreateItem = () => {
    if (inputText !== '') {
      setItems(prevItems => [...prevItems, inputText]);
      setInputText('');
    }
  };

  const handleDeleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const handleMarkCompleted = (index) => {
    const completedItem = items[index];
    handleDeleteItem(index);
    setCompletedItems(prevCompletedItems => [...prevCompletedItems, completedItem]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder='Testing'
          value={inputText}
          onChangeText={setInputText}
        />
        
        <Button
          title='Create'
          color='#424D9E'
          onPress={handleCreateItem}
        />
      </View>
      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item}</Text>
            <Button
              title='Delete'
              color='#FF0000'
              onPress={() => handleDeleteItem(index)}
            />
            <Button
              title='Completed'
              color='#00FF00'
              onPress={() => handleMarkCompleted(index)}
            />
          </View>
        )}
      />
      <Text style={styles.completedTitle}>Completed Items:</Text>
      <FlatList
        data={completedItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.completedItemContainer}>
            <Text style={styles.completedItemText}>{item}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8A81B7',
    paddingTop: 50,
    paddingHorizontal: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  input: {
    flex: 0.8,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    color: 'black',
    borderColor: '#424D9E',
    fontSize: 14,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  itemText: {
    flex: 0.7,
    marginRight: 10,
    fontSize: 16,
  },
  completedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  completedItemContainer: {
    backgroundColor: '#D3D3D3',
    padding: 10,
    marginBottom: 5,
  },
  completedItemText: {
    fontSize: 14,
    color: '#80880',
  },
});
