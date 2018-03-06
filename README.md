# mst3k
### Gizmotic Institute Project
### Project by Brendan P. Copley
3/5/2018

### Gizmotic Institute Project for Ethika

This a customer access dashboard for Ethika for creating and looking up customer records

### Assumptions:
Have Node installed
MongoDB community edition and service running
Port 3000 open

### How to install:
Download the Zip and extract into a folder like ‘C:/VueApp’
Once unzipped make sure MongoDB service is running
Open terminal and cd to the folder where you unzipped the contents
Type ‘Npm Start’

### Additional setup for testing:
 **more details coming soon** 
 
I've included faker.js to create user data go to http://localhost:3000/customer/generate-fake-data
 90 records will be created

### Description:
I chose to make this project in Vue, Express, and MongoDB for the purpose of being as close as I can to the development stack I know Ethika is using currently. As to reintroduce myself to the latest changes of Vue and Express. I chose to use the bootstrap dependency for UI as to speed up the process and provide a consistent responsive UI. 

### Pros:
My customer validation is happening both on the component vue level (front) and in express router (back-middle) here are some of the validation that’s happening:
* Making required fields have a min value length > 3
* I also have max length on my front-end form
* Removing with regex any quotes as to prevent XSS or SQL injections (which it’s mongo so it’s not necessarily gonna be the same type of injections)
* In my model I am validating emails
* In my model I am requiring first_name, last_name & email
* trimming all fields except last_name
* In my routes I’m also checking that my fields are not empty

When Creating a customer record I am checking to see if there is a duplicate record I am doing this by:
Mongoose Schema of making email & phone both unique
* Since phone can be empty I applied the property of sparse to be true
* In my routes I am checking to see if there's already existing values for a record, I felt it was okay that phone, names could be the same but email must always be unique.
