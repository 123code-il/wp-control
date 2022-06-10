export const SITE_TPL = `
  <tr>01
    <td>{{ index }}</td>
    <td>{{ label }}</td>
    <td><a class="link" href="{{ url }}" target="_blank">{{ url }}</a></td>
    <td><a class="link" href="{{ url }}{{ wpAdminPath }}" target="_blank">{{ wpAdminPath }}</a></td>
    <td>{{ actions }}</td>
  </tr>
`

export const SITE_ADD_TPL = `
  <tr>
    <td>+</td>
    <td>
      <input data-sites_table-target="label" type="text" placeholder="Label" />
    </td>
    <td>
      <input data-sites_table-target="url" type="text" placeholder="https://" />
    </td>
    <td>
      <input data-sites_table-target="wpAdminPath" type="text" placeholder="/wp-admin" />
    </td>
    <td>
      <button type="button" class="add-btn" data-action="click->sites_table#add">Add</button>
    </td>
  </tr>
`

export const SITE_EDIT_TPL = `
  <tr>
    <td>%</td>
    <td>
      <input data-sites_table-target="label" type="text" placeholder="Label" value="{{ label }}" />
    </td>
    <td>
      <input data-sites_table-target="url" type="text" placeholder="https://" value="{{ url }}" />
    </td>
    <td>
      <input data-sites_table-target="wpAdminPath" type="text" placeholder="/wp-admin" value="{{ wpAdminPath }}" />
    </td>
    <td>
      {{ actions }}
    </td>
  </tr>
`

export const ACTION_TPL = `
  <button class="{{ action }}-btn" type="button" data-action="click->sites_table#{{ action }}" value="{{ siteId }}">
    {{ actionText }}
  </button>
`
