  var pagination = document.querySelector(".pagination");

// Generate the initial pagination buttons
updatePagination();

function updatePagination() {
  var gallery = document.querySelector(".gallery");
  var totalImages = parseInt(gallery.getAttribute("data-total-images"));
  var imagesPerPage = 15;
  var totalPages = Math.ceil(totalImages / imagesPerPage);
  var currentPage = 1;

  // Remove any existing pagination buttons
  while (pagination.firstChild) {
    pagination.removeChild(pagination.firstChild);
  }

  // Generate new pagination buttons based on the total number of pages
  if (totalPages > 1) {
    var button = document.createElement("button");
    button.innerHTML = "«";
    button.addEventListener("click", function() {
      if (currentPage > 1) {
        currentPage--;
        showPage(currentPage, imagesPerPage);
      }
    });
    pagination.appendChild(button);

    for (var i = 1; i <= totalPages; i++) {
      var button = document.createElement("button");
      button.innerHTML = i;
      button.addEventListener("click", function() {
        currentPage = parseInt(this.innerHTML);
        showPage(currentPage, imagesPerPage);
      });
      pagination.appendChild(button);
      if (i === 5) {
        break;
      }
    }

    if (totalPages > 5) {
      var button = document.createElement("button");
      button.innerHTML = "...";
      button.disabled = true;
      pagination.appendChild(button);

      var button = document.createElement("button");
      button.innerHTML = totalPages;
      button.addEventListener("click", function() {
        currentPage = parseInt(this.innerHTML);
        showPage(currentPage, imagesPerPage);
      });
      pagination.appendChild(button);
    }

    var button = document.createElement("button");
    button.innerHTML = "»";
    button.addEventListener("click", function() {
      if (currentPage < totalPages) {
        currentPage++;
        showPage(currentPage, imagesPerPage);
      }
    });
    pagination.appendChild(button);
  }

  // Show the first page by default
  showPage(1, imagesPerPage);
}

function showPage(page, imagesPerPage) {
  var gallery = document.querySelector(".gallery");
  var totalImages = parseInt(gallery.getAttribute("data-total-images"));
  var startIndex = (page - 1) * imagesPerPage;
  var endIndex = Math.min(startIndex + imagesPerPage, totalImages);

  // Show or hide images based on the current page
  var images = gallery.querySelectorAll("img");
  for (var i = 0; i < totalImages; i++) {
    if (i >= startIndex && i < endIndex) {
      images[i].style.display = "block";
    } else {
      images[i].style.display = "none";
    }
  }

  lazyLoad.update(); // re-scan the page for new images to load

  // Remove the active class from all pagination buttons
  var paginationButtons = document.querySelectorAll('.pagination button');
  paginationButtons.forEach(function(button) {
    button.classList.remove('active');
  });

  // Add the active class to the current page button
  var currentPageButton = document.querySelector('.pagination button:nth-child(' + (page + 1) + ')');
  if (currentPageButton) {
    currentPageButton.classList.add('active');
  }
}

var lazyLoad = new LazyLoad({
  threshold: 500 // load images 500 pixels before they become visible
});
