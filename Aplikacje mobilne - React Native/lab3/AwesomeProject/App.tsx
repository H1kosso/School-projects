import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

class CalculatorApp extends Component {
  constructor() {
    super();
    this.state = {
      displayValue: '0',
      operator: null,
      firstValue: '',
      secondValue: '',
    };
  }

  handleNumberPress = (number) => {
    const { displayValue, operator } = this.state;

    if (operator === null) {
      this.setState({
        displayValue: displayValue === '0' ? number : displayValue + number,
      });
    } else {
      this.setState({
        secondValue: displayValue === '0' ? number : displayValue + number,
        displayValue: displayValue === '0' ? number : displayValue + number,
      });
    }
  };

  handleOperatorPress = (operator) => {
    this.setState({
      operator,
      firstValue: this.state.displayValue,
      displayValue: '0',
    });
  };

  handleEqualsPress = () => {
    const { firstValue, secondValue, operator } = this.state;
    let result = 0;

    switch (operator) {
      case '+':
        result = parseFloat(firstValue) + parseFloat(secondValue);
        break;
      case '-':
        result = parseFloat(firstValue) - parseFloat(secondValue);
        break;
      case '*':
        result = parseFloat(firstValue) * parseFloat(secondValue);
        break;
      case '/':
        result = parseFloat(firstValue) / parseFloat(secondValue);
        break;
    }

    this.setState({
      displayValue: result.toString(),
      operator: null,
      firstValue: '',
      secondValue: '',
    });
  };

  handleClearPress = () => {
    this.setState({
      displayValue: '0',
      operator: null,
      firstValue: '',
      secondValue: '',
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.display}>
          <Text style={styles.displayText}>{this.state.displayValue}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.handleClearPress()}
            >
              <Text style={styles.buttonText}>C</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.handleOperatorPress('/')}
            >
              <Text style={styles.buttonText}>/</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.handleNumberPress('7')}
            >
              <Text style={styles.buttonText}>7</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.handleNumberPress('8')}
            >
              <Text style={styles.buttonText}>8</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.handleNumberPress('9')}
            >
              <Text style={styles.buttonText}>9</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.handleOperatorPress('*')}
            >
              <Text style={styles.buttonText}>*</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.handleNumberPress('4')}
            >
              <Text style={styles.buttonText}>4</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.handleNumberPress('5')}
            >
              <Text style={styles.buttonText}>5</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.handleNumberPress('6')}
            >
              <Text style={styles.buttonText}>6</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.handleOperatorPress('-')}
            >
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.handleNumberPress('1')}
            >
              <Text style={styles.buttonText}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.handleNumberPress('2')}
            >
              <Text style={styles.buttonText}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.handleNumberPress('3')}
            >
              <Text style={styles.buttonText}>3</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.handleOperatorPress('+')}
            >
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.handleNumberPress('0')}
            >
              <Text style={styles.buttonText}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.handleEqualsPress()}
            >
              <Text style={styles.buttonText}>=</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  display: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'ligtblue',
  },
  displayText: {
    fontSize: 36,
    marginRight: 20,
  },
  buttonContainer: {
    flex: 4,
    backgroundColor: 'grey',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 24,
  },
});

export default CalculatorApp;
