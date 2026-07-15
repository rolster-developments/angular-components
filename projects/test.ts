// This file is required by karma.conf.js and initializes the Angular
// testing environment. Test files themselves are discovered by the
// Angular karma builder via the --include glob option.

import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

import 'zone.js';
import 'zone.js/testing';

// Initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
