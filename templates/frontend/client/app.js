angular.module('gmeteor-app', [
  'ngSanitize',
  'LocalStorageModule',
  'fl.common',
  'fl.meteor',
  'fl.lazy'
]).config(config).run(run);

config.$inject = ['$urlRouterProvider', '$stateProvider', '$locationProvider', '$ocLazyLoadProvider', 'localStorageServiceProvider', '$lazyLoadHelperProvider', '$logProvider'];

function config($urlRouterProvider, $stateProvider, $locationProvider, $ocLazyLoadProvider, localStorageServiceProvider, $lazyLoadHelperProvider, $logProvider) {
  var loggerDebug = !!(Meteor.settings && Meteor.settings.public && Meteor.settings.public.logger && Meteor.settings.public.logger.debug);
  var modules = {
    carousel: [{name: 'angular-carousel', files: ['angular-carousel.js', 'angular-carousel.css']}],
    kakao: [{files: ['lib/kakao.js', 'services/KakaoService.js'], serie: true}],
    momentjs: [{name: 'angularMoment', files: ['angular-moment.js', 'ko.js']}],
    infiniteScroll: [{name: 'infinite-scroll', files: ['ng-infinite-scroll.js']}],
    calendar: [{name: 'ui.calendar', files: ['fullcalendar.js', 'fullcalendar.css', 'calendar.js']}],
    chart: [{name: 'angularChart', files: ['d3.js', 'c3.js', 'angular-chart.js', 'ko.js', 'c3.css', 'css/angular-chart.css']}],
    recaptcha: [{name: 'vcRecaptcha', files: ['//www.google.com/recaptcha/api.js?onload=vcRecaptchaApiLoaded&render=explicit', 'angular-recaptcha.js'], cache: true}],
    grid: [
      {name: 'ui.grid', files: ['ui-grid.js', 'ui-grid.css']},
      {name: 'ui.grid.infiniteScroll', files: 'ui-grid.js'},
      {name: 'ui.grid.resizeColumns', files: 'ui-grid.js'},
      {name: 'ui.grid.selection', files: 'ui-grid.js'},
      {name: 'ui.grid.autoResize', files: 'ui-grid.js'},
      {name: 'ui.grid.pagination', files: 'ui-grid.js'},
      {name: 'ui.grid.edit', files: 'ui-grid.js'},
      {name: 'ui.grid.cellNav', files: 'ui-grid.js'}
    ]
  };

  localStorageServiceProvider.setPrefix('gmeteor-app');

  $ocLazyLoadProvider.config({
    debug: false
  });

  $logProvider.debugEnabled(loggerDebug);

  $locationProvider.html5Mode(true);

  $lazyLoadHelperProvider.setDefaultOptions({
    urlArg: CONSTANT.BUILD_VERSION,
    modules: modules
  });

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'views/home.tpl',
      controller: 'HomeController',
      lazyModules: 'controllers/HomeController.js'
    })

    .state('404', {
      url: '/:error',
      templateUrl: 'views/common/404.tpl'
    });

  $urlRouterProvider.otherwise("/");
}

run.$inject = [];

function run() {
}

APP = function() {
  return angular.module('gmeteor-app');
};