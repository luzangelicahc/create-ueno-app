'use strict';

const path = require('path');
const fs = require('fs');
const execa = require('execa');

module.exports = async function processExit(projectPath, appType) {
  if (appType === 'native') {
    return;
  }

  try {
    fs.unlinkSync(path.join(projectPath, 'src', '.git'));
  } catch (e) {
    // Noop
  }

  try {
    fs.unlinkSync(path.join(projectPath, '.gitmodules'));
  } catch (e) {
    // Noop
  }

  try {
    fs.copyFileSync(path.join(path.resolve(__dirname), '../../overwrites', appType, 'Link.tsx'), path.join(projectPath, 'src/components/link/Link.tsx'));
  } catch (e) {
    // Noop
  }

  if (appType === 'cra') {
    try {
      fs.copyFileSync(path.join(path.resolve(__dirname), '../../overwrites', appType, 'index.tsx'), path.join(projectPath, 'src/index.tsx'));
    } catch (e) {
      // Noop
    }

    try {
      fs.copyFileSync(path.join(path.resolve(__dirname), '../../overwrites', appType, 'serviceWorker.ts'), path.join(projectPath, 'src/serviceWorker.ts'));
    } catch (e) {
      // Noop
    }
  }

  try {
    await execa('git', ['add', '.'], { stdio: 'ignore' });
    await execa('git', ['commit', '--amend', '--no-edit'], { stdio: 'ignore' });
  } catch (e) {
    // Noop
  }
}