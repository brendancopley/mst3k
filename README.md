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
1. Download the Zip and extract into a folder like ‘C:/VueApp’
2. Once unzipped make sure MongoDB service is running
3. Open terminal and cd to the folder where you unzipped the contents
4. Type ‘Npm Start’
5. Open a browser and type 'localhost:3000'

### Additional setup for testing:
 **more details coming soon** 
 
I've included faker.js to create user data go to 
http://localhost:3000/customer/generate-fake-data
 90 records will be created

### Description:
I chose to make this project in Vue, Express, and MongoDB for the purpose of being as close as I can to the development stack I know Ethika is using currently. As to reintroduce myself to the latest changes of Vue and Express. I chose to use the bootstrap dependency for UI as to speed up the process and provide a consistent responsive UI. 

### Cons:
The cons about the technology I'm using is that it doesn't enforce security, it has to be structured before it's ready for production.
* Known issue when searching it will return all the results non-paginated
* Known issue after search is cleared still showing search results

### Pros:
The pros about the tehcnology is that it's familiar to me and it's fast to spin up
My customer validation is happening both on the component vue level (front) and in express router (back-middle) here are some of the validation that’s happening:
* Making required fields have a min value length > 3
* I also have max length on my front-end form
* Removing with regex any quotes as to prevent XSS or SQL injections (which it’s mongo so it’s not necessarily gonna be the same type of injections)
* In my model I am validating emails
* In my model I am requiring first_name, last_name & email
* trimming all fields except last_name
* In my routes I’m also checking that my fields are not empty

When Creating a customer record I am checking to see if there is a duplicate record I am doing this by:
* Mongoose Schema of making email & phone both unique
* Since phone can be empty I applied the property of sparse to be true
* In my routes I am checking to see if there's already existing values for a record, I felt it was okay that phone, names could be the same but email must always be unique.

When looking up a customer record I only using a single string parameter to find matches
* I am using an computed observable of when a user types into the input field it will send a get request
* In the router it will match any field whether it's first_name, last_name, phone or email with that of the query

When looking up customer records I am limiting the view at a reasonable level by:
* Making the view only show 15 records at a time (exception being on search)
* API call through router to only show 15 records at a time and also sort the records by last_name, email or date and descending or ascending so the response is very fast and only showing the user what they can see at one time
* Everytime a user clicks on a new page it will then make a call to retrieve the next set of 15 for whatever the model has remembered like if you contintue to paginate when you choose last_name descending it will then continue to paginate through last_names and do the appropriate call.

