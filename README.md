# Automatic Server Provisioning using NodeJS

Amazon Web services EC2 and Digital Ocean droplet server provisioning written in nodeJS.

## Objective 

Automatically provision servers using nodeJS API from 2 service providers - Amazon Web Services and Digital Ocean. The code requests a new VM and then saves or prints out the ip address of the new server.

## Instructions

In Terminal (macOS) or Powershell (Windows) type in the following:

`git clone https://github.com/gms298/Automatic-Server-Provisioning-in-NodeJS`

Before running the program, it is essential to set your own access keys as environment variables. Here is a list of all environment variables required: 

Key to be set  | Environment variable
-------------  | -------------
 Amazon AWS Access key ID | AWS _ ACCESS _ KEY _ ID
 Amazon AWS Secret key | AWS _ SECRET _ ACCESS _ KEY
 Digital Ocean Access Token| DOTOKEN
 Digital Ocean SSH key| DOPERSONALKEY

Now, run the shell script using `. main.sh`. This will automatically execute two programs:

* [aws.js]() - Provisions a EC2 instance in Amazon Web Services (AWS).
* [droplet.js]() - Provisions a droplet in Digital Ocean.

Both the servers are spawned using Ubuntu 16.04 images and the **public IP addresses** of both servers are printed in the terminal/powershell console. 
These IP addresses can then be pinged to verify that it is reachable.

