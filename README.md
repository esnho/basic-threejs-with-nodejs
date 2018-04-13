# Milano Live Coding ThreeJS group tutorial
This code is a common reference for our meeting with Codice Inutile during Milano Live Coding.
We are exploring toghether ThreeJS and learning it a bit.

**THIS CODE IS NOT WELL WRITTEN**

**If you are interested in our meeting follow the [Facebook Group](https://www.facebook.com/groups/1541449069410868/)**

ThreeJS setup over a basic webpack server with ES2015, CSS, and webpack server

This project assume that you have installed [NodeJS](https://nodejs.org/it/download/) and [Git](https://git-scm.com/downloads) in your system.

Then if you have git open a shell

On Windows
```
ctrl+r
```
then write
```
cmd
```
On Mac
```
Application folder
Terminal
```

Then clone the repo writing
```
git clone https://github.com/esnho/basic-threejs-with-nodejs.git
```

Move to the folder created by the git command
```
cd basic-threejs-with-nodejs
```

Then run following commands:
```
npm install

npm run dev
```

Finally open a browser and go to https://localhost:8080/

# Known issue
On Windows to stop the server the user must kill the process. Use the `kilwin.bat` to kill the running server on port 8080, otherwise if you want to kill and start again use `startwin.bat`
