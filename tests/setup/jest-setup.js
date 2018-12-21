const childProcess = require('child_process');

module.exports = async () => {
  // eslint-disable-next-line
  console.log('\nStarting test server...');
  childProcess.exec('docker container run --rm -dp 8080:80 -v $PWD/tests/html:/usr/share/nginx/html:ro --name viktory_test_server nginx');
};
