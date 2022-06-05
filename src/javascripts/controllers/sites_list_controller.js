import { Controller } from '@hotwired/stimulus';
import { isEmpty, sortBy } from 'lodash';
import { LIST_ITEM_TPL } from '~/src/javascripts/templates/list_templates';
import jQuery from 'jquery';

export default class extends Controller {
  async connect() {
    this.$el = jQuery('#sites-list ul');

    await this.#set_sites();
    this.#render();
  }

  #favicon_retrieve( url ) {
    return `https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${url}&size=32`;
  }

  #render() {
    const sites = sortBy( this.storage.sites, (site) => site.label );
    const siteRows = [];
    console.log('init:', this.storage.sites);

    this.$el.empty();

    for ( const site of sites ) {
      console.log(this.#favicon_retrieve( site.url ));
      const siteRow = LIST_ITEM_TPL
        .replace( /{{ favicon }}/g, this.#favicon_retrieve( site.url ) )
        .replace( /{{ label }}/g, site.label )
        .replace( /{{ url }}/g, site.url )
        .replace( /{{ url_admin }}/g, site.url + site.wpAdminPath );

      siteRows.push(siteRow);
    }

    this.$el.html(siteRows);
  }

  async #set_sites( site = null ) {
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
}
