import React from 'react';
import { Text, View, Button, AppState, ActivityIndicator, ListView, FlatList, TouchableHighlight} from 'react-native';
// import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Icon from "react-native-vector-icons/FontAwesome";

import jg from '../jg';


export default class HomeScreen extends React.Component {
    
    constructor(props) {
        jg.log("Home Screen init");
        super(props);
        this.state = {
            isLoading:false,
            data:[],
            page:1,
            speed:1,
            isReloading:false
        };
    }
    state = {
        appState: AppState.currentState
    }
    componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange);
        this.setState({isLoading:true});
      return;
    fetch('https://beta.jgospel.net//Portals/_default/Skins/JGospel2016/Json/typeJson.js')
        .then((response) => response.json())
        .then((json) => {
        jg.types = json;
        fetch('https://beta.jgospel.net//Portals/_default/Skins/JGospel2016/Json/typeContent.js')
            .then(response => response.json())
            .then(json => {
                jg.typeContent = json;
                console.log(jg.typeContent.length);
                //   jg.log(json);
                this.setState({
                    isLoading: false,
                    isReloading:false,
                    data: json,
                }, function(){
                });
            })
            .catch((error) =>{
                console.error(error);
            });
        })
        .catch((error) =>{
        console.error(error);
        });
        
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }
    _handleAppStateChange=(nextAppState)=>{
        console.log('AppState changed to', nextAppState)
        // if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
        //   console.log('App has come to the foreground!')
        // }
        // this.setState({appState: nextAppState});

    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>Coming soon...</Text>
            </View>
        );
    }
}