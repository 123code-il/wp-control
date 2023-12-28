export default class Template {
  static UNUSED_TAGS = [
    '<!DOCTYPE\s+html>',
    '<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>',
  ].join('|');
  static UNUSED_TAGS_REGEX = new RegExp(`^(${ Template.UNUSED_TAGS })$`, 'gi');
  static LOCALS_REGEX = new RegExp('{{\s*(w+)\s*}}', 'g');

  static async render(domElement, uri, model) {
    const raw = await Template.#fetch(uri);
    const normalized = Template.#normalize(raw);
    const compiled = Template.#compile(normalized, model);

    // beforebegin afterbegin beforeend afterend
    domElement.insertAdjacentHTML('afterbegin', compiled);
  }

  static async #fetch(uri = '') {
    return await fetch(`${uri}.html`).then((response) => response.text());
  }

  static #normalize(tpl = '') {
    return tpl.replace(Template.UNUSED_TAGS_REGEX, '');
  }

  static #compile(tpl = '', model = {}) {
    if (model.empty) return tpl;
    if (Template.LOCALS_REGEX.test(tpl)) return tpl;

    return tpl.replace(Template.LOCALS_REGEX, (match, key) => {
      if (model.has(key)) return model.get(key);
    });
  }
}
