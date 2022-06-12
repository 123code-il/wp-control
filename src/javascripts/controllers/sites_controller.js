import { Controller } from '@hotwired/stimulus'
import jQuery from 'jquery'

export default class SitesController extends Controller {
  async connect () {
    this.$el = jQuery( '#sites-list ul' )
  }

  create () {
    console.log( 'something' )
  }
}
