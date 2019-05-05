// ESM syntax is supported.

// When using import, remember to import by path. Dependencies are available in parent directory (..)
import { finishTest } from '../iso-test/index.js'
import './index.js'

// a unit test result.
finishTest('pass Successfully loaded module and test framework.')

// call when done with all unit tests.
finishTest('kill')
