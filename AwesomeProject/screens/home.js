import React from 'react';
import { View, AppState, FlatList} from 'react-native';
// import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Icon from "react-native-vector-icons/FontAwesome";
import HomeTypeCard from '../components/HomeTypeCard'
import jg from '../jg';


export default class HomeScreen extends React.Component {
    
    constructor(props) {
        jg.log("Home Screen init");
        super(props);
        this.state = {
            isLoading:true,
            types:[],
            typeContents:[]
        };
    }
    state = {
        appState: AppState.currentState
    }
    typeKey = (item, index) => String(item.Key);

    componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange);
        this.loadData();
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
        jg.log("home render");
        
        return (
            <FlatList
            keyExtractor={this.typeKey}
            data={this.state.typeContents}
            renderItem={this.renderItem}
            numColumns={2}
            />
        );
        
        
    }
    loadData(){
        jg.log("load data");
        this.setState({isLoading:true});
        fetch('https://beta.jgospel.net//Portals/_default/Skins/JGospel2016/Json/typeJson.js')
        .then((response) => response.json())
        .then((json) => {
            jg.types = json;
            console.log("got types length="+jg.types.length);
            fetch('https://beta.jgospel.net//Portals/_default/Skins/JGospel2016/Json/typeContent.js')
                .then(response => response.json())
                .then(json => {
                jg.typeContent = json;
                    console.log("got typeContent length="+jg.typeContent.length);
                    this.setState({
                        isLoading: false,
                        typeContents: json,
                        types:jg.types
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

    renderItem=({item})=>(
        <View style={{flex:1}}>
            <HomeTypeCard item={item} nav={this.props.navigation}  />
        </View>
        
    )
}