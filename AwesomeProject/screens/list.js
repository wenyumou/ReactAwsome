import React from 'react';
import { View, Button, Text, FlatList,TouchableHighlight,Image, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements'
import jg from '../jg';

export default class ListScreen extends React.Component {
    constructor(props) {
        jg.log("ListScreen init");
        super(props);
        this.state={
            isLoading:false,
            isReloading:false,
            data:[],
            page:1
        };
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
      onEndReached={this.loadMore}
      onEndReachedThreshold = {1}
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
                name: item.name,
                content:item
            });
        }}
    />
  );

  loadData=()=>{
    jg.log("loadData");
    let url = jg.getTypeUrl(this.state.contentTypeID);
    url+="?isApi=true&api=GetContentByPage&curPageNum=" + this.state.page;
    jg.log(url);
    this.setState({ isLoading: true });
    jg.log("load date page= " + this.state.page);
    jg.log("content type Id= " + this.state.contentTypeID);
    fetch(url)
    .then(response => response.json())
    .then(json => {
        json.forEach(c => {
            c.path = "https://beta.jgospel.net/" + c.path;
        });
        let data = this.state.data;
        if(this.state.page == 1){
            data = json;
        }
        else{
            let uniqueJson = json.filter(function(j){
                let mattches = data.filter(function(d){
                    if(d.contentID == j.contentID){
                        return d;
                    }
                })
                if(mattches.length==0){
                    return j;
                }
            })
            data = data.concat(uniqueJson);
        }
        

        this.setState({
            isLoading: false,
            isReloading:false,
            data: data
        }, function(){
        });
    })
    .catch((error) =>{
        console.error(error);
    });
  };

  loadMore=()=>{
      this.setState({
          page : this.state.page +1
      }, function(){
          this.loadData(); 
      })
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
  