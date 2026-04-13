function renderCart() {
    var cart = JSON.parse(localStorage.getItem("cart")) || [];
    var tbody = document.querySelector(".cart__body");
    var subtotalDisplay = document.querySelector(".subtotal-val");
    if (!tbody) return;

    tbody.innerHTML = "";
    var total = 0;

    if (cart.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="py-20 text-center text-gray-400">Your cart is empty</td></tr>';
        subtotalDisplay.innerText = "$0.00";
        return;
    }

    cart.forEach((item, index) => {
        var price = parseFloat(item.productPrice);
        var lineTotal = price * item.productQuantity;
        total += lineTotal;

        tbody.innerHTML += `
            <tr class="border-b dark:border-gray-800">
                <td class="py-6 flex items-center gap-4">
                    <img src="${item.productImage}" class="w-20 h-20 object-cover rounded-lg">
                    <span class="font-bold dark:text-white">${item.productName}</span>
                </td>
                <td class="dark:text-gray-300">$${price.toFixed(2)}</td>
                <td>
                    <div class="flex items-center border w-fit rounded-lg dark:border-gray-700">
                        <button onclick="updateQty(${index}, -1)" class="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white">-</button>
                        <span class="px-4 dark:text-white">${item.productQuantity}</span>
                        <button onclick="updateQty(${index}, 1)" class="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white">+</button>
                    </div>
                </td>
                <td class="font-bold text-primary">$${lineTotal.toFixed(2)}</td>
            </tr>`;
    });

    subtotalDisplay.innerText = `$${total.toFixed(2)}`;
}

window.updateQty = function(index, delta) {
    var cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].productQuantity += delta;
    if (cart[index].productQuantity <= 0) cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    if (window.updateGlobalCartCount) window.updateGlobalCartCount();
};

document.addEventListener('DOMContentLoaded', renderCart);