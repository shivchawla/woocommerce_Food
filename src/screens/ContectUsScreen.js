/* eslint-disable import/newline-after-import */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-undef */
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  I18nManager
} from 'react-native';
import { CardStyleInterpolators } from 'react-navigation-stack';
import { connect } from 'react-redux';
import { Icon } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import MapView from 'react-native-maps';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import themeStyle from '../common/Theme.style';
class RewardPoints extends Component {
  static navigationOptions = ({ navigation }) => {
    const headerStyle = navigation.getParam('headerTitle');
    return {
      headerTitle: headerStyle,
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      headerTitleAlign: 'center',
      headerTintColor: themeStyle.headerTintColor,
      headerStyle: {
        backgroundColor: themeStyle.primary,
      },
      headerTitleStyle: {
        fontWeight: Platform.OS === 'android' ? "bold" : 'normal'
      },
      headerForceInset: { top: 'never', vertical: 'never' },
      gestureEnabled: true,
    };
  }
  // eslint-disable-next-line react/sort-comp
  componentDidMount() {
    this.props.navigation.setParams({
      headerTitle: this.props.isLoading.Config.languageJson['Contact Us']
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      Email: '',
      msg: '',
      errorMessage: '',
      SpinnerTemp: false
    };
  }

  submit() {
    this.setState({ SpinnerTemp: true });
    fetch(
      `${
        this.props.isLoading.Config.url
      }/api/reactappusers/react_send_mail/?insecure=cool&email=${this.state.Email}&name=${
        this.state.firstName
      }&message=${this.state.msg}`,
      {
        method: 'GET'
      }
    )
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          this.setState({
            firstName: '',
            msg: '',
            Email: '',
            errorMessage: data.error,
            SpinnerTemp: false
          });
        } else {
          this.setState({
            firstName: '',
            msg: '',
            Email: '',
            errorMessage: data,
            SpinnerTemp: false
          });
        }
      })
      .catch(error => {
        this.setState({ errorMessage: 'Server Error', SpinnerTemp: false });
        console.log(error);
      });
  }

  singaleRow(iconName, text) {
    return (
      <View
        style={{
          padding: 2,
          flexDirection: 'row',
          backgroundColor: 'white',
          paddingTop: 2
        }}
      >
        <Icon name={iconName} style={{ color: 'gray', fontSize: 21 }} />
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: themeStyle.mediumSize,
              color: 'black',
              fontWeight: 'normal',
              padding: 6,
              paddingTop: 1
            }}
          >
            {text}
          </Text>
        </View>
      </View>
    );
  }
  canBeSubmitted() {
    const { Email, firstName, msg } = this.state;
    return Email.length > 0 && firstName.length > 0 && msg.length > 0;
  }
  render() {
    const isEnabled = this.canBeSubmitted();
    console.log(this.props.isLoading.Config.latitude);
    return (
      <View style={styles.container}>
        <Spinner
          visible={this.state.SpinnerTemp}
          textStyle={styles.spinnerTextStyle}
        />
        <View style={{ flex: 1, backgroundColor: '#000' }}>
          {this.props.isLoading.Config.latitude !== null &&
          this.props.isLoading.Config.latitude !== '' &&
          this.props.isLoading.Config.latitude !== undefined &&
          this.props.isLoading.Config.latitude.toString() !== 'NaN' ? (
            <MapView
                style={{ flex: 1 }}
                region={{
                  latitude: parseFloat(
                    this.props.isLoading.Config.latitude !== undefined &&
                    this.props.isLoading.Config.latitude !== null
                      ? this.props.isLoading.Config.latitude
                      : 0.0922
                  ),
                  longitude: parseFloat(
                    this.props.isLoading.Config.longitude !== undefined &&
                    this.props.isLoading.Config.longitude !== null
                      ? this.props.isLoading.Config.longitude
                      : 0.0421
                  ),
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421
                }}
            >
                <MapView.Marker
                coordinate={{
                    latitude: parseFloat(
                      this.props.isLoading.Config.latitude !== undefined &&
                      this.props.isLoading.Config.latitude !== null
                        ? this.props.isLoading.Config.latitude
                        : 0.0922
                    ),
                    longitude: parseFloat(
                      this.props.isLoading.Config.longitude !== undefined &&
                      this.props.isLoading.Config.longitude !== null
                        ? this.props.isLoading.Config.longitude
                        : 0.0421
                    )
                  }}
                title={'Address'}
                description={
                    this.props.isLoading.Config.address !== undefined &&
                  this.props.isLoading.Config.address !== null
                      ? this.props.isLoading.Config.address
                      : ''
                  }
                />
              </MapView>
            ) : null}
        </View>
        <KeyboardAwareScrollView
          style={{
            flex: 1,
            backgroundColor: 'white'
          }}
        >
          <ScrollView>
            <View
              style={{
                flex: 1,
                backgroundColor: 'white',
                padding: 10,
                margin: 10,
                marginTop: 10,
                // marginBottom: 1,
                elevation: 4,
                shadowOffset: { width: 1, height: 1 },
                shadowColor: 'black',
                shadowOpacity: 0.6
              }}
            >
              {this.singaleRow('pin', this.props.isLoading.Config.address)}
              {this.singaleRow('mail', this.props.isLoading.Config.email)}
              {this.singaleRow('call', this.props.isLoading.Config.phoneNo)}
              <TextInput
                style={{
                  marginTop: 2,
                  height: 38,
                  width: '97%',
                  borderColor: '#c1c1c1',
                  borderWidth: 1,
                  margin: 6,
                  textAlign: I18nManager.isRTL ? 'right' : 'left',
                  paddingLeft: 6,
                  paddingRight: 6,
                  fontSize: themeStyle.mediumSize
                }}
                selectionColor='#51688F'
                placeholder={this.props.isLoading.Config.languageJson.Name}
                onChangeText={firstName => {
                  {
                    this.setState({ firstName, errorMessage: '' });
                  }
                }}
                value={this.state.firstName}
              />
              <TextInput
                style={{
                  marginTop: 2,
                  height: 38,
                  width: '97%',
                  borderColor: '#c1c1c1',
                  borderWidth: 1,
                  margin: 6,
                  textAlign: I18nManager.isRTL ? 'right' : 'left',
                  paddingLeft: 6,
                  paddingRight: 6,
                  fontSize: themeStyle.mediumSize
                }}
                selectionColor='#51688F'
                placeholder={this.props.isLoading.Config.languageJson.Email}
                onChangeText={Email => {
                  this.setState({ Email, errorMessage: '' });
                }}
                value={this.state.Email}
              />
              <TextInput
                style={{
                  marginTop: 2,
                  height: 38,
                  width: '97%',
                  borderColor: '#c1c1c1',
                  borderWidth: 1,
                  margin: 6,
                  textAlign: I18nManager.isRTL ? 'right' : 'left',
                  paddingLeft: 6,
                  paddingRight: 6,
                  fontSize: themeStyle.mediumSize
                }}
                selectionColor='#51688F'
                placeholder={this.props.isLoading.Config.languageJson['Your Messsage']}
                onChangeText={msg => {
                  this.setState({ msg, errorMessage: '' });
                }}
                value={this.state.msg}
              />

              {this.state.errorMessage === '' ? null : (
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      color: 'black',
                      fontWeight: 'normal',
                      padding: 10,
                      paddingTop: 4,
                      paddingLeft: 6,
                      fontSize: themeStyle.mediumSize
                    }}
                  >
                    {this.state.errorMessage}
                  </Text>
                </View>
              )}
              <TouchableOpacity
                style={{}}
                onPress={() => {
                  this.submit();
                }}
                disabled={!isEnabled}
              >
                <View
                  style={{
                    borderColor: '#fff',
                    alignItems: 'center',
                    height: 38,
                    backgroundColor: '#557f5f',
                    flexDirection: 'row',
                    padding: 4,
                    justifyContent: 'center',
                    width: '97%',
                    alignSelf: 'center',
                    opacity: !isEnabled ? 0.5 : 0.9
                  }}
                >
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: themeStyle.mediumSize + 1,
                      paddingTop: 1,
                      fontWeight: '500'
                    }}
                  >
                    {this.props.isLoading.Config.languageJson.Send}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  isLoading: state
});

export default connect(
  mapStateToProps,
  null
)(RewardPoints);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
});
