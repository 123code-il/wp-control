import { Controller } from '@hotwired/stimulus';
import { isEmpty, last, findIndex } from 'lodash';
import jQuery from 'jquery';

import {
  SITE_TPL,
  SITE_ADD_TPL,
  SITE_EDIT_TPL,
  ACTION_TPL
} from '~/src/javascripts/templates/sites_templates';

export default class extends Controller {
  static targets = [
    'label',
    'url',
    'wpAdminPath',
  ]

  async connect() {
    // await chrome.storage.sync.clear();
    await this.#set_sites();
    this.#render();
    console.log('init:', this.storage.sites);

    jQuery('#sites-table tfoot').html(SITE_ADD_TPL);
  }

  async add() {
    const newSite = {
      id: this.#newSiteId(),
      label: this.labelTarget.value,
      url: this.urlTarget.value,
      wpAdminPath: this.wpAdminPathTarget.value.trim() ? this.wpAdminPathTarget.value : '/wp-admin'
    };

    this.#set_sites( newSite );

    this.labelTarget.value = '';
    this.urlTarget.value = '';
    this.wpAdminPathTarget.value = '';

    this.#render('update', newSite.id);
  }

  async edit(event) {
    const siteId = parseInt( event.target.value );
    this.#render('edit', siteId);
  }

  async done(event) {
    const siteId = parseInt( event.target.value );

    this.storage.sites[siteId] = {
      id: siteId,
      label: this.labelTarget.value,
      url: this.urlTarget.value,
      wpAdminPath: this.wpAdminPathTarget.value.trim() ? this.wpAdminPathTarget.value : '/wp-admin'
    };

    await chrome.storage.sync.set({ sites: this.storage.sites });

    this.#render();
  }

  async remove(event) {
    const siteId = parseInt( event.target.value );
    const removeId = findIndex( this.storage.sites, { id: siteId });

    this.storage.sites.splice(removeId, 1);
    await chrome.storage.sync.set({ sites: this.storage.sites });

    this.#render();
  }

  async #set_sites( site = null ) {
    console.log('site:', site);

    if (site) {
      this.storage.sites.push(site);
      await chrome.storage.sync.set({ sites: this.storage.sites });
    }

    this.storage = await chrome.storage.sync.get();

    if ( isEmpty(this.storage) ) {
      await chrome.storage.sync.set({ sites: [] });
      this.storage = await chrome.storage.sync.get();
    }
  }

  #newSiteId() {
    return ( this.storage.sites.length ? last( this.storage.sites ).id : 0 ) + 1;
  }

  #render( action, siteId = 0 ) {
    const $sitesTable = jQuery('#sites-table tbody');
    const $addSites   = jQuery('#sites-table tfoot');

    $sitesTable.empty();
    $addSites.empty();

    if ( ! this.storage.sites.length ) {
      return false;
    }

    const sites = this.storage.sites;
    const siteRows = [];
    let editMode = false;

    for ( let [siteIndex, site] of sites.entries() ) {
      console.log(siteIndex, site);
      let siteRow = '';

      if ( action == 'edit' && siteId == siteIndex ) {
        editMode = true;

        siteRow = SITE_EDIT_TPL
          .replace(/{{ index }}/g, siteIndex + 1)
          .replace(/{{ label }}/g, site.label)
          .replace(/{{ url }}/g, site.url)
          .replace(/{{ wpAdminPath }}/g, site.wpAdminPath)
          .replace(/{{ actions }}/g, this.#renderActions( action, site.id ));
      } else {
        siteRow = SITE_TPL
          .replace(/{{ index }}/g, siteIndex + 1)
          .replace(/{{ label }}/g, site.label)
          .replace(/{{ url }}/g, site.url)
          .replace(/{{ wpAdminPath }}/g, site.wpAdminPath)
          .replace(/{{ actions }}/g, this.#renderActions( action, site.id ));
      }

      siteRows.push(siteRow);
    }

    $sitesTable.html(siteRows);
    $addSites.html(SITE_ADD_TPL);
  }

  #renderActions( action = '', siteId ) {
    switch( action ) {
      case 'edit':
        return [
          ACTION_TPL
            .replace(/{{ action }}/g, 'done')
            .replace(/{{ actionText }}/g, 'Done')
            .replace(/{{ siteId }}/g, siteId),
          ACTION_TPL
            .replace(/{{ action }}/g, 'remove')
            .replace(/{{ actionText }}/g, 'Remove')
            .replace(/{{ siteId }}/g, siteId)
        ].join('');
        break;
      default:
        return ACTION_TPL
          .replace(/{{ action }}/g, 'edit')
          .replace(/{{ actionText }}/g, 'Edit')
          .replace(/{{ siteId }}/g, siteId);
    }
  }
}
