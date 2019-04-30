const express = require('express')
const router = express.Router()
var path = require('path')

// Add your routes here - above the module.exports line
// include sub-application routing if enabled in the configuration file
var config = require(path.join(__dirname + '/config.js'))
if (config.useSubapplications) router.use('/', require(path.join(__dirname + '/subapps.js')))


module.exports = router
