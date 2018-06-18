This is a project that I am making while learning Electron, ReactJS and Redux.

## Run
* Run in browser: `npm start`
* Run in electron: `npm run electron-dev`

## Build
`npm run electron-pack`

## Create Google API secret
* Go to [Google developer console](https://console.developers.google.com/apis/credentials)
* Create credentials -> OAuth Client ID -> Web application
    * Authorised JavaScript origins: `http://localhost:3000`
    * Authorised Redirect URI's: `http://localhost:3000`
* Create credentials -> OAuth Client ID -> Other
* Download both as json
* Put them together
```
{
    "installed": {
        // all properties from Other client id
    },
    "web": {
        // all properties from Web client id
    }
}
```
* Save in `/src/.credentials/api-client-secret.json`