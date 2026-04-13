document.addEventListener('DOMContentLoaded', function() {
    var cartProducts = JSON.parse(localStorage.getItem("cart")) || [];
    var productsContainer = document.querySelector(".checkout__products");
    var subTotal = 0;
    var shippingFee = cartProducts.length > 0 ? 10 : 0; 

    function showTopBanner(message, isError = false) {
        const banner = document.createElement('div');
        banner.className = `fixed top-0 left-0 w-full p-4 text-center text-white font-bold z-50 transition-all duration-300 ${isError ? 'bg-red-600' : 'bg-green-600'}`;
        banner.innerText = message;
        document.body.prepend(banner);
    }

    function cleanPrice(p) {
        if (!p) return 0;
        return parseFloat(p.toString().replace(/[^0-9.]/g, '')) || 0;
    }

    if (productsContainer) {
        if (cartProducts.length === 0) {
            productsContainer.innerHTML = `<p class="text-center text-gray-500 py-4">Your cart is empty.</p>`;
        } else {
            productsContainer.innerHTML = cartProducts.map(item => {
                var price = cleanPrice(item.productPrice);
                var itemTotal = price * item.productQuantity;
                subTotal += itemTotal;

                return `
                    <div class="flex justify-between items-center py-3 border-b dark:border-gray-800">
                        <div class="flex items-center gap-3">
                            <img src="${item.productImage}" class="w-12 h-12 object-cover rounded shadow-sm">
                            <div>
                                <p class="font-bold text-sm text-gray-800 dark:text-white">${item.productName}</p>
                                <p class="text-xs text-gray-500">Qty: ${item.productQuantity}</p>
                            </div>
                        </div>
                        <span class="font-bold dark:text-white">$${itemTotal.toFixed(2)}</span>
                    </div>`;
            }).join('');
        }

        document.getElementById("subtotal").innerText = `$${subTotal.toFixed(2)}`;
        document.getElementById("final-total").innerText = `$${(subTotal + shippingFee).toFixed(2)}`;
    }

    const placeOrderBtn = document.querySelector(".checkout__place-order-btn");
    
    if (placeOrderBtn) {
        placeOrderBtn.onclick = function(e) {
            e.preventDefault();

            if (cartProducts.length === 0) {
                showTopBanner("Your cart is empty!", true);
                return;
            }

            localStorage.removeItem("cart");
            
            if (window.updateGlobalCartCount) {
                window.updateGlobalCartCount();
            }

            showTopBanner("Order placed successfully! Redirecting...");

            setTimeout(() => {
                window.location.href = "home.html";
            }, 2000);
        };
    }
});