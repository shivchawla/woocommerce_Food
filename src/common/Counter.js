/* eslint-disable import/newline-after-import */
import React, {Component} from 'react'
import {
  Text, // Renders text
  TouchableOpacity, // Pressable container
  View, // Container component
} from 'react-native'
import theme from './Theme.style'
export default class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: this.props.initialValue,
      initialValue: this.props.initialValue
    };
  }
   static getDerivedStateFromProps(nextProps, prevState) {
    return {
      count: nextProps.initialValue !== prevState.initialValue ? nextProps.initialValue : prevState.count
    }
  }
  componentDidMount() {
   if(this.props.innerRef !== undefined && this.props.innerRef !== null)
   { this.props.innerRef(this)}
  }
  componentWillUnmount() {
    if(this.props.innerRef !== undefined && this.props.innerRef !== null)
    {this.props.innerRef(null)}
  }
  increment() {
    this.setState({
      count: this.state.count + 1
    });
    return this.state.count + 1;
  };
  
  decrement() {
    this.setState({
      count: this.props.minimumValue  <  this.state.count ? this.state.count - 1 : this.state.count
    });
    return this.props.minimumValue <  this.state.count ? this.state.count - 1 : this.state.count;
  };

  resetValue() {
    this.setState({
      count: this.props.initialValue
    });
  };
  setValue(value) {
    this.setState({
      count: value
    });
  };
  render ({onIncrement,onDecrement, width, height} = this.props) {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={{
            width,
            paddingVertical: height,
            paddingTop: 1,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            backgroundColor: theme.otherBtnsColor,
            borderRadius: 10 / 2,
            shadowOffset: {width: 1, height: 1},
            shadowColor: 'black',
            shadowOpacity: 0.3,
            elevation: 3,
          }}
          onPress={()=>{this.props.minimumValue  <  this.state.count ? onDecrement(this.decrement()): this.state.count}}>
            <Text
              style={{
                color: '#fff',
                fontSize: theme.largeSize + 1,
              }}>
              {'-'}
            </Text>
        </TouchableOpacity>
        {/* //////////////////// */}
        <View
            style={{
              width: width + 6,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#ffffff',
            }}>
            <Text
              style={{
                color: '#000',
                fontSize: theme.mediumSize,
              }}>
              {this.state.count}
            </Text>
          </View>
          {/* /////////////////// */}
        <TouchableOpacity
          style={{
            width,
            paddingVertical: height,
            paddingTop: 1,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            backgroundColor: theme.otherBtnsColor,
            borderRadius: 10 / 2,
            shadowOffset: {width: 1, height: 1},
            shadowColor: 'black',
            shadowOpacity: 0.3,
            elevation: 3,
          }}
          onPress={()=>{onIncrement(this.increment())}}>
            <Text
              style={{
                color: '#fff',
                fontSize: theme.largeSize + 1,
              }}>
              {'+'}
            </Text>
        </TouchableOpacity>
      </View>
    )
  }
}
