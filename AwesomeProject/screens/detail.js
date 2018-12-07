import React from "react";
import { View, Text, Image, ScrollView, Dimensions } from "react-native";
import jg from "../jg";
import HTML from "react-native-render-html";
import { Tile } from "react-native-elements";

export default class DetailScreen extends React.Component {
    constructor(props) {
        jg.log("Detail init");
        super(props);
        const { params } = this.props.navigation.state;
        const contentID = params ? params.contentID : null;
        const contentTypeID = params ? params.contentTypeID : null;
        const content = params ? params.content : null;
        this.state = {
            medias: [],
            content: content,
            contentTypeID: contentTypeID,
            contentID: contentID,
            name: content.name
        };
    }

    static navigationOptions = ({ navigation }) => {
        // jg.log("navigationOptions");
        const { params } = navigation.state;

        return {
            title: params ? params.name : null
        };
    };

    componentDidMount() {
        jg.log("componentDidMount");
        this.loadeMedias(this.state.contentTypeID, this.state.contentID);
    }

    render() {
        jg.log("render");
        const Entities = require("html-entities").XmlEntities;
        const content = this.state.content;
        let media = {};
        try {
            media = this.state.medias[0];
            jg.log(media.fileName);
        } catch (e) {}
        return (
            <ScrollView>
                <Tile
                    imageSrc={{ uri: content.path + content.bigThumb }}
                    title={content.name}
                    contentContainerStyle={{ height: 150 }}
                    height={Dimensions.get("window").width}
                >
                    <View>
                        <Text>Tags: {content.keyword}</Text>
                    </View>
                </Tile>
                <HTML
                    html={Entities.decode(content.detail)}
                    imagesMaxWidth={Dimensions.get("window").width}
                    containerStyle={{ padding: 20 }}
                />
            </ScrollView>
        );
    }

    loadeMedias(contentTypeID, contentID) {
        jg.log("load loadeMedias");
        let url = jg.getContentUrl(contentTypeID, contentID);
        url += "?isAjax=true&actionType=GetMediaJson";
        jg.log(url);
        fetch(url)
            .then(response => response.json())
            .then(json => {
                json.forEach(m => {
                    m.fileName = "https://www.jgospel.net/" + m.fileName;
                });
                this.setState(
                    {
                        medias: json
                    },
                    function() {}
                );
            })
            .catch(error => {
                console.error(error);
            });
    }
}
