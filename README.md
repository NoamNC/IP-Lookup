
## Table of Contents
1. [General Info](#general-info)
2. [Project setup and Configuration](#project-setup-and-configuration)
3. [Roadmap](#roadmap)
4. [FAQs](#faqs)
5. [Spacial thanks](#spacial-thanks)

# IP lookup app
### General Info
The ip lookup app is an app that displays the country flag and local time upon an entering an ip address to the text area.

The user is expected to enter an ip address to the text area and once the text area loses focus a request is sent and retrieves data on that ip address.

The data is gathered from [ipgeolocation's API](https://app.ipgeolocation.io/)

## Project setup and Configuration


```
$ git clone https://github.com/NoamNC/IP-Lookup.git
$ cd ../path/to/the/file
$ npm install
```

**in order to get the data an API key is required.**
to get an API key either sign up to [ipgeolocation's](https://app.ipgeolocation.io/) or email me and I will provide you with my API key.
once you obtained the api key, add to the main project folder a file with the name ".env".
in the .env file you must add the line "VUE_APP_API_KEY=...".
after that you should run the command:
```
$ npm run serve
```

### Roadmap
1. wrap app in docker for easy deployment.
2. add unit testing.


### FAQ

q: Since the api you're using has a limit on the amount of requests sent per month, how do you make sure not to reach their limit?

a: I can't. but I reduced the amount of requests by using the local storage for chaching.

### Spacial thanks
I wanted to give a spacial thanks to [Torq](https://torq.io/) for this assignment and the opportunity to showcase my skills :)


