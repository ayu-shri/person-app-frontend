#!/usr/bin/env node

// Set up localStorage file path for child processes
process.env.NODE_OPTIONS = (process.env.NODE_OPTIONS || '') + ' --experimental-webstorage --localstorage-file=' + require('path').resolve(__dirname, '.node-local-storage/.local-storage');

// Spawn react-scripts with the node flags
const { spawn } = require('child_process');
const path = require('path');

const reactScriptsPath = path.join(__dirname, 'node_modules', '.bin', 'react-scripts');
const args = ['start'];

const child = spawn('node', [
  '--experimental-webstorage',
  '--localstorage-file=' + path.resolve(__dirname, '.node-local-storage/.local-storage'),
  '--no-warnings',
  reactScriptsPath,
  ...args
], {
  stdio: 'inherit',
  shell: false
});

child.on('exit', (code) => {
  process.exit(code);
});

