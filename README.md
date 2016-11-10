## Inspect Helpers

Utilizes [cyrus-and/chrome-remote-interface][] as a foundational proxy for
gathering diagnostic info from Node.js processes.

[cyrus-and/chrome-remote-interface]: https://github.com/cyrus-and/chrome-remote-interface

### Example

Run your Node.js app with `--inspect` option, then run the following from a REPL
or another script. The output file ("sample.cpuprofile") can be loaded in the
Profiles tab in Chrome DevTools to display a flame graph.

```javascript
let inspect-helper = require('node-inspect-helper');
inspect-helper.getCPUProfile(10000, './sample.cpuprofile', {port:9229});
```

