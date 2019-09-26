import React, { Component } from 'react'
import { Text, View, Image, TouchableHighlight,ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { WebView } from 'react-native-webview';
import { NavigationEvents } from 'react-navigation';

export default class Welcome extends Component {
    state = {
        isLoading: true,
        logged: 'false',
        visible: true,
        
        
    }
    static navigationOptions = {
        header: null,
    };
    hideSpinner = () => {
        this.setState({ visible: false });
    }
    showSpinner = () => {
        this.setState({ visible: true });
    }
    onNavChange = (e) => {
        console.log(e.url)
        if (e.url === "https://vovinammartialarts.com/") {
            this.storeData();
        }
    }
    storeData = async () => {
        try {
            await AsyncStorage.setItem('@logged', 'true')
        } catch (e) {
            // saving error
        }
    }
    getData = async () => {
        try {
            const value = await AsyncStorage.getItem('@logged')
            if (value !== null) {
                this.setState({ logged: value, isLoading: false })
                console.log(value)
            } else {
                this.setState({ isLoading: false })
            }
        } catch (e) {
            // error reading value
        }
    }

   async componentDidMount() {
        const dem = await AsyncStorage.getItem('@dem');
        if(dem !== null){
            console.log(dem)
        }
        this.getData();
        setInterval(() => {
            this.props.navigation.navigate('Login')
        }, 2000);
    }

    render() {
        const { isLoading, logged } = this.state;
        var url='';
        if (logged === 'true') {
            return (
                isLoading ? <ActivityIndicator style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} size="large" /> :
                <View style={{ flex: 1 }}>
                <WebView
                    onLoadStart={() => (this.showSpinner())}
                    onLoad={() => this.hideSpinner()}
                    style={{ flex: 1 }}
                    userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.10240"
                    javaScriptEnabled
                    domStorageEnabled
                    sharedCookiesEnabled
                    onNavigationStateChange={this.onNavChange}
                    source={{ uri: url }}
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
                            backgroundColor: '#fff'
                        }}
                        size="large"
                    />
                )}
            </View>
            )
        }
        else if(logged ==='false'){
        return (
            <View
                    style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image
                style={{ width: 300, height: 300 }}
                source={require('../img/vovinamm.png')}
            />
            </View>
        )
        }
    }
}
