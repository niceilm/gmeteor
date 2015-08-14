gmeteor
============
helper [meteor](https://www.meteor.com/), [mup](https://github.com/arunoda/meteor-up) and [gulp](http://gulpjs.com/)

# install
```
npm install -g gmeteor
```

# command
## run
```
gmeteor run
gmeteor run android
gmeteor run ios
```

## debug
```
gmeteor debug
gmeteor debug android
gmeteor debug ios
```

## build
```
gmeteor build android
gmeteor build ios
```

## deploy
```
gmeteor deploy
```

## gulp wrapper
```
gmeteor gulp [tasks...]
```

## meteor wrapper
```
gmeteor meteor [command]
```

## mup wrapper
```
gmeteor mup [command]
```

# TODO
* debug 추가
* 모드 : 개발모드 / 프로덕션
* 페이즈 : alpha / beta /real
* environment 추가 하기
* 미설치된 명령어 설치하기
 * npm install -g mup
 * npm install -g gulp
 * npm install -g bower
* gmeteor meteor mongo 동작하도록 하기
