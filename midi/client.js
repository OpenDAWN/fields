var path = require('path')
  , _ = require('underscore')
  , midi = require('midi')
  , program = require('commander')
  , rhizome = require('rhizome-server')

var input = new midi.input()
  , inputs = []
  , portCount = input.getPortCount()

program
  .version('0.0.1')
  .option('-d, --devices', 'Print a list of midi devices')
  .option('-p, --print', 'Simply print the midi output')
  .option('-v, --verbose', 'Verbose mode')
  .option('-m --mapping [path]', 'Start the client with the midi mapping at [path]')
//  .option('-P, --pineapple', 'Add pineapple')
//  .option('-b, --bbq-sauce', 'Add bbq sauce')
//  .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
  .parse(process.argv)

if (program.devices) {
  console.log('list of devices :')
  for (var i = 0; i < portCount; i++)
    console.log(input.getPortName(i))
  process.exit(0)
}

if (program.print) { 
  console.log('started in print mode : prints all midi commands. <channel> <eventType> <value>')
  _.range(portCount).forEach(function(i) {
    var input = new midi.input()
      , deviceName = input.getPortName(i)
    inputs.push(input)
    input.openPort(i)
    input.on('message', function(deltaTime, message) {
      var eventType = message[0]
        , channel = message[1]
        , value = message[2]
      console.log(deviceName + ' ' + channel + ' ' + eventType + ' ' + value)
    })
  })

} else if (program.mapping) {
  console.log('starting with the mapping at : ' + path.resolve(__dirname, program.mapping))
  var allMappings = require(program.mapping)
    , rhizomeClient = new rhizome.websockets.Client({ hostname: '127.0.0.1', port: 8001 })
    , callbacks = []

  _.keys(allMappings).forEach(function(deviceName) {
    var deviceMapping = allMappings[deviceName]
      , input = new midi.input()
    inputs.push(input)

    // Looking for the right device id
    for (var i = 0; i < portCount; i++)
      if (deviceName === input.getPortName(i)) break
    if (i === portCount) {
      console.error('device ' + deviceName + ' not found')
      process.exit(1)
    }
    input.openPort(i)

    callbacks.push({input: input, func: function(deltaTime, message) {
      var eventType = message[0]
        , channel = message[1]
        , value = message[2]
        , handler = deviceMapping[eventType] && deviceMapping[eventType][channel]
      
      if (handler) {
        value = handler.mapping(value)
        if (program.verbose)
          console.log(handler.address + ' ' + value)
        rhizomeClient.send(handler.address, [value])
      }
    }})
  })

  rhizomeClient.start(function(err) {
    if (err) throw err
  })

  rhizomeClient.on('connection lost', function() {
    console.log('connection lost')
    input.removeAllListeners('message')
  })

  rhizomeClient.on('connected', function() {
    console.log('connected')
    callbacks.forEach(function(cb) { cb.input.on('message', cb.func) })
  })

}