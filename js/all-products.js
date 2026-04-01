var allProducts = [];
var productsContainer = document.querySelector(".products");

/* ========= GET CATEGORY FROM URL ========= */
function getCategoryFromURL() {
  var params = new URLSearchParams(window.location.search);
  return params.get("category");
}

/* ========= API REQUEST ========= */
var request = new XMLHttpRequest();
request.open("GET", "https://dummyjson.com/products?limit=100");
request.send();

request.onreadystatechange = function () {
  if (request.readyState === 4 && request.status === 200) {
    var data = JSON.parse(request.responseText);
    allProducts = data.products;

    var categoryFromURL = getCategoryFromURL();

    if (categoryFromURL) {
      var filtered = allProducts.filter(p => p.category === categoryFromURL);
      displayProducts(filtered);
      setActiveFilter(categoryFromURL);
    } else {
      displayProducts(allProducts);
    }

    setupCategoryFilters();
  }
};

/* ========= DISPLAY PRODUCTS ========= */
function displayProducts(arr) {
  productsContainer.innerHTML = "";

  arr.forEach(product => {
    productsContainer.innerHTML += `
      <div class="product">
        ${product.stock === 0 ? `<span class="badge out">OUT OF STOCK</span>` : ""}
        ${product.discountPercentage >= 15 ? `<span class="badge sale">SALE</span>` : ""}
        ${product.discountPercentage < 15 ? `<span class="badge new">NEW</span>` : ""}

        <img src="${product.thumbnail}">
        <h4>${product.title}</h4>
        <p>$${product.price}</p>
      </div>
    `;
  });
}

/* ========= FILTER BUTTONS ========= */
function setupCategoryFilters() {
  var filterButtons = document.querySelectorAll(".filter-controls li");

  for (var i = 0; i < filterButtons.length; i++) {
    filterButtons[i].onclick = function () {

      filterButtons.forEach(btn => btn.classList.remove("active"));
      this.classList.add("active");

      var category = this.dataset.category;

      if (category === "all") {
        displayProducts(allProducts);
      } else {
        var filteredProducts = allProducts.filter(p => p.category === category);
        displayProducts(filteredProducts);
      }
    };
  }
}

/* ========= SET ACTIVE FILTER ========= */
function setActiveFilter(category) {
  var filterButtons = document.querySelectorAll(".filter-controls li");

  filterButtons.forEach(btn => {
    btn.classList.remove("active");
    if (btn.dataset.category === category) {
      btn.classList.add("active");
    }
  });
}
