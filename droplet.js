// Import the needle and os modules
var needle = require("needle");
var os   = require("os");
// Digital ocean config 
var config = {
    token: process.env.DOTOKEN
};
// Import Digital Ocean SSH key from an environment variable
var ssh_key = process.env.DOPERSONALKEY; 
// Define droplet ID with an initial value to be updated later
var dropletId = 0;
// Declare headers
var headers =
{
	'Content-Type' :'application/json',
	Authorization: 'Bearer ' + config.token
};
// Define Parameters
var client =
{
	createDroplet: function (dropletName, region, imageName, onResponse)
	{
		var data = 
		{
			"name": dropletName,
			"region":region,
			"size":"512mb",
			"image":imageName,
			"ssh_keys":[ssh_key],
			"backups":false,
			"ipv6":false,
			"user_data":null,
			"private_networking":null
		};
		needle.post("https://api.digitalocean.com/v2/droplets", data, {headers:headers,json:true}, onResponse );
	},
    retreiveDropletById: function( onResponse )
	{
		needle.get("https://api.digitalocean.com/v2/droplets/"+dropletId, {headers:headers}, onResponse)
	}
 };

// Create an droplet with a specified name, region, and image
var name = "SERVER"; //Add desired droplet name here
var region = "nyc3"; 
var image = "ubuntu-16-04-x64";
client.createDroplet(name, region, image, function(err, resp, body) {
    //console.log(body);
    //StatusCode 202 - server accepted request
    if(!err && resp.statusCode == 202) {
            //console.log( JSON.stringify( body, null, 3 ) );
            dropletId = body.droplet.id;
            console.log("Created new Digital Ocean Droplet with ID: "+dropletId)
    }
    // Using a timeout value, retrieve the IP Address of the droplet
    setTimeout(function(){
        client.retreiveDropletById(function(error, resp) {
            var data = resp.body;
            var publicip = data.droplet.networks.v4[0].ip_address;
            console.log("Public IP Address for the new Digital Ocean Droplet is "+publicip);
        });
    }, 17000);
});