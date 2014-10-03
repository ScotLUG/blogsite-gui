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
  		$scope.blogs = res;
  	})

  	$scope.formatDate = function(date){
  		var dateFormat = new Date(date);
  		var dateString = "";
  		dateString += dateFormat.getFullYear()+"-";
  		dateString += ((dateFormat.getMonth()<9) ? "0"+(dateFormat.getMonth()+1) : dateFormat.getMonth()+1)+"-";
  		dateString += ((dateFormat.getDate()<9) ? "0"+(dateFormat.getDate()) : dateFormat.getDate())+" at ";
  		dateString += ((dateFormat.getHours()<9) ? "0"+(dateFormat.getHours()) : dateFormat.getHours())+":"
  		dateString += ((dateFormat.getMinutes()<9) ? "0"+(dateFormat.getMinutes()) : dateFormat.getMinutes())

  		return dateString;

  	}

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

  	BlogApi.prototype.createPost = function(blogpost, cb){
  		$http({method: 'post', url: apilocation+"post?key="+this.apikey, data: blogpost})
  		.success(function(data, status, headers, config){
  			cb(null, data);
  		})
  	}

  	BlogApi.prototype.updatePost = function(blogpost, cb){
  		$http({method: 'post', url: apilocation+"post/"+blogpost.url+"?key="+this.apikey, data: blogpost})
  		.success(function(data, status, headers, config){
  			cb(null, data);
  		})
  	}

  	return BlogApi;

  });
