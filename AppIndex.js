/* eslint-disable no-empty */
/* eslint-disable import/imports-first */
/* eslint-disable react/sort-comp */
/* eslint-disable no-undef */
/* eslint-disable global-require */
/* eslint-disable no-confusing-arrow */


import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { Root } from 'native-base';
import { Platform, View, Text, TouchableOpacity } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import RNRestart from 'react-native-restart';
// import ImageLoad from './src/common/RnImagePlaceH';
import store from './src/redux/store';
// eslint-disable-next-line import/imports-first
import { Provider } from 'react-redux';
import Appp from './App';
import { NetworkProvider, NetworkConsumer } from 'react-native-offline';

export default class AppIndex extends Component {
  CheckConnectivity = () => {
    // For Android devices
    if (Platform.OS === 'android') {
      NetInfo.fetch().then(state => {
        if (state.isConnected) {
        } else {
          alert('Please connect to the internet');
        }
      });
    } else {
      // For iOS devices
      NetInfo.addEventListener(
        'connectionChange',
        this.handleFirstConnectivityChange
      );
    }
  };

  handleFirstConnectivityChange = state => {
    NetInfo.removeEventListener(
      'connectionChange',
      this.handleFirstConnectivityChange
    );

    if (state.isConnected === false) {
      alert('Please connect to the internet');
    } else {
    }
  };
  componentDidMount() {
    this.CheckConnectivity();
  }
  render() {
    console.log('start');
    return (
      <Provider store={store}>
        <NetworkProvider children={React.Node}>
          <NetworkConsumer>
            {({ isConnected }) =>
              isConnected ? (
                <Root>
                  <Appp />
                </Root>
              ) : (
                  <View style={{ flex: 1, backgroundColor: '#fff' }}>
                    {Platform.OS === 'ios' ? (
                      <View style={{ height: 36, backgroundColor: '#51688F' }} />
                    ) : null}

                    <View
                      style={{
                        flex: 1,
                        backgroundColor: '#fff',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingBottom: 170
                      }}
                    >
                      {/* <ImageLoad
                        key={'key'}
                        style={{ width: 200, height: 200 }}
                        loadingStyle={{ size: 'large', color: '#557f5f' }}
                        placeholderSource={require('./src/images/wifi.png')}
                        placeholderStyle={{ width: 200, height: 300 }}
                        source={require('./src/images/wifi.png')}
                      /> */}
                      <Text style={{ fontSize: 22 }}>
                        No internet {'\n'}
                        Try:{'\n'}
                        Reconnecting to Wi-Fi
                    </Text>
                      <TouchableOpacity
                        onPress={() =>
                          RNRestart.Restart()
                        }
                      >
                        <View
                          style={{
                            marginTop: 18,
                            borderColor: '#51688F',
                            alignItems: 'center',
                            height: 38,
                            width: 90,
                            backgroundColor: '#51688F',
                            justifyContent: 'center'
                          }}
                        >
                          <Text
                            style={{
                              textAlign: 'center',
                              color: '#fff',
                              fontSize: 15
                            }}
                          >
                            Try Again
                        </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                )
            }
          </NetworkConsumer>
        </NetworkProvider>
      </Provider>
    );
  }
}

