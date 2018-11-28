var headPayload = context.getVariable("jwt.Decode-JWT.header-json");

var header = JSON.parse(headPayload);
context.setVariable("kidParsed",header.kid);
var kidFromJWT = header.kid;



var respObj = response.content.asJSON;
response.content = '';
response.headers['Content-Type'] = 'application/json';
var body = response.content.asJSON;

body.pubKeys = [];

var data = respObj.keys;
for(var i in data)
{
    if(data[i]["kid"] == kidFromJWT){
     var key = data[i]["x5c"]
        context.setVariable("Key",key);
        var val = data[i].x5c;
       
        body = val.toString();
    
    }
}
context.setVariable("publicKey",body);


