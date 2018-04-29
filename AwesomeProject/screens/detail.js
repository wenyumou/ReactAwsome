import React from 'react';
import { View, Text, Image, ScrollView, Dimensions } from 'react-native';
import  jg from '../jg'
import HTML from 'react-native-render-html';

export default class DetailScreen extends React.Component {
  constructor(props) {
    jg.log("Detail init");
    super(props);
    const { params } = this.props.navigation.state;
    const contentID = params ? params.contentID : null;
    const contentTypeID = params ? params.contentTypeID : null;
    const content = params ? params.content : null;
    this.state = {
        medias:[],
        content:content,
        contentTypeID:contentTypeID,
        contentID:contentID,
        name:content.name
    };
};

  static navigationOptions = ({ navigation }) => {
    // jg.log("navigationOptions");
    const { params } = navigation.state;
    
    return {
      title: params ? params.name : null
    }
  };

  componentDidMount(){
    jg.log("componentDidMount");
    this.loadeMedias(this.state.contentTypeID, this.state.contentID);
  };
  
  render() {
    jg.log('render');
    const Entities = require('html-entities').XmlEntities;
    const content = this.state.content;
    return (
      <ScrollView>
        <Text>{content.name} </Text>
        <Text>{content.keyword} </Text>
        <Image source={{uri: content.path + content.bigThumb}} style={{width: 256, height:256}} />
        <HTML html ={Entities.decode(content.detail)} imagesMaxWidth={Dimensions.get('window').width} />
      </ScrollView>
    );
  }

  loadeMedias(contentTypeID, contentID){
    jg.log("load loadeMedias");
    let url = jg.getContentUrl(contentTypeID, contentID);
    url+="?isAjax=true&actionType=GetMediaJson";
    // jg.log(url);
    fetch(url)
    .then(response => response.json())
    .then(json => {
      json.forEach(m => {
          m.path = "https://beta.jgospel.net/" + m.path;
      });
      this.setState({
          medias: json,
      }, function(){
      });
    })
    .catch((error) =>{
        console.error(error);
    });
  }

}