import { Controller } from '@hotwired/stimulus'

import { SitesIndexRender } from '~/src/javascripts/renders/sites_index_render'
import SiteModel from '~/src/javascripts/models/site_model'

export default class SitesController extends Controller {
  static targets = ['list']

  connect () {
    this.index()
  }

  async index () {
    SitesIndexRender( this.element, await SiteModel.all() )
  }

  create () {
    console.log( 'CREATE' )
  }

  edit () {
    console.log( 'EDIT' )
  }

  remove () {
    console.log( 'REMOVE' )
  }
}
