import { chrome } from 'jest-chrome';

import manifest from './manifest.json';

describe('manifest.json', () => {
  test('contains all required keys', () => {
    chrome.runtime.getManifest.mockImplementation(() => manifest);

    const { name, version, manifest_version } = chrome.runtime.getManifest();

    expect(name).toBeDefined();
    expect(version).toBeDefined();
    expect(manifest_version).toBeDefined();
  });

  test('contains version 3', () => {
    chrome.runtime.getManifest.mockImplementation(() => manifest);

    const { manifest_version } = chrome.runtime.getManifest();

    expect(manifest_version).toBe(3);
  });
});
