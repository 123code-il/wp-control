export const LIST_ITEM_TPL = `
  <li class="list-item">
    <div class="favicon">
      <img src="{{ favicon }}" alt="{{ label }}" />
    </div>

    <article class="site">
      <h3 class="label">
        {{ label }}
      </h3>

      <p class="url">
        {{ url }}
      </p>
    </article>

    <div class="actions">
      <a href="{{ url }}" class="site" target="_blank" title="Site">
        <span class="dashicons dashicons-admin-site"></span>
      </a>

      <a href="{{ url_admin }}" class="admin" target="_blank" title="Admin">
        <span class="dashicons dashicons-dashboard"></span>
      </a>
    </div>
  </li>
`;
