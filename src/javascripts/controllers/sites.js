import { Controller } from '@hotwired/stimulus'

import Template from '~/src/javascripts/helpers/template'

// import SiteModel from '~/src/javascripts/models/site'

export default class SitesController extends Controller {
  async connect () {
    await this.index()
  }

  async index () {
    await Template.render( this.element, '/templates/sites' )
    // await Template.render( this.element.querySelector( '.page--list ul' ), '/templates/sites/list-item', SiteModel.all )
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
