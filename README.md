gmeteor
============
helper [meteor](https://www.meteor.com/), [mup](https://github.com/arunoda/meteor-up) and [gulp](http://gulpjs.com/)

# install
> install gmeteor
```
npm install -g gmeteor
```

# command
## create
> create gmeteor project
```
gmeteor create <dest_folder>
cd <dest_folder>
```

## install
> It installs with the program required for **gmeteor**.
If you already have an installation it is complete, but nothing happened.
```
gmeteor install
```

## run
> local development
```
gmeteor run [target] [options]
```
* target : android, android-device, ios, ios-device
* options
  * phase default **local**

## debug
> local development with debug
```
gmeteor debug [target] [options]
```
* target : android, android-device, ios, ios-device
* options
  * phase default **local**

## build
> package mobile app
```
gmeteor build [options]
```
* options
    * phase default **real**
    * android default **false**

## jarsigner
> sign android app
```
gmeteor jarsigner [options]
```
* options
    * phase default **real**

## zipalign
> make android app to apk file
```
gmeteor zipalign [options]
```
* options
    * phase default **real**

## deploy
> deploy to server
```
gmeteor deploy [phase]
```
* phase : default **real**

## gulp wrapper
```
gmeteor gulp [tasks...] [options]
```
* tasks
* options
    * watch default **false**
    * production default **false**

## meteor wrapper
> meteor wrapper
```
gmeteor meteor <command>
```
* command : meteor commands ex) add, remove, add-platform, ...

### issue
* ```gmeteor meteor mongo``` not working yet

## mup wrapper
> mup wrapper
```
gmeteor mup <command> [options]
```
* command : mup commands ex) init, setup, deploy, start, stop, reconfig, logs, ...
* options
    * phase default **real**

## bower wrapper
> bower wrapper
```
gmeteor bower <command>
```
* command : bower commands ex) install, update, ...

# Support
* meteor 1.2.x

# gmeteor.json
```
{
  "info": {
    // app name
    "name": "gmeteor-app",
    // folder structure
    "path": {
      "deploy": "deploy",
      "frontend": "frontend",
      "backend": "backend"
    },
    // default development deploy folder
    "development": "local",
    // default production deploy folder
    "production": "real"
  },
  // add another phase
  "phase": {
    "local": {
    // ROOT_URL
     "url": "http://localhost",
      "port": 3000,
      // no js, css minify
      "environment": "development",
      // no test if added velocity
      "test": false,
      // build path default : phase folder .build
      "outputPath": "deploy/local/.build"
       // add environment variable
       "env": {
           "MAIL_URL" : ""
      }
    },
    "real": {
      "url": "http://gmeteor-app.com",
      "keystore": "deploy/real/gmeteor-app_release.keystore"
    }
  },
  "gulp": {
    "public": {
      "all": [
        "frontend/public/**",
        "frontend/bower_components/fullcalendar/dist/fullcalendar.css",
        "frontend/bower_components/angular-carousel/dist/angular-carousel.css",
        "frontend/bower_components/pikaday/css/pikaday.css",
        "frontend/bower_components/c3/c3.css",
        "frontend/bower_components/angular-chart/**/*.css",
        "frontend/bower_components/angular-chart/**/*.eot",
        "frontend/bower_components/angular-chart/**/*.svg",
        "frontend/bower_components/angular-chart/**/*.ttf",
        "frontend/bower_components/angular-chart/**/*.woff",
        "frontend/bower_components/angular-ui-grid/ui-grid.*",
        "frontend/bower_components/fl.meteor/fl.meteor.permissions.tpl",
        "!**/*.js"
      ],
      "js": [
        "frontend/public/**/*.js",
        "frontend/bower_components/fl.meteor/fl.meteor.PermissionController.js",
        "frontend/bower_components/fl.meteor/fl.meteor.GridHelper.js"
      ],
      "js-lib": [
        "frontend/bower_components/d3/d3.js",
        "frontend/bower_components/c3/c3.js",
        "frontend/bower_components/angular-chart/angular-chart.js",
        "frontend/bower_components/angular-recaptcha/release/angular-recaptcha.js",
        "frontend/bower_components/ngInfiniteScroll/build/ng-infinite-scroll.js",
        "frontend/bower_components/angular-moment/angular-moment.js",
        "frontend/bower_components/moment/locale/ko.js",
        "frontend/bower_components/ng-file-upload/angular-file-upload.js",
        "frontend/bower_components/angular-carousel/dist/angular-carousel.js",
        "frontend/bower_components/angular-ui-calendar/src/calendar.js",
        "frontend/bower_components/pikaday-angular/pikaday-angular.js",
        "frontend/bower_components/pikaday/pikaday.js",
        "frontend/bower_components/fullcalendar/dist/fullcalendar.js",
        "frontend/bower_components/angular-ui-grid/ui-grid.js"
      ],
      "target": "backend/public"
    },
    "client": {
      "all": [
        "frontend/client/**",
        "frontend/bower_components/angular-i18n/angular-locale_ko.js",
        "frontend/bower_components/angular-aria/angular-aria.js",
        "frontend/bower_components/angular-touch/angular-touch.js",
        "frontend/bower_components/angular-animate/angular-animate.js",
        "frontend/bower_components/angular-material/angular-material.css",
        "frontend/bower_components/angular-material/angular-material.js",
        "frontend/bower_components/angular-sanitize/angular-sanitize.js",
        "frontend/bower_components/angular-ui-router/release/angular-ui-router.js",
        "frontend/bower_components/angular-local-storage/dist/angular-local-storage.js",
        "frontend/bower_components/angularjs-viewhead/angularjs-viewhead.js",
        "frontend/bower_components/angular-ui-utils/mask.js",
        "frontend/bower_components/oclazyload/dist/ocLazyLoad.js",
        "frontend/bower_components/fl.common/fl.common.js",
        "frontend/bower_components/fl.lazy/fl.lazy.js",
        "frontend/bower_components/fl.meteor/fl.meteor.js"
      ],
      "target": "backend/client"
    }
  },
  "exec": {
    "zipalign": "~/Library/Android/sdk/build-tools/23.0.1/zipalign"
  }
}
```

# TODO
* working ```gmeteor meteor mongo```

# Trouble Shooting
```
DEBUG=true gmeteor <command> [options]
```