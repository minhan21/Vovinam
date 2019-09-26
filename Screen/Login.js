import React, {Component} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {Text, View, ActivityIndicator, Dimensions} from 'react-native';
import {WebView} from 'react-native-webview';
import {TouchableOpacity} from 'react-native-gesture-handler';
export default class Login extends Component {
  state = {
    isLoading: true,
    logged: 'false',
    visible: true,
    dem: 0,
    jsCode: `document.querySelector('#nav').remove();document.querySelector('.privacy-policy-page-link').remove();document.querySelector('#backtoblog').remove();`,
  };
  componentDidMount() {
    this.getData();
  }

  hideSpinner = () => {
    this.setState({visible: false});
  };
  showSpinner = () => {
    this.setState({visible: true});
  };

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@logged');
      if (value !== null) {
        this.setState({logged: value, isLoading: false});
      } else {
        this.setState({isLoading: false});
      }
    } catch (e) {
      // error reading value
    }
  };
  static navigationOptions = {
    header: null,
  };
  onNavChange = async e => {
    console.log(e.url);
    if (e.url === 'https://vovinammartialarts.com/') {
      this.storeData();
      let jsCode = `document.querySelector('.item_logout').addEventListener("click", ()=>{ window.location="https://vovinammartialarts.com/wp-login.php?redirect_to=https%3A%2F%2Fvovinammartialarts.com%2F";});`;
      this.setState({jsCode});
    } else if (e.url.indexOf('wp-login.php') !== -1) {
      await AsyncStorage.setItem('@logged', 'false');
      let jsCode = `document.querySelector('#nav').remove();document.querySelector('.privacy-policy-page-link').remove();document.querySelector('#backtoblog').remove();`
      this.setState({jsCode});
    }
  };
  storeData = async () => {
    try {
      await AsyncStorage.setItem('@logged', 'true');
    } catch (e) {
      // saving error
    }
  };
  render() {
    const {isLoading, logged} = this.state;
    var url =
      'https://vovinammartialarts.com/wp-login.php?redirect_to=https%3A%2F%2Fvovinammartialarts.com%2F';
    if (logged === 'true') {
      url = 'https://vovinammartialarts.com';
    }
    return isLoading ? (
      <ActivityIndicator
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        size="large"
      />
    ) : (
      <View style={{flex: 1}}>
        <WebView
          onLoadStart={() => this.showSpinner()}
          onLoad={() => this.hideSpinner()}
          style={{flex: 1}}
          userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.10240"
          javaScriptEnabled
          domStorageEnabled
          sharedCookiesEnabled
          injectedJavaScript={this.state.jsCode}
          onNavigationStateChange={this.onNavChange}
          source={{uri: url}}
        />

        {this.state.visible && (
          <ActivityIndicator
            style={{
              flex: 1,
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#fff',
            }}
            size="large"
          />
        )}
      </View>
    );
  }
}
