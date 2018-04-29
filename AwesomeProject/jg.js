
export default class jg {
  constructor(){
  };
  static log(msg){
    console.log(msg);
  };

  static cTabID = 3986;
  static tTabID = 3985;

  static getTypeContent(){
     this.log("getTypeContent");
  };

  //not using namore, use cmp state
  static getContent(typeID, contentID){
    let c ={};
    jg.data = jg.data ||[];
    let matches = jg.data.filter(function(d){
      if(d.typeID == typeID){
        return d;
      }
    })
    if(matches.length>0){
      const m = matches[0];
      let cMatches = m.contents.filter(function(item){
        if(item.contentID == contentID){
          return item;
        }
      })
      if(cMatches.length >0 ){
        c =  cMatches[0];
      }
    }

    return c;
  }

  //not using namore, use cmp state
  static setContent(typeID, contents){
    jg.data = jg.data||[];

    let obj = {typeID: typeID, contents: contents}
    let matches = jg.data.filter(function(d){
        if(d.typeID == typeID){
            return d;
        }
    })
    if(matches>0){
        let m = matches[0];
        m.contents = contents;
    }
    else{
        jg.data.push(obj);
    }
  }

  static getTypeUrl(typeID){
    let url = "https://beta.jgospel.net/ct/1/"+typeID+"/"+this.tTabID+"/type.aspx";
    return url;
  }

  static getContentUrl(typeID, contentID){
    let url = "https://beta.jgospel.net/c/1/"+contentID+"/"+typeID+"/"+this.cTabID+"/content.aspx";
    return url;
  }

  //end
}


