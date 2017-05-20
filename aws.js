// Require the AWS SDK module
var AWS = require('aws-sdk');
// Include Credentials
var creds = new AWS.Credentials({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, 
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
// Specify region, credentials in AWS config
AWS.config.update({
    credentials: creds,
    region:'us-east-1'
});
// Define a new EC2 instance 
var ec2 = new AWS.EC2();
// Define ec2 parameters
var params = {
  ImageId: 'ami-e13739f6', // Ubuntu image
  InstanceType: 't2.micro', // Free Tier
  KeyName: 'amazon_jenkins', // Name of Key Pair
  MinCount: 1,
  MaxCount: 1
};
// Create ec2 instance
ec2.runInstances(params, function(err, data) {
  if (err) {
      console.log("Error in creating instance!", err); 
      return; 
  }
  // If no error, it indicates successful creation
  //console.log( data);
  var id = data.Instances[0].InstanceId; // Get the Instance ID to print to console
  console.log("Created new EC2 instance with ID: ", id);
  // GET PUBLIC IP ADDRESS OF Instance
  // Define Instance parameters
  var params_instance = {
      InstanceIds: [id]
    };
  // Use timeout (required) to set max time to retrieve public ip address of instance
  setTimeout(function(){
    //Describe instance to get public ip address
    ec2.describeInstances(params_instance,function (err, data){
        if (err) console.log(err, err.stack); 
        else {
            //console.log(data);
            var ipaddress = data.Reservations[0].Instances[0].PublicIpAddress;
            console.log("Public IP Address for the new EC2 instance is "+ipaddress); 
            fs = require('fs');
            fs.appendFile('inventory', '[amazon]\nnode0 ansible_ssh_host='+ipaddr+' ansible_ssh_user=ec2-user ansible_ssh_private_key_file=/home/vagrant/keys/amazon_jenkins.key', function (err) {
                if (err) return console.log(err);
                console.log('Inventory file created !');
              });
            } 
        });
    },17000); // timeout required as it takes some time to retrieve the ip address of the node .
});