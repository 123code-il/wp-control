import { Controller } from '@hotwired/stimulus'

import { renderTemplate } from '~/src/javascripts/helpers'
// import SiteModel from '~/src/javascripts/models/site'

export default class SitesController extends Controller {
  async connect () {
    await this.index()
  }

  async index () {
    await renderTemplate( this.element, '/templates/sites' )
    // await renderTemplate( this.element.querySelector( '.page--list ul' ), '/views/sites/list-item', SiteModel.all )
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
