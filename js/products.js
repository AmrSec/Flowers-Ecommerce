var allProducts = [];
var request = new XMLHttpRequest();
request.open("GET", "../data.json");
request.send();

request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
        var data = JSON.parse(request.responseText);
        allProducts = data.products;
        displayProducts(allProducts);
        setupFilters();
    }
};

function setupFilters() {
    document.querySelectorAll('#filter-list li').forEach(item => {
        item.onclick = function() {
            document.querySelectorAll('#filter-list li').forEach(li => {
                li.className = "text-gray-400 hover:text-primary transition-colors py-1 cursor-pointer";
            });
            this.className = "text-primary border-b-2 border-primary py-1 cursor-pointer font-bold";
            
            var category = this.dataset.category;
            var filtered = (category === 'all') ? allProducts : allProducts.filter(p => p.category === category);
            displayProducts(filtered);
        };
    });
}

function displayProducts(productList) {
    var grid = document.getElementById("products-grid");
    if (!grid) return;
    grid.innerHTML = productList.map(product => `
        <div class="bg-white dark:bg-[#1a1a1a] rounded-xl overflow-hidden shadow-sm group border dark:border-gray-800 p-4">
            <div class="relative h-60 overflow-hidden rounded-lg mb-4">
                <img src="${product.thumbnail}" class="w-full h-full object-cover transition-transform group-hover:scale-105">
                <button onclick="addToCart(${product.id})" class="absolute bottom-4 right-4 bg-primary text-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div>
            <div class="text-center">
                <h4 class="font-bold dark:text-white truncate">
                    <a href="product-details.html?id=${product.id}">${product.title}</a>
                </h4>
                <p class="text-primary font-bold text-lg mt-1">$${product.price}</p>
            </div>
        </div>`).join('');
}

window.addToCart = function(id) {
    var cart = JSON.parse(localStorage.getItem("cart")) || [];
    var product = allProducts.find(p => p.id == id);
    var existing = cart.find(item => item.productID == id);
    if (existing) existing.productQuantity++;
    else cart.push({ productID: product.id, productName: product.title, productPrice: product.price, productImage: product.thumbnail, productQuantity: 1 });
    
    localStorage.setItem("cart", JSON.stringify(cart));
    if (window.updateGlobalCartCount) window.updateGlobalCartCount();
    if (window.showToast) window.showToast(`${product.title} Added!`);
};