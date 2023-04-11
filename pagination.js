var pagination = document.querySelector(".pagination");

// Generate the initial pagination buttons
updatePagination();

// Update the pagination buttons every 10 seconds
setInterval(updatePagination, 10000);

function updatePagination() {
  var gallery = document.querySelector(".gallery");
  var totalImages = parseInt(gallery.getAttribute("data-total-images"));
  var imagesPerPage = 15;
  var totalPages = Math.ceil(totalImages / imagesPerPage);

  // Remove any existing pagination buttons
  while (pagination.firstChild) {
    pagination.removeChild(pagination.firstChild);
  }

  // Generate new pagination buttons based on the total number of pages
  for (var i = 1; i <= totalPages; i++) {
    var button = document.createElement("button");
    button.innerHTML = i;
    button.addEventListener("click", function() {
      showPage(parseInt(this.innerHTML), imagesPerPage);
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
}

var lazyLoad = new LazyLoad({
  threshold: 500 // load images 500 pixels before they become visible
});
