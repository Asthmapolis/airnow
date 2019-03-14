/*jslint node: true */
/** @module airnow/client */
var request 	= require('request');
var async 		= require('async');
var _			= require('underscore');
var moment 		= require('moment');
var packageJson = require('./package.json');

module.exports = function(options){
	// save some goodies
	var apiKey = options.apiKey;
	
	// build a base request
	var baseRequest = request.defaults({
		baseUrl: "http://www.airnowapi.org/aq/",
		uri: "",
		timeout: 60000,
		method: "GET",
		gzip: true,
		headers: {
			"User-Agent": "npm-airnow/" +packageJson.version
		}
	});
	
	return {
		
		/** callback for getForecastByZipCode
		* @callback module:airnow/client~getForecastByZipCodeCallback
		* @param {Object} [err] error calling airnow
		* @param {Object} [result] forecast
		*/
		/**
		* getForecastByZipCode
		* @param {Object} options object containing the send info
		* @param {String} options.zipCode Zip code
		* @param {Date} [options.date=current] Date of forecast
		* @param {String=text/csv,application/json,application/xml,application/json} [options.format] of the payload file returend.
		* @param {Number} [options.distance] If no reporting area is associated with the specified Zip Code, return a forecast from a nearby reporting area within this distance (in miles).
		* @param {module:airnow/client~getForecastByZipCodeCallback} [callback] callback
		*/
		getForecastByZipCode: function(options, callback){
			
			// set the correct defaults
			_.defaults(options, {
				api_key: apiKey,
				format: "application/json"
			});
			
			// reformat the date to the expected format of airnow API
			if (_.has(options, "date")){
				options.date = moment(options.date).format("YYYY-MM-DD")
			}
			
			// send with brute force retry
			async.retry({ times: 5, interval: 100 }, function(callback){
				baseRequest({
					uri: "forecast/zipCode/?",
					qs: options,
					json: options.format === "application/json"
				}, function(err, message, body){
					callback(err, body);
				});
			}, callback);
		},
		/** callback for getForecastByLatLong
		* @callback module:airnow/client~getForecastByLatLongCallback
		* @param {Object} [err] error calling airnow
		* @param {Object} [result] forecast
		*/
		/**
		* getForecastByLatLong
		* @param {Object} options object containing the send info
		* @param {Number} options.latitude Latitude in decimal degrees
		* @param {Number} options.longitude longitude in decimal degrees
		* @param {Date} [options.date=current] Date of forecast
		* @param {String=text/csv,application/json,application/xml,application/json} [options.format] of the payload file returend.
		* @param {Number} [options.distance] If no reporting area is associated with the specified Zip Code, return a forecast from a nearby reporting area within this distance (in miles).
		* @param {module:airnow/client~getForecastByLatLongCallback} [callback] callback
		*/
		getForecastByLatLong: function(options, callback){
			
			// set the correct defaults
			_.defaults(options, {
				api_key: apiKey,
				format: "application/json"
			});
			
			// reformat the date to the expected format of airnow API
			if (_.has(options, "date")){
				options.date = moment(options.date).format("YYYY-MM-DD")
			}
			
			// send with brute force retry
			async.retry({ times: 5, interval: 100 }, function(callback){
				baseRequest({
					uri: "forecast/latLong/?",
					qs: options,
					json: options.format === "application/json"
				}, function(err, message, body){
					callback(err, body);
				});
			}, callback);
		},
		/** callback for getObservationsByZipCode
		* @callback module:airnow/client~getObservationsByZipCodeCallback
		* @param {Object} [err] error calling airnow
		* @param {Object} [result] observations
		*/
		/**
		* getObservationsByZipCode
		* @param {Object} options object containing the send info
		* @param {String} options.zipCode Zip Code
		* @param {String=text/csv,application/json,application/xml,application/json} options.format of the payload file returend.
		* @param {Number} [options.distance] If no reporting area is associated with the specified Zip Code, return a forecast from a nearby reporting area within this distance (in miles).
		* @param {module:airnow/client~getObservationsByZipCodeCallback} [callback] callback
		*/
		getObservationsByZipCode: function(options, callback){
			
			// set the correct defaults
			_.defaults(options, {
				api_key: apiKey,
				format: "application/json"
			});
			
			// send with brute force retry
			async.retry({ times: 5, interval: 100 }, function(callback){
				baseRequest({
					uri: "observation/zipCode/current/?",
					qs: options,
					json: options.format === "application/json"
				}, function(err, message, body){
					callback(err, body);
				});
			}, callback);
		},
		/** callback for getObservationsByLatLng
		* @callback module:airnow/client~getObservationsByLatLngCallback
		* @param {Object} [err] error calling airnow
		* @param {Object} [result] observations
		*/
		/**
		* getObservationsByLatLng
		* @param {Object} options object containing the send info
		* @param {Number} options.latitude Latitude in decimal degrees
		* @param {Number} options.longitude longitude in decimal degrees
		* @param {String=text/csv,application/json,application/xml,application/json} [options.format] of the payload file returend.
		* @param {Number} [options.distance] If no reporting area is associated with the specified Zip Code, return a forecast from a nearby reporting area within this distance (in miles).
		* @param {module:airnow/client~getObservationsByLatLngCallback} [callback] callback
		*/
		getObservationsByLatLng: function(options, callback){
			
			// set the correct defaults
			_.defaults(options, {
				api_key: apiKey,
				format: "application/json"
			});
			
			// send with brute force retry
			async.retry({ times: 5, interval: 100 }, function(callback){
				baseRequest({
					uri: "observation/latLong/current/?",
					qs: options,
					json: options.format === "application/json"
				}, function(err, message, body){
					callback(err, body);
				});
			}, callback);
		},
		/** callback for getObservationsByMonitoringSite
		* @callback module:airnow/client~getObservationsByMonitoringSiteCallback
		* @param {Object} [err] error calling airnow
		* @param {Object} [result] observations
		*/
		/**
		* getObservationsByMonitoringSite
		* @param {Object} options object containing the send info
		* @param {Object} options.bbox The bounding obx of the area of interest in latitude and longitude
		* @param {Number} options.bbox.minX minimum latitude of the box in decmial
		* @param {Number} options.bbox.minY minimum longitude of the box in decmial
		* @param {Number} options.bbox.maxX maximum latitude of the box in decmial
		* @param {Number} options.bbox.maxY maximum longitude of the box in decmial
		* @param {Date} [options.startdate] The start date of the data requested.
		* @param {Date} [options.enddate] The end date of the data requested.
		* @param {String[]=o3,pm25,pm10,co,no2,so2} options.parameters Parameters to return data for.
		* @param {String=A,C,B} options.datatype The type of data to be returned.
		* @param {String=text/csv,application/json,application/xml,application/json,application/vnd.google-earth.kml} [options.format] of the payload file returend.
		* @param {module:airnow/client~getObservationsByMonitoringSiteCallback} [callback] callback
		*/
		getObservationsByMonitoringSite: function(options, callback){
			
			// project the bbox and datatype arguments to the csv format
			options.bbox = [options.bbox.minX, options.bbox.minY, options.bbox.maxX, options.bbox.maxY].join(",");
			options.parameters = options.parameters.join(",");
			
			// set the correct defaults
			_.defaults(options, {
				api_key: apiKey,
				format: "application/json"
			});
			
			// reformat the date to the expected format of airnow API
			if (_.has(options, "startdate")){
				options.startdate = moment(options.startdate).format("YYYY-MM-DDTHH:mm")
			}
			
			// reformat the date to the expected format of airnow API
			if (_.has(options, "enddate")){
				options.enddate = moment(options.enddate).format("YYYY-MM-DDTHH:mm")
			}
			
			// send with brute force retry
			async.retry({ times: 5, interval: 100 }, function(callback){
				baseRequest({
					uri: "data/?",
					qs: options,
					json: options.format === "application/json"
				}, function(err, message, body){
					callback(err, body);
				});
			}, callback);
		},
		/** callback for getHistoricalObservationsByZipCode
		* @callback module:airnow/client~getHistoricalObservationsByZipCodeCallback
		* @param {Object} [err] error calling airnow
		* @param {Object} [result] observations
		*/
		/**
		* getHistoricalObservationsByZipCode
		* @param {Object} options object containing the send info
		* @param {String} options.zipCode Zip code
		* @param {Date} options.date Date of observations
		* @param {Number} [options.distance] If no reporting area is associated with the specified Zip Code, return a forecast from a nearby reporting area within this distance (in miles).
		* @param {String=text/csv,application/json,application/xml,application/json} [options.format] of the payload file returend.
		* @param {module:airnow/client~getHistoricalObservationsByZipCodeCallback} [callback] callback
		*/
		getHistoricalObservationsByZipCode: function(options, callback){
			
			// set the correct defaults
			_.defaults(options, {
				api_key: apiKey,
				format: "application/json"
			});
			
			// reformat the date to the expected format of airnow API
			if (_.has(options, "date")){
				options.date = moment(options.date).format("YYYY-MM-DDTHHZ");
			}
			
			// send with brute force retry
			async.retry({ times: 5, interval: 100 }, function(callback){
				baseRequest({
					uri: "observation/zipCode/historical/?",
					qs: options,
					json: options.format === "application/json"
				}, function(err, message, body){
					callback(err, body);
				});
			}, callback);
		},
		/** callback for getHistoricalObservationsByLatLng
		* @callback module:airnow/client~getHistoricalObservationsByLatLngCallback
		* @param {Object} [err] error calling airnow
		* @param {Object} [result] observations
		*/
		/**
		* getHistoricalObservationsByLatLng
		* @param {Object} options object containing the send info
		* @param {Number} options.latitude Latitude in decimal degrees
		* @param {Number} options.longitude longitude in decimal degrees
		* @param {Date} options.date Date of observations
		* @param {Number} [options.distance] If no reporting area is associated with the specified Zip Code, return a forecast from a nearby reporting area within this distance (in miles).
		* @param {String=text/csv,application/json,application/xml,application/json} [options.format] of the payload file returend.
		* @param {module:airnow/client~getHistoricalObservationsByLatLngCallback} [callback] callback
		*/
		getHistoricalObservationsByLatLng: function(options, callback){
			
			// set the correct defaults
			_.defaults(options, {
				api_key: apiKey,
				format: "application/json"
			});
			
			// reformat the date to the expected format of airnow API
			if (_.has(options, "date")){
				options.date = moment(options.date).format("YYYY-MM-DDTHHZ");
			}
			
			// send with brute force retry
			async.retry({ times: 5, interval: 100 }, function(callback){
				baseRequest({
					uri: "observation/latLong/historical/?",
					qs: options,
					json: options.format === "application/json"
				}, function(err, message, body){
					callback(err, body);
				});
			}, callback);
		}
	};
};