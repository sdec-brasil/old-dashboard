const cp = require('child_process');

// exec :: String, Object ~> Promise(Object)
function exec(command, options = { log: false, cwd: process.cwd() }) {
  if (options.log) console.log(command);

  return new Promise((done, failed) => {
    cp.exec(command, { ...options }, (err, stdout, stderr) => {
      if (err) {
        err.stdout = stdout;
        err.stderr = stderr;
        failed(err);
        return;
      }
      done({ stdout, stderr });
    });
  });
}

// extractPassword :: Object -> String
function extractPassword(stdout) {
  let response;
  stdout.stdout.split('\n').forEach((val) => {
    const arr = val.split('=');
    if (arr[0] === 'rpcpassword') {
      response = String(arr[1]);
    }
  });
  return response;
}

export default {
  exec,
  extractPassword,
};
