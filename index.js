let cdp = require('chrome-remote-interface');

var options_default = {
  host: "127.0.0.1",
  port: "9229"
}

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
  options.host = options.host || options_default.host;
  options.port = options.port || options_default.port;

  // if/when merged upstream, change to `cdp.connect(...)`
  cdp(options, (chrome) => {
    chrome.Profiler.enable(() => { console.log('CPU Profiler enabled') });
    chrome.Profiler.start(() => { console.log('CPU Profiler started') });
    setTimeout(() => { 
      chrome.Profiler.stop((err, res) => {
        if (err) { console.error(err); process.exit(1); }
        console.log('CPU Profiler stopped, profile written to ' + filePath);
        fs.writeFileSync(filePath, JSON.stringify(res.profile));
      });
    }, ms);
  });
}

module.exports.getCPUProfile = getCPUProfile;
