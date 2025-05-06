    let photos = [];

    function addPhoto() {
      const upload = document.getElementById('photoUpload');
      const tagsInput = document.getElementById('tagInput').value;

      if (!upload.files[0]) {
        alert("Please select a photo to upload.");
        return;
      }

      const reader = new FileReader();
      reader.onload = function(e) {
        const imageSrc = e.target.result;
        const tags = tagsInput.split(',').map(tag => tag.trim().toLowerCase()).filter(tag => tag);

        const photo = {
          src: imageSrc,
          tags: tags
        };
        photos.push(photo);
        displayPhotos();
        updateFilterTags();
      };
      reader.readAsDataURL(upload.files[0]);
      document.getElementById('tagInput').value = '';
      upload.value = null;
    }

    function displayPhotos(filterTag = null) {
      const grid = document.getElementById('photoGrid');
      grid.innerHTML = '';

      const filteredPhotos = filterTag ? photos.filter(p => p.tags.includes(filterTag)) : photos;

      for (const photo of filteredPhotos) {
        const card = document.createElement('div');
        card.className = 'photo-card';
        card.innerHTML = `
          <img src="${photo.src}" alt="Uploaded Photo" />
          <div class="photo-tags">${photo.tags.join(', ')}</div>
        `;
        grid.appendChild(card);
      }
    }

    function updateFilterTags() {
      const tagSet = new Set();
      photos.forEach(photo => photo.tags.forEach(tag => tagSet.add(tag)));

      const tagFilter = document.getElementById('tagFilter');
      tagFilter.innerHTML = '';

      tagSet.forEach(tag => {
        const tagElement = document.createElement('div');
        tagElement.className = 'tag';
        tagElement.innerText = tag;
        tagElement.onclick = () => displayPhotos(tag);
        tagFilter.appendChild(tagElement);
      });
    }

