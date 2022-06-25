export const normalizeTemplate = ( tpl ) => {
  return tpl.replace( /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '' )
}
