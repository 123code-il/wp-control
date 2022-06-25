import { normalizeTemplate } from '~/src/javascripts/helpers'

import SitesIndexView from 'bundle-text:~/src/views/sites/index_view.html'
import SitesListItemView from 'bundle-text:~/src/views/sites/partials/list_item_view.html'

const faviconRetrieve = ( url ) => {
  return `https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${url}&size=32`
}

export function SitesIndexRender ( element, data ) {
  const template = normalizeTemplate( SitesIndexView )
  element.insertAdjacentHTML( 'afterbegin', template )

  SitesListRender( element.querySelector( '.page--list ul' ), data )
}

export function SitesListRender ( element, data ) {
  const template = normalizeTemplate( SitesListItemView )
  const siteList = []

  for ( const site in data ) {
    const siteItem = template
      .replace( /{{ favicon }}/g, faviconRetrieve( site.url ) )
      .replace( /{{ label }}/g, site.label )
      .replace( /{{ url }}/g, site.url )
      .replace( /{{ urlAdmin }}/g, site.url + site.wpAdminPath )

    siteList.push( siteItem )
  }

  element.insertAdjacentHTML( 'afterbegin', siteList.join( '' ) )
}
