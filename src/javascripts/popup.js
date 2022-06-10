import { Application } from '@hotwired/stimulus'
import SitesListController from '~/src/javascripts/controllers/sites_list_controller'
import SitesController from '~/src/javascripts/controllers/sites_controller'

const Stimulus = window.Stimulus = Application.start()

Stimulus.register( 'sites_list', SitesListController )
Stimulus.register( 'sites', SitesController )
