// Array para armazenar os produtos
const products = [
    { id: 1, name: 'Produto 1', price: 10.00 },
    { id: 2, name: 'Produto 2', price: 15.00 },
    { id: 3, name: 'Produto 3', price: 20.00 },
];

// Array para armazenar os itens no carrinho
const cart = [];

// Função para calcular o total do carrinho
function calculateCartTotal() {
    let total = 0;
    for (const item of cart) {
        total += item.price * item.quantity;
    }
    return total.toFixed(2);
}

// Função para atualizar a exibição do carrinho
function updateCart() {
    const cartList = document.getElementById('cart-list');
    const cartTotal = document.getElementById('cart-total');
    cartList.innerHTML = '';
    cartTotal.textContent = `R$ ${calculateCartTotal()}`;
    for (const item of cart) {
        const li = document.createElement('li');
        li.classList.add('cart-item');
        li.innerHTML = `
            <span>${item.name} - R$ ${item.price.toFixed(2)} x ${item.quantity} = R$ ${(item.price * item.quantity).toFixed(2)}</span>
            <button class="remove-from-cart" data-id="${item.id}">Remover</button>
        `;
        cartList.appendChild(li);
    }
}

// Função para adicionar um produto ao carrinho
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCart();
    }
}

// Event listener para adicionar um item ao carrinho
document.getElementById('product-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
        const productId = parseInt(e.target.parentElement.getAttribute('data-id'));
        addToCart(productId);
    }
});

// Event listener para remover um item do carrinho
document.getElementById('cart-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-from-cart')) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        const index = cart.findIndex(item => item.id === productId);
        if (index !== -1) {
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
            } else {
                cart.splice(index, 1);
            }
            updateCart();
        }
    }
});

// Inicializar o carrinho
updateCart();
