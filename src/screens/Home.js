/* eslint-disable global-require */
/* eslint-disable import/imports-first */
/* eslint-disable import/newline-after-import */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-nested-ternary */

import React, { Component } from 'react';
import Home1Screen from './Home1Screen';
import Home2Screen from './Home2Screen';
import Home3Screen from './Home3Screen';
import Home4Screen from './Home4Screen';
import Home5Screen from './Home5Screen';
import Home6Screen from './Home6Screen';
import Home7Screen from './Home7Screen';
import Home8Screen from './Home8Screen';
import Home9Screen from './Home9Screen';
import Home10Screen from './Home10Screen';
import { connect } from 'react-redux';
import theme from '../common/Theme.style';
import { CardStyleInterpolators } from 'react-navigation-stack';
import ShoppingCartIcon from '../common/ShoppingCartIcon';
import MenuIcon from '../common/MenuIcon';
import {Logo} from '../common/small'
import { Platform } from 'react-native';
class Home extends Component {
  static navigationOptions = ({ navigation }) => ({
        headerLeft: () => <MenuIcon navigation={navigation} />,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerTitle: () => <Logo navigation={navigation} />,  
        headerRight: () => <ShoppingCartIcon navigation={navigation} />,
        headerTitleAlign: 'center',
        headerTintColor: theme.headerTintColor,
        headerStyle: {
          backgroundColor: '#fff', 
          elevation:0,
          height: 100,
          // borderBottomWidth: 0,
          // shadowRadius: 0,
          // shadowOffset: {
          //     height: 0,
          // },
        },
        headerTitleStyle: {
          fontWeight: Platform.OS === 'android' ? "bold" : 'normal'
        },
        headerForceInset: { top: 'never', vertical: 'never' },
        gestureEnabled: true,
      })

  // eslint-disable-next-line react/sort-comp
  componentDidMount() {
    this.props.navigation.setParams({
      headerTitle: this.props.mystore.Config.languageJson.Home
    });
  }
  constructor(props) {
    super(props);
  }
  render() {
    return this.props.mystore.Config.homePage === 1 ? (
      <Home3Screen navigation={this.props.navigation} />
    ) : this.props.mystore.Config.homePage === 2 ? (
      <Home2Screen navigation={this.props.navigation} />
    ) : this.props.mystore.Config.homePage === 3 ? (
      <Home1Screen navigation={this.props.navigation} />
    ) : this.props.mystore.Config.homePage === 4 ? (
      <Home4Screen navigation={this.props.navigation} />
    ) : this.props.mystore.Config.homePage === 5 ? (
      <Home5Screen navigation={this.props.navigation} />
    ) : this.props.mystore.Config.homePage === 6 ? (
      <Home6Screen navigation={this.props.navigation} />
    ) : this.props.mystore.Config.homePage === 7 ? (
      <Home7Screen navigation={this.props.navigation} />
    ) : this.props.mystore.Config.homePage === 8 ? (
      <Home8Screen navigation={this.props.navigation} />
    ) : this.props.mystore.Config.homePage === 9 ? (
      <Home9Screen navigation={this.props.navigation} />
    ) : this.props.mystore.Config.homePage === 10 ? (
      <Home10Screen navigation={this.props.navigation} />
    ) : (
      <Home1Screen />
    );
  }
}
const mapStateToProps = state => ({
  mystore: state
});
export default connect(
  mapStateToProps,
  null
)(Home);
