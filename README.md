gulp.json
============

# local development
## preinstall
* nodejs

## install
```
npm install -g mup
npm install -g bower
npm install -g gulp
curl https://install.meteor.com/ | sh
npm install && bower install
```

## backend
```
gulp run
```

## frontend
```
gulp
```

# server
## server setting
```
gulp mup:setup
```

## server deploy
```
gulp deploy
```

# app build
```
gulp build:android
```

# TODO
* 일반 예제 추가