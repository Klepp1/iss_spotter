const request = require('request');
const fetchMyIp = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ip = JSON.parse(body);
    if (error) {
      return callback(error, null);
    }
    return callback(null, ip["ip"]);
  });
};

const fetchCoordsByIp = function(ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching Geo coords for IP. response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const {latitude, longitude} = JSON.parse(body);
    if (error) {
      return callback(error, null);
    }
    return callback(null, {latitude, longitude});
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `status code ${response.statusCode} when trying to retrive flyover times with give coords ${coords}`;
      return callback(Error(msg), null);
    }
    const data = JSON.parse(body);
    return callback(null, data.response);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIp((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIp(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }
        return callback(null, nextPasses);
      });
    });
  });
};

module.exports = { fetchMyIp, fetchCoordsByIp, fetchISSFlyOverTimes, nextISSTimesForMyLocation };