import { Application } from '@hotwired/stimulus'
import SitesController from '~/src/javascripts/controllers/sites_controller'

const Stimulus = window.Stimulus = Application.start()

Stimulus.register( 'sites', SitesController )
