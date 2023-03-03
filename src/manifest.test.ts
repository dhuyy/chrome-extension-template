/* eslint-disable @typescript-eslint/naming-convention */
import { chrome } from 'jest-chrome';

import manifest from './manifest.json';

describe('manifest.json', () => {
  beforeEach(() => {
    chrome.runtime.getManifest.mockImplementation(() => manifest);
  });

  test('contains all required keys', () => {
    const { name, version, manifest_version } = chrome.runtime.getManifest();

    expect(name).toBeDefined();
    expect(version).toBeDefined();
    expect(manifest_version).toBeDefined();
  });

  test('contains version 3', () => {
    const { manifest_version } = chrome.runtime.getManifest();

    expect(manifest_version).toBe(3);
  });

  test('contains basic service worker configuration', () => {
    const { background } = chrome.runtime.getManifest();

    expect(background.service_worker).toBe('service-worker.js');
  });

  test('contains basic content scripts configuration', () => {
    const {
      content_scripts: [script],
    } = chrome.runtime.getManifest();

    expect(script.js).toEqual(['scripts/content-scripts.js']);
  });
});
