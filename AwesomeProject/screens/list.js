import React from 'react';
import { View, Button, Text, FlatList,TouchableHighlight,Image, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements'
import jg from '../jg';

export default class ListScreen extends React.Component {
    constructor(props) {
        jg.log("ListScreen init");
        super(props);
        this.state = {
            isLoading:false,
            data:[],
            page:1,
            speed:1,
            isReloading:false
        };
    };

    static navigationOptions = ({ navigation }) => {
        // const { params } = navigation.state;
        // jg.log(navigation);
        // return {
        //   title: params ? params.otherParam : 'A Nested Details Screen',
        // }
        title:'Hymns';
      };
    
    
    contentKey = (item, index) => String(item.contentID);

  componentDidMount(){
    this.loadData();
  };

  render() {
    return (
    //   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //     { /* other code from before here */ }
    //     <Text>List is Coming soon...</Text>
    <FlatList
      keyExtractor={this.contentKey}
      data={this.state.data}
      renderItem={this.renderItem}
    />

    );
  };

  renderItem=({ item }) => (
    <ListItem
        title={item.name}
        subtitle={item.brief}
        avatar= {<Image source={{ uri:item.path + item.smallThumb }} style={{width:128, height:80 }} />}
        onPress={() => {
            /* 1. Navigate to the Details route with params */
            this.props.navigation.navigate('Detail', {
                contentID: item.contentID,
                contentTypeID:item.contentTypeID,
                name: item.name
            });
        }}
    />
  )

  loadData(){
    jg.log("loadData");
    let url = jg.getTypeUrl(this.state.contentTypeID);
    url+="?isApi=true&api=GetContentByPage";
    fetch(url)
    .then(response => response.json())
    .then(json => {
        json.forEach(c => {
            c.path = "https://beta.jgospel.net/" + c.path;
        });
        jg.setContent(this.state.contentTypeID, json);

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
  }

  styles = StyleSheet.create({
        container:{
            backgroundColor: 'white',
            flexDirection: 'row',
        },
        thumb:{
            width: 128, height:80, 
            // flex:2,
        },
        text:{
            // flex:3
        }
        
    })




}
  