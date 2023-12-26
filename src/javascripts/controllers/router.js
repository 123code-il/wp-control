import { Controller } from '@hotwired/stimulus'

export default class RouterController extends Controller {
  static targets = ['header', 'main']

  initialize () {
    switch ( window.location.hash ) {
      default: {
        this.mainTarget.setAttribute( 'data-controller', 'sites' )
      }
    }
  }
}
