import { Application } from '@hotwired/stimulus'

import RouterController from '~/src/javascripts/controllers/router_controller'
import SitesController from '~/src/javascripts/controllers/sites_controller'

const Stimulus = window.Stimulus = Application.start()

Stimulus.register( 'router', RouterController )
Stimulus.register( 'sites', SitesController )
