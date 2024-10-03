import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Alert } from 'react-native';
import Draggable from 'react-native-draggable';

const DragToBoxActivity = () => {
  const [numbers, setNumbers] = useState([
    { id: 1, value: '1', correctBox: 'A' },
    { id: 2, value: '2', correctBox: 'B' },
    { id: 3, value: '3', correctBox: 'C' },
  ]);

  const [boxes, setBoxes] = useState([
    { id: 'A', value: null },
    { id: 'B', value: null },
    { id: 'C', value: null },
  ]);

  const [successMessage, setSuccessMessage] = useState('');

  const [animatedValue] = useState(new Animated.ValueXY());

  const handleDragRelease = (number, boxId) => {
    const updatedNumbers = numbers.map((n) => {
      if (n.id === number.id) {
        return { ...n, correctBox: boxId };
      }
      return n;
    });

    setNumbers(updatedNumbers);
  };

  useEffect(() => {
    // Check if all numbers are in correct boxes
    const isAllCorrect = numbers.every((number) => number.correctBox === number.value);

    if (isAllCorrect) {
      setSuccessMessage('Congratulations! Activity completed successfully.');
      Alert.alert('Success', 'Congratulations! Activity completed successfully.');
    }
  }, [numbers]);

  const renderNumber = (number) => {
    return (
      <Draggable
        key={number.id}
        x={0}
        y={0}
        renderSize={40}
        renderColor="blue"
        onDragRelease={(e, gesture) => {
          Animated.spring(animatedValue, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
          handleDragRelease(number, null);
        }}
      >
        <Animated.View
          style={[
            styles.number,
            {
              transform: animatedValue.getTranslateTransform(),
            },
          ]}
        >
          <Text>{number.value}</Text>
        </Animated.View>
      </Draggable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.boxesContainer}>
        {boxes.map((box) => (
          <TouchableOpacity key={box.id} style={styles.box}>
            <Text>{box.value}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.numbersContainer}>
        {numbers.map((number) => renderNumber(number))}
      </View>
      {successMessage ? (
        <Text style={styles.successMessage}>{successMessage}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxesContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  box: {
    width: 60,
    height: 60,
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  numbersContainer: {
    flexDirection: 'row',
  },
  number: {
    width: 40,
    height: 40,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  successMessage: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
  },
});

export default DragToBoxActivity;
