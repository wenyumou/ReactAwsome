import React from 'react';
import { Text, Dimensions, ImageBackground, TouchableHighlight} from 'react-native'
import ListScreen from '../screens/list';
import  jg from '../jg'


export default class HomeTypeCard extends React.Component {
    constructor(props){
        super(props);

        this.state={
            contentTypeID:props.item.Key,
            contents:props.item.Value,
            imgWidth: Dimensions.get('window').width*0.5,
            imgHeight: Dimensions.get('window').width*0.5 *80 /120
        }

        

    };
    contentKey = (item, index) => String(item.contentID);

    render() {
        jg.log("HomeTypeCard Render");
        
      return (
        <TouchableHighlight onPress={this.btnPress}>
            <ImageBackground source={{uri: this.getThumb(this.state.contents)}} 
                style={{width:this.state.imgWidth, 
                    height:this.state.imgHeight, 
                    flex: 1, justifyContent: 'center', alignItems: 'center', }} >
                    <Text style={{color:'white', fontSize:20, fontWeight:'bold'}}>{this.getTypeNme(this.state.contents)}</Text>
                </ImageBackground>
        </TouchableHighlight>

      );
    }

    btnPress=()=>{
        const typeID = this.state.contentTypeID
        this.props.nav.navigate("List", {
            contentTypeID : typeID,
            name:this.getTypeNme(this.state.contents)
        })
    }

    getTypeNme(contents){
        let name = "";
        try{
            name = contents[0].contentTypeName;
        }
        catch(e){}

        return name;

    }

    getThumb(contents){
        let name = "";
        try{
            name = "https://beta.jgospel.net/"+ contents[0].path +contents[0].smallThumb;
        }
        catch(e){}

        return name;
    }
  }
    