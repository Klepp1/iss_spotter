const { fetchMyIp } = require('./iss');
const { fetchCoordsByIp } = require('./iss');
const { fetchISSFlyOverTimes } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');
/*fetchMyIp((error, ip) => {
  if (error) {
    console.log('it didnt work!' , error);
    return;
  }
  console.log('it worked! returned IP:', ip)
});
*/

/*fetchCoordsByIp('70.33', (error, data) => {
  if (error) {
    console.log('it didnt work!' , error);
    return;
  }
  console.log('it worked! returned coords:', data)
})
*/


/*fetchISSFlyOverTimes({ latitude: 50.584, longitude: -113.8705 }, (error, data) => {
  if (error) {
    console.log('it didnt work!' , error);
    return;
  }
  console.log('it worked! returned flyover times', data)
});
*/
const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};
nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  printPassTimes(passTimes);
});