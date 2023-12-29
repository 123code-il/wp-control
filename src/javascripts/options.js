import { Application } from '@hotwired/stimulus'

import RouterController from '~/src/javascripts/controllers/router'
import SitesController from '~/src/javascripts/controllers/sites'

const Stimulus = window.Stimulus = Application.start()

Stimulus.register( 'router', RouterController )
Stimulus.register( 'sites', SitesController )
