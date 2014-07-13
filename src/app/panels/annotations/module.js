/*

  ## annotations

*/
define([
  'angular',
  'app',
  'underscore'
],
function (angular, app, _) {
  'use strict';

  var module = angular.module('kibana.panels.annotations', []);
  app.useModule(module);

  module.controller('AnnotationsCtrl', function($scope, datasourceSrv, $rootScope) {

    $scope.panelMeta = {
      status  : "Stable",
      description : "Annotations"
    };

    // Set and populate defaults
    var _d = {
      annotations: []
    };

    var annotationDefaults = {
      name: '',
      type: 'graphite metric',
      showLine: true,
      iconColor: '#C0C6BE',
      lineColor: 'rgba(255, 96, 96, 0.592157)',
      iconSize: 13,
      enable: true
    };

    _.defaults($scope.panel,_d);

    $scope.init = function() {
      $scope.currentAnnnotation = angular.copy(annotationDefaults);
      $scope.currentIsNew = true;
      $scope.datasources = datasourceSrv.getAnnotationSources();
      if ($scope.datasources.length > 0) {
        $scope.currentDatasource = $scope.datasources[0];
      }
    };

    $scope.edit = function(annotation) {
      $scope.currentAnnnotation = annotation;
      $scope.currentIsNew = false;
      $scope.currentDatasource = datasourceSrv.get(annotation.datasource);
    };

    $scope.update = function() {
      $scope.currentAnnotation.datasource = $scope.currentDatasource.name;
      $scope.currentAnnnotation = angular.copy(annotationDefaults);
      $scope.currentIsNew = true;
    };

    $scope.add = function() {
      $scope.panel.annotations.push($scope.currentAnnnotation);
      $scope.currentAnnnotation = angular.copy(annotationDefaults);
    };

    $scope.hide = function (annotation) {
      annotation.enable = !annotation.enable;
      $rootScope.$broadcast('refresh');
    };

  });
});
