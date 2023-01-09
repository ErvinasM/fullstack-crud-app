import AlertComponent from "../components/alert-component.js";
import ContentFormComponent from "../components/content-form-component.js";
import ContentTableComponent from "../components/contents-table-component.js";
import ContainerComponent from "../components/container-component.js";
import FlexContainerComponent from "../components/flex-container-component.js";
import ApiService from "../services/api-service.js";

let contentTableComponent;
let contentFormComponent;
let alertComponent;

let contents;
let editedRowId = null;

const handleContentDelete = async (id) => {
  try {
    await ApiService.deleteContent(id);
    contents = await ApiService.getContent();
    contentTableComponent.renderContents(contents, editedRowId);
  } catch (error) {
    alertComponent.show(error.message);
  }
}

const handleContentCreate = async (contentProps) => {
  try {
    await ApiService.createContent(contentProps);
    contents = await ApiService.getContent();
    contentTableComponent.renderContents(contents, editedRowId);
  } catch (error) {
    alertComponent.show(error.message);
  }
}

const handleContentUpdate = async (contentProps) => {
  try {
    await ApiService.updateContent(editedRowId, contentProps);
    contents = await ApiService.getContent();
    editedRowId = null;
    contentFormComponent.disableEditing();
    contentTableComponent.renderContents(contents, editedRowId);
  } catch (error) {
    alertComponent.show(error.message);
  }
}

const handleContentEdit = (contentProps) => {
  if (editedRowId === contentProps.id) editedRowId = null;
  else editedRowId = contentProps.id;

  contentTableComponent.renderContents(contents, editedRowId);
  if (editedRowId === null) {
    contentFormComponent.disableEditing();
    contentFormComponent.onSubmit = handleContentCreate;
  } else {
    contentFormComponent.enableEditing(contentProps);
    contentFormComponent.onSubmit = handleContentUpdate;
  }
}

(async function initialize() {
  const rootHtmlElement = document.querySelector('#root');
  const containerComponent = new ContainerComponent();
  alertComponent = new AlertComponent();
  containerComponent.addComponents(alertComponent);
  rootHtmlElement.append(containerComponent.htmlElement);
  try {
    contents = await ApiService.getContent();
    contentTableComponent = new ContentTableComponent({
      contents,
      onDelete: handleContentDelete,
      onEdit: handleContentEdit,
    });
    contentFormComponent = new ContentFormComponent({
      onSubmit: handleContentCreate,
    });
    const flexContainerComponent = new FlexContainerComponent();
    flexContainerComponent.addComponents(contentTableComponent, contentFormComponent);
    containerComponent.addComponents(flexContainerComponent);
  } catch (error) {
    alertComponent.show(error.message);
  }
})();