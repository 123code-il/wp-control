import { Application } from '@hotwired/stimulus'
import Controller from '~/src/javascripts/controllers/sites_table_controller'

const Stimulus = window.Stimulus = Application.start()

Stimulus.register( 'sites_table', Controller )
