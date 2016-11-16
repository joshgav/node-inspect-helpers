let cdp = require('chrome-remote-interface');
let defaults = require('./lib/defaults.json');

/**
 * Profile CPU for a period and record to file
 * @param {number} ms - milliseconds to record
 * @param {string} filePath - where to store the trace
 * @param {object} options
 * @param {string} options.host
 * @param {string} options.port
 */

function getCPUProfile(ms, filePath, options) {

  options = options || {};
  options.host = options.host || defaults.host;
  options.port = options.port || defaults.port;
  options.remote = options.remote || defaults.remote;

  if (!filePath.endsWith('.cpuprofile')) { filePath = filePath + '.cpuprofile' };

  // if/when merged upstream, change to `cdp.connect(...)`
  cdp(options, (cdpproxy) => {
    cdpproxy.Profiler.enable().then(() => { console.log('CPU Profiler enabled') });
    cdpproxy.Profiler.start().then(() => { console.log('CPU Profiler started') });
    setTimeout(() => { 
      cdpproxy.Profiler.stop().then((result) => {
        console.log('CPU Profiler stopped, profile written to ' + filePath);
        fs.writeFileSync(filePath, JSON.stringify(result.profile));
      }).catch((err) => { console.error(err); process.exit(1); });
    }, ms);
  });
}

module.exports.getCPUProfile = getCPUProfile;
