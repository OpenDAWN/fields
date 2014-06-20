window.fields.controls = {}

var controlsInstances = {}

var waaUtils = require('./utils/waa')
  , widgets = require('./utils/widgets')
  , math = require('./utils/math')
  , _ = require('underscore')

// Start things when the user presses a button
fields.controls.start = function() {
  fields.controls.audioContext = waaUtils.kickStartWAA()
  fields.controls.clock = new WAAClock(fields.controls.audioContext)
  rhizome.start()

  var tabsHeader = $('<div>', { class: 'tabsHeader' }).appendTo('body')
    , tabsContainer = $('<div>', { class: 'tabsContainer' }).appendTo('body')

  _.chain(fields.config).pairs().forEach(function(p) {
    var instrumentId = p[0]
      , config = p[1]
      , instrument = fields.instruments[config.instrument]
      , controls = instrument.controls.apply(instrument, [instrumentId].concat(config.args))
      , title = $('<h2>').html(instrumentId)
    
    var onOff = widgets.toggle(function(active) {
      var action = active ? 'start' : 'stop'
      controlsInstances[instrumentId][action]()
      rhizome.send('/' + instrumentId + '/' + action)
    })

    // Volume control
    var _sendVolume = rhizome.utils.throttle(100, function(args) {
      rhizome.send('/' + instrumentId + '/volume', args)
    })    
    var volumeSlider = widgets.slider({ title: 'Volume' }, function(val) {
      _sendVolume([ val ])
    }).addClass('volume')

    // Adding default controls to the container
    controlsInstances[instrumentId] = controls
    controls.container.prepend(volumeSlider)
    controls.container.prepend(onOff)
    controls.container.appendTo(tabsContainer)
    controls.container.prepend(title)

    // Managing tabs
    $('<div>', { class: 'tabButton' })
      .appendTo(tabsHeader)
      .html(instrumentId)
      .click(function() {
        controls.container.toggleClass('active')
        $(this).toggleClass('active')
      })

  }).values()
}

// Message scheme :
//  /<instrument id>/<parameter> [args]
rhizome.on('message', function(address, args) {
  fields.log(address + ' ' + args)
})

rhizome.on('connected', function() {})
rhizome.on('server full', function() {})
rhizome.on('connection lost', function() {})
rhizome.on('reconnected', function() {})