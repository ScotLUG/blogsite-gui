'use strict';

/**
 * @ngdoc function
 * @name blognihonioApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the blognihonioApp
 */
angular.module('blognihonioApp')
  .controller('MainCtrl', function ($scope, BlogApi) {

  	var blog = new BlogApi();
  	blog.getPosts(function(err, res){
  		$scope.blog = res;
  	})

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  })
  .controller('AdminCtrl', function ($scope, BlogApi) {
  	var blogApi = new BlogApi('test');
  	blogApi.getPosts(function(err, data){
  		if (!err){
  			$scope.posts = data;
  		}
  	})

  })
  .factory('BlogApi', function ($http){
  	var apilocation = "//localhost:3000/";
  	var BlogApi = function(apikey){
  		this.apikey = apikey;
  	}

  	BlogApi.prototype.getPosts = function(cb) {
  		$http({method: 'get', url: apilocation+"post/all"})
  		.success(function(data, status, headers, config){
  			cb(null, data);
  		})
  		.error(function(data, status, headers, config){
  			cb(data, null);
  		})
  	}

  	BlogApi.prototype.getPost = function(post,cb){
		$http({method: 'get', url: apilocation+"post/"+post})
  		.success(function(data, status, headers, config){
  			cb(null, data);
  		})
  		.error(function(data, status, headers, config){
  			cb(data, null);
  		})
  	}

  	BlogApi.prototype.createPost = function(name, url, html){

  	}

  	return BlogApi;

  });
