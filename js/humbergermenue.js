document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.classList.add('dark');
        updateThemeIcons('dark');
    }

    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('theme')) {
            document.documentElement.classList.toggle('dark');
            const isDark = document.documentElement.classList.contains('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            updateThemeIcons(isDark ? 'dark' : 'light');
        }
    });

    function updateThemeIcons(theme) {
        document.querySelectorAll('.theme').forEach(icon => {
            if (theme === 'dark') {
                icon.classList.replace('fa-moon', 'fa-sun');
            } else {
                icon.classList.replace('fa-sun', 'fa-moon');
            }
        });
    }

    window.updateGlobalCartCount = function() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const totalItems = cart.reduce((acc, item) => acc + item.productQuantity, 0);
        document.querySelectorAll(".cart-number").forEach(el => el.innerText = totalItems);
    };

    window.showToast = function(message) {
        const toast = document.createElement('div');
        toast.className = "fixed bottom-5 right-5 bg-black text-white px-6 py-3 rounded-lg shadow-2xl transition-all duration-500 transform translate-y-20 opacity-0 z-[9999]";
        toast.innerHTML = `<i class="fa-solid fa-circle-check text-primary mr-2"></i> ${message}`;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.remove('translate-y-20', 'opacity-0');
        }, 100);

        setTimeout(() => {
            toast.classList.add('translate-y-20', 'opacity-0');
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    };

    updateGlobalCartCount();
});

window.showNotification = function(message) {
    const existing = document.querySelector('.custom-notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = 'custom-notification';
    
    Object.assign(notification.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: '#f45d96',
        color: 'white',
        padding: '15px 25px',
        borderRadius: '8px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
        zIndex: '10000',
        fontWeight: 'bold',
        fontFamily: 'Quicksand, sans-serif',
        transition: 'transform 0.5s ease, opacity 0.5s ease',
        transform: 'translateY(100px)',
        opacity: '0'
    });

    notification.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${message}`;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.transform = 'translateY(0)';
        notification.style.opacity = '1';
    }, 100);

    setTimeout(() => {
        notification.style.transform = 'translateY(100px)';
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
};