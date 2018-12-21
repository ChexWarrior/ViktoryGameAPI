const childProcess = require('child_process');

module.exports = async () => {
  // eslint-disable-next-line
  console.log('\nRemoving test server...');
  childProcess.exec('docker container stop viktory_test_server');
};
