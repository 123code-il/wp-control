export const SITE_TPL = `
  <tr>01
    <td>{{ id }}</td>
    <td>{{ label }}</td>
    <td>{{ url }}</td>
    <td>{{ wpAdminPath }}</td>
    <td>{{ actions }}</td>
  </tr>
`;

export const SITE_ADD_TPL = `
  <tr>
    <td>+</td>
    <td>
      <input data-sites-target="label" type="text" placeholder="Label" />
    </td>
    <td>
      <input data-sites-target="url" type="text" placeholder="https://" />
    </td>
    <td>
      <input data-sites-target="wpAdminPath" type="text" placeholder="/wp-admin" />
    </td>
    <td>
      <button type="button" class="add-link" data-action="click->sites#add">Add</button>
    </td>
  </tr>
`;

export const SITE_EDIT_TPL = `
  <tr>
    <td>%</td>
    <td>
      <input data-sites-target="label" type="text" placeholder="Label" value="{{ label }}" />
    </td>
    <td>
      <input data-sites-target="url" type="text" placeholder="https://"  value="{{ url }}" />
    </td>
    <td>
      <input data-sites-target="wpAdminPath" type="text" placeholder="/wp-admin"  value="{{ wpAdminPath }}" />
    </td>
    <td>
      {{ actions }}
    </td>
  </tr>
`;

export const ACTION_TPL = `
  <button class="{{ action }}-link" type="button" data-action="click->sites#{{ action }}" value="{{ siteId }}">
    {{ actionText }}
  </button>
`;
