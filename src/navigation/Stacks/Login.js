/* eslint-disable import/imports-first */
import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from '../../screens/LoginScreen';
// import RatingAndReviewScreen from '../../screens/RatingAndReviewScreen';
import CreateAccountScreen from '../../screens/CreateAccountScreen';
import TermAndServiceScreen from '../../screens/TermAndServiceScreen';
import PrivacyPolicyScreen from '../../screens/PrivacyPolicyScreen';
import RefundPolicy from '../../screens/RefundPolicy';
import ForgotPasswordScreen from '../../screens/ForgotPasswordScreen';
import MenuIcon from '../../common/MenuIcon';
import NewestScreen from '../../navigation/Stacks/Newest';
// eslint-disable-next-line no-unused-vars
/// ////////////////////////////////////////////////// Home Stack Start
const HomeStackNavigator = createStackNavigator(
  {
    LoginScreen: {
      screen: LoginScreen,
      navigationOptions: ({ navigation }) => ({
        gestureEnabled: true,
        headerLeft: () => <MenuIcon navigation={navigation} />
      })
    },
    NewestScreen: {
      screen: NewestScreen,
      navigationOptions: () => ({
        gestureEnabled: false
      })
    },
    CreateAccountScreen: {
      screen: CreateAccountScreen,
      navigationOptions: () =>
        ({
          gestureEnabled: false
        })
    },
    TermAndServiceScreen: {
      screen: TermAndServiceScreen,
      navigationOptions: () => ({
        gestureEnabled: false
      })
    },
    PrivacyPolicyScreen: {
      screen: PrivacyPolicyScreen,
      navigationOptions: () => ({
        gestureEnabled: false
      })
    },
    RefundPolicy: {
      screen: RefundPolicy,
      navigationOptions: () => ({
        gestureEnabled: false
      })
    },
    ForgotPasswordScreen: {
      screen: ForgotPasswordScreen,
      navigationOptions: () => ({
        gestureEnabled: false
      })
    }
  }
);
HomeStackNavigator.navigationOptions = ({ navigation }) => {
  let drawerLockMode = 'unlocked';
  if (navigation.state.index > 0) {
    drawerLockMode = 'locked-closed';
  }

  return {
    drawerLockMode
  };
};
export default HomeStackNavigator;
