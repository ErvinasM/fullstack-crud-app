class ContentFormComponent { 
    htmlElement;
    onSubmit;
    titleInput;
    yearInput;
    descInput;
    subInput;
    posterInput;
    videoInput;
    formNameElement;
    submitButton;
  
    constructor({ onSubmit }) {
      this.htmlElement = document.createElement('form');
      this.htmlElement.className = 'shadow p-3';
      this.htmlElement.innerHTML = `
        <h2 class="h5 text-center">Create Content</h2>
        <div class="mb-3">
          <label for="title" class="form-label">Title</label>
          <input type="text" class="form-control" id="title" name="title">
        </div>
        <div class="mb-3">
          <label for="year" class="form-label">Year</label>
          <input type="number" class="form-control" id="year" name="year">
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">Description</label>
          <input type="text" class="form-control" id="description" name="description">
        </div>
        <div class="mb-3">
          <label for="subscription" class="form-label">Subscription level</label>
          <input type="number" class="form-control" id="subscription" min="1" max="3" name="subscription">
        </div>
        <div class="mb-3">
          <label for="poster" class="form-label">Poster URL</label>
          <input type="text" class="form-control" id="poster" name="poster">
        </div>
        <div class="mb-3">
          <label for="video" class="form-label">Video URL</label>
          <input type="text" class="form-control" id="video" name="video">
        </div>
        <button type="submit" class="btn btn-success w-100">Create content</button>`;
      this.onSubmit = onSubmit;
      this.titleInput = this.htmlElement.querySelector('[name=title]');
      this.yearInput = this.htmlElement.querySelector('[name=year]');
      this.descInput = this.htmlElement.querySelector('[name=description]');
      this.subInput = this.htmlElement.querySelector('[name=subscription]');
      this.posterInput = this.htmlElement.querySelector('[name=poster]');
      this.videoInput = this.htmlElement.querySelector('[name=video]');
      this.formNameElement = this.htmlElement.querySelector('h2');
      this.submitButton = this.htmlElement.querySelector('button');
  
      this.htmlElement.addEventListener('submit', this.handleSubmit);
    }
  
    handleSubmit = (event) => {
      event.preventDefault();
  
      const formData = new FormData(event.target);
      const values = {
        title: formData.get('title'),
        year: formData.get('year'),
        description: formData.get('description'),
        subscription: formData.get('subscription'),
        poster: formData.get('poster'),
        video: formData.get('video'),
      }
  
      this.onSubmit(values);
  
      event.target.reset();
    }
  
    enableEditing = ({ title, year, description, subscription, poster, video }) => {
      this.titleInput.value = title;
      this.yearInput.value = year;
      this.descInput.value = description;
      this.subInput.value = subscription;
      this.posterInput.value = poster;
      this.videoInput.value = video;
      this.formNameElement.innerText = 'Update Content';
      this.submitButton.innerText = 'Update Content';
      this.submitButton.className = 'btn btn-warning w-100';
    }
  
    disableEditing = () => {
      this.htmlElement.reset();
      this.formNameElement.innerText = 'Create Content';
      this.submitButton.innerText = 'Update Content';
      this.submitButton.className = 'btn btn-success w-100';
    }
  }
  
  export default ContentFormComponent;