export const normalizeTemplate = ( tpl ) => {
  return tpl.replace( /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '' )
}

export const templateCompile = ( tpl = '', data = {} ) => {
  const TEMPALTE = normalizeTemplate( tpl )
  const PLACEHOLDER_REGEX = new RegExp( /{{\s*(\w+)\s*}}/, 'g' )
  const PLACEHOLDERS = Object.keys( data );
  if ( !PLACEHOLDERS.length ) return TEMPALTE;

  // return tpl.replace( PLACEHOLDER_REGEX, ( match, key ) => {
  TEMPALTE.replace(PLACEHOLDER_REGEX, (match, key) => {
    console.log(match, key);
    // if (PLACEHOLDERS.includes(key)) {
    //   return data[key];
    // }
  });

  return TEMPALTE
}

export const renderTemplate = async ( domElement, templateUri, modelData ) => {
  const template = await fetch( `${templateUri}.html` ).then( response => response.text() )
  const templateCompiled = templateCompile( template, modelData )
  domElement.insertAdjacentHTML( 'afterbegin', templateCompiled )
}

/*
  element
    .select('.page--list ul')
    .render('empty', '~/src/views/sites/index_view.html', data = {} || [{}, {}, {}]);
    .render('~/src/views/sites/index_view.html', data);

  element
    .render('/views/sites')

  element
    .select('.page--list ul')
    .render('/views/sites/list-item', data);

  export function SitesIndexRender ( element, data ) {
    const template = templateCompile( SitesIndexView )
    element.insertAdjacentHTML( 'afterbegin', template )

    SitesListRender( element.querySelector( '.page--list ul' ), data )
  }

  export function SitesListRender ( element, data ) {
    const siteList = []

    for ( const site in data ) {
      siteList.push(
        templateCompile( SitesListItemView, site )
      )
    }

    element.insertAdjacentHTML( 'afterbegin', siteList.join( '' ) )
  }

  const siteItem = template
    .replace( /{{ favicon }}/g, faviconRetrieve( site.url ) )
    .replace( /{{ label }}/g, site.label )
    .replace( /{{ url }}/g, site.url )
    .replace( /{{ urlAdmin }}/g, site.url + site.wpAdminPath )
*/

export const faviconRetrieve = ( url ) => {
  return `https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${url}&size=32`
}
