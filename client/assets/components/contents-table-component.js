class ContentTableComponent {
    htmlElement;
    tbody;
    onDelete;
    onEdit;
    editedRowId;
  
    constructor({ contents, onDelete, onEdit }) {
      this.htmlElement = document.createElement('table');
      this.htmlElement.className = 'table table-striped';
      this.htmlElement.innerHTML = ` 
      <thead class="bg-dark text-white">
      <tr>
      <th scope="col">#</th>
      <th scope="col">Title</th>
      <th scope="col">Year</th>
      <th scope="col">Subscription</th>
      <th>Actions</th>
      </tr>
      </thead>
      <tbody></tbody>`;
      this.tbody = this.htmlElement.querySelector('tbody');
      this.onDelete = onDelete;
      this.onEdit = onEdit;
      this.editedRowId = null;
  
      this.renderContents(contents, null);
    }
  
    createRowHtmlElement = (content) => {
      const { id, title, year, subscription } = content;
      const tr = document.createElement('tr');
      const thisRowIsEdited = id === this.editedRowId;
      if (thisRowIsEdited) tr.classList.add('bg-edited');
      tr.innerHTML = `
        <td>${id}</td>
        <td>${title}</td>
        <td>${year}</td>
        <td>${subscription}</td>
        <td>
          <div class="d-flex justify-content-end gap-2">
            <button class="btn btn-warning btn-sm">${thisRowIsEdited ? 'Cancel' : '⟳'}</button>
            <button class="btn btn-danger btn-sm">✕</button>
          </div>
        </td>`;
  
      const deleteButton = tr.querySelector('.btn-danger');
      deleteButton.addEventListener('click', () => this.onDelete(id));
  
      const updateButton = tr.querySelector('.btn-warning');
      updateButton.addEventListener('click', () => this.onEdit(content));
  
      return tr;
    }
  
    renderContents(contents, editedRowId) {
      this.editedRowId = editedRowId;
      const rowsHtmlElements = contents.map(this.createRowHtmlElement);
  
      this.tbody.innerHTML = null;
      this.tbody.append(...rowsHtmlElements);
    }
  }
  
  export default ContentTableComponent;