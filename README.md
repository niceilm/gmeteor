gmeteor
============
helper [meteor](https://www.meteor.com/), [mup](https://github.com/arunoda/meteor-up) and [gulp](http://gulpjs.com/)

# install
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
* target : androind, android-device, ios, ios-device
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

# TODO
* working ```gmeteor meteor mongo```
