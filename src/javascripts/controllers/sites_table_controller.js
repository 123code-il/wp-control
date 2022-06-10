import { Controller } from '@hotwired/stimulus'
import { isEmpty, last, findIndex } from 'lodash'
import jQuery from 'jquery'

import {
  SITE_TPL,
  SITE_ADD_TPL,
  SITE_EDIT_TPL,
  ACTION_TPL
} from '~/src/javascripts/templates/table_templates'

export default class extends Controller {
  static targets = [
    'label',
    'url',
    'wpAdminPath'
  ]

  async connect () {
    // await chrome.storage.sync.clear();
    // console.log('init:', this.storage.sites);

    await this.#set_sites()
    this.#render()
  }

  async add () {
    const newSite = {
      id: this.#newSiteId(),
      label: this.labelTarget.value,
      url: this.urlTarget.value,
      wpAdminPath: this.wpAdminPathTarget.value.trim() ? this.wpAdminPathTarget.value : '/wp-admin'
    }

    this.#set_sites( newSite )

    this.labelTarget.value = ''
    this.urlTarget.value = ''
    this.wpAdminPathTarget.value = ''

    this.#render( 'update', newSite.id )
  }

  async edit ( event ) {
    const siteId = parseInt( event.target.value )
    this.#render( 'edit', siteId )
  }

  async update ( event ) {
    const siteId = parseInt( event.target.value )
    const siteIndex = this.#findSiteIndex( siteId )

    this.storage.sites[siteIndex] = {
      id: siteId,
      label: this.labelTarget.value,
      url: this.urlTarget.value,
      wpAdminPath: this.wpAdminPathTarget.value.trim() ? this.wpAdminPathTarget.value : '/wp-admin'
    }

    await chrome.storage.sync.set( { sites: this.storage.sites } )
    this.#render()
  }

  async remove ( event ) {
    const siteId = parseInt( event.target.value )
    const removeId = this.#findSiteIndex( siteId )

    this.storage.sites.splice( removeId, 1 )
    await chrome.storage.sync.set( { sites: this.storage.sites } )

    this.#render()
  }

  async #set_sites ( site = null ) {
    if ( site ) {
      this.storage.sites.push( site )
      await chrome.storage.sync.set( { sites: this.storage.sites } )
    }

    this.storage = await chrome.storage.sync.get()

    if ( isEmpty( this.storage ) ) {
      await chrome.storage.sync.set( { sites: [] } )
      this.storage = await chrome.storage.sync.get()
    }
  }

  #newSiteId () {
    return ( this.storage.sites.length ? last( this.storage.sites ).id : 0 ) + 1
  }

  #findSiteIndex ( siteId ) {
    return findIndex( this.storage.sites, { id: siteId } )
  }

  #render ( action, siteId = 0 ) {
    const $sitesTable = jQuery( '#sites-table tbody' )
    const $addSites = jQuery( '#sites-table tfoot' )

    siteId = parseInt( siteId )
    $sitesTable.empty()
    $addSites.empty()

    const sites = this.storage.sites || []
    const siteRows = []
    let editMode = false

    for ( const [siteIndex, site] of sites.entries() ) {
      let siteRow = ''

      if ( action === 'edit' && siteId === site.id ) {
        editMode = true

        siteRow = SITE_EDIT_TPL
          .replace( /{{ index }}/g, siteIndex + 1 )
          .replace( /{{ label }}/g, site.label )
          .replace( /{{ url }}/g, site.url )
          .replace( /{{ wpAdminPath }}/g, site.wpAdminPath )
          .replace( /{{ actions }}/g, this.#renderActions( action, site.id ) )
      } else {
        siteRow = SITE_TPL
          .replace( /{{ index }}/g, siteIndex + 1 )
          .replace( /{{ label }}/g, site.label )
          .replace( /{{ url }}/g, site.url )
          .replace( /{{ wpAdminPath }}/g, site.wpAdminPath )
          .replace( /{{ actions }}/g, this.#renderActions( action, site.id ) )
      }

      siteRows.push( siteRow )
    }

    $sitesTable.html( siteRows )

    if ( !editMode || !this.storage.sites.length ) {
      $addSites.html( SITE_ADD_TPL )
    }
  }

  #renderActions ( action = '', siteId ) {
    switch ( action ) {
      case 'edit':
        return [
          ACTION_TPL
            .replace( /{{ action }}/g, 'update' )
            .replace( /{{ actionText }}/g, 'Update' )
            .replace( /{{ siteId }}/g, siteId ),
          ACTION_TPL
            .replace( /{{ action }}/g, 'remove' )
            .replace( /{{ actionText }}/g, 'Remove' )
            .replace( /{{ siteId }}/g, siteId )
        ].join( '' )
      default:
        return ACTION_TPL
          .replace( /{{ action }}/g, 'edit' )
          .replace( /{{ actionText }}/g, 'Edit' )
          .replace( /{{ siteId }}/g, siteId )
    }
  }
}
