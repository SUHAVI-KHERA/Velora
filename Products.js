document.addEventListener('DOMContentLoaded', () => {
    const productsGrid = document.getElementById('productsGrid');
    const loadingState = document.getElementById('loadingState');
    const errorState = document.getElementById('errorState');
    const categoryFilter = document.getElementById('categoryFilter');
    const availabilityFilter = document.getElementById('availabilityFilter');

    let products = [];

    // Fetch products from API
    async function fetchProducts() {
        try {
            loadingState.classList.remove('hidden');
            errorState.classList.add('hidden');
            productsGrid.innerHTML = '';

            const response = await fetch('http://localhost:8086/api/products');
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }

            products = await response.json();
            displayProducts(products);
        } catch (error) {
            console.error('Error fetching products:', error);
            errorState.classList.remove('hidden');
            productsGrid.innerHTML = '';
        } finally {
            loadingState.classList.add('hidden');
        }
    }

    // Display products in the grid
    function displayProducts(productsToDisplay) {
        productsGrid.innerHTML = productsToDisplay.map(product => `
            <div class="product-card bg-white rounded-lg shadow-md overflow-hidden">
                <div class="p-4">
                    <a href="ProductDetail.html?id=${product.id}" class="block">
                        <div class="relative w-full" style="padding-top: 100%;">
                            <div class="absolute inset-0 bg-gray-200 rounded-lg overflow-hidden">
                                <img src="http://localhost:8086/api/product/${product.id}/image" 
                                     alt="${product.name}" 
                                     class="w-full h-full object-cover"
                                     onerror="this.onerror=null; this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4='">
                            </div>
                        </div>
                        <h3 class="text-lg font-semibold text-gray-800 mb-2 mt-4">${product.name}</h3>
                        <p class="text-gray-600 text-sm mb-2">${product.description}</p>
                    </a>
                    <div class="flex justify-between items-center">
                        <span class="text-lg font-bold text-gray-900">$${product.price}</span>
                        <span class="text-sm ${product.productAvailable ? 'text-green-600' : 'text-red-600'}">
                            ${product.productAvailable ? 'In Stock' : 'Out of Stock'}
                        </span>
                    </div>
                    <div class="mt-4">
                        <button class="w-full bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors ${!product.productAvailable ? 'opacity-50 cursor-not-allowed' : ''}"
                                ${!product.productAvailable ? 'disabled' : ''}
                                onclick="addToCart(${product.id})">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Filter products based on selected filters
    function filterProducts() {
        const category = categoryFilter.value;
        const availability = availabilityFilter.value;

        let filteredProducts = [...products];

        if (category) {
            filteredProducts = filteredProducts.filter(product => product.category === category);
        }

        if (availability !== '') {
            filteredProducts = filteredProducts.filter(product => 
                product.productAvailable.toString() === availability
            );
        }

        displayProducts(filteredProducts);
    }

    // Add to cart functionality
    window.addToCart = function(productId) {
        // TODO: Implement add to cart functionality
        alert('Product added to cart!');
    };

    // Event listeners
    categoryFilter.addEventListener('change', filterProducts);
    availabilityFilter.addEventListener('change', filterProducts);

    // Initial fetch
    fetchProducts();
}); 