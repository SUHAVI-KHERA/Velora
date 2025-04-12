document.addEventListener('DOMContentLoaded', () => {
    const productDetails = document.getElementById('productDetails');
    const loadingState = document.getElementById('loadingState');
    const errorState = document.getElementById('errorState');
    const addToCartBtn = document.getElementById('addToCartBtn');
    const addToWishlistBtn = document.getElementById('addToWishlistBtn');

    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        showError('Product ID not found');
        return;
    }

    // Fetch product details
    async function fetchProductDetails() {
        try {
            loadingState.classList.remove('hidden');
            errorState.classList.add('hidden');
            productDetails.classList.add('hidden');

            const response = await fetch(`http://localhost:8086/api/product/${productId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch product details');
            }

            const product = await response.json();
            displayProductDetails(product);
        } catch (error) {
            console.error('Error fetching product details:', error);
            showError('Failed to load product details');
        } finally {
            loadingState.classList.add('hidden');
        }
    }

    // Display product details
    function displayProductDetails(product) {
        // Update product image
        const productImage = document.getElementById('productImage');
        productImage.innerHTML = `
            <div class="relative w-full" style="padding-top: 100%;">
                <div class="absolute inset-0 bg-gray-200 rounded-lg overflow-hidden">
                    <img src="http://localhost:8086/api/product/${product.id}/image" 
                         alt="${product.name}" 
                         class="w-full h-full object-cover"
                         onerror="this.onerror=null; this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5Ob0ltYWdlPC90ZXh0Pjwvc3ZnPg=='">
                </div>
            </div>
        `;

        // Update product information
        document.getElementById('productName').textContent = product.name;
        document.getElementById('productDescription').textContent = product.description;
        document.getElementById('productPrice').textContent = `$${product.price}`;
        document.getElementById('productCategory').textContent = product.category;
        document.getElementById('productReleaseDate').textContent = product.releaseDate;
        document.getElementById('productStock').textContent = product.stockQuantity;

        // Update availability status
        const availabilitySpan = document.getElementById('productAvailability');
        availabilitySpan.textContent = product.productAvailable ? 'In Stock' : 'Out of Stock';
        availabilitySpan.className = `ml-4 text-sm px-3 py-1 rounded-full ${
            product.productAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`;

        // Update button states
        addToCartBtn.disabled = !product.productAvailable;
        if (!product.productAvailable) {
            addToCartBtn.classList.add('opacity-50', 'cursor-not-allowed');
        }

        // Show product details
        productDetails.classList.remove('hidden');
    }

    // Show error state
    function showError(message) {
        errorState.classList.remove('hidden');
        productDetails.classList.add('hidden');
        const errorMessage = errorState.querySelector('p');
        errorMessage.textContent = message;
    }

    // Add to cart functionality
    addToCartBtn.addEventListener('click', () => {
        // TODO: Implement add to cart functionality
        alert('Product added to cart!');
    });

    // Add to wishlist functionality
    addToWishlistBtn.addEventListener('click', () => {
        // TODO: Implement add to wishlist functionality
        alert('Product added to wishlist!');
    });

    // Initial fetch
    fetchProductDetails();
}); 