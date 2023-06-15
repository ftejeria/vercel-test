# AppsMovilesBack


### Pre-requirements

1. Install [Nodejs](http://nodejs.org) and [Docker](https://docs.docker.com/engine/install/)

2. Start a mongo container listening on port 27017
```
docker run -d -p 27017:27017 --name my-mongo mongo:latest
```
3. Create .env file following the .env.example template


### Installation

Install local dependencies:

```
npm install
```
### Develop
```
npm run dev
```

### Running

```
npm start
```

Check request folder to see requests templates

### Testing

```
npm test