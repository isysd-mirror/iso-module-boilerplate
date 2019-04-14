// Set options as a parameter, environment variable, or rc file.
// eslint-disable-next-line no-global-assign
require = require("../esm/esm.js")(module/* , options */)
module.exports = require("${ESM_MAIN_NAME}")
