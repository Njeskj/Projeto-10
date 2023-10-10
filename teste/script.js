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

// Event listener para adicionar um item ao carrinho
document.getElementById('product-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
        const productId = parseInt(e.target.parentElement.getAttribute('data-id'));
        addToCart(productId);
    }
});

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

// Função para finalizar o pedido e adicionar ao arquivo 'pedidos.json'
function finalizeOrder() {
    const confirmation = confirm('Deseja finalizar o pedido?');
    if (confirmation) {
        // Adicione o pedido atual à lista de pedidos
        orders.push([...cart]);

        // Atualize o arquivo 'pedidos.json' com os novos pedidos
        updateOrdersFile();

        // Limpe o carrinho após o pedido ser finalizado
        cart.length = 0;
        updateCart(); // Atualizar o carrinho vazio
    }
}

// Função para atualizar o arquivo 'pedidos.json' com os novos pedidos
function updateOrdersFile() {
    const jsonData = JSON.stringify(orders);

    // Use uma função de servidor ou tecnologia adequada para atualizar o arquivo 'pedidos.json'
    // Aqui, um exemplo fictício é usado para simular a atualização

    // Suponha que você tenha uma função para atualizar o arquivo JSON
    // Exemplo fictício: updateJSONFile('pedidos.json', jsonData);
}

// Event listener para o botão "Finalizar Pedido"
document.getElementById('checkout-button').addEventListener('click', finalizeOrder);

// Inicializar o carrinho
updateCart();

// Array para armazenar os pedidos
const orders = [];

// Exemplo de como adicionar pedidos diretamente no arquivo JSON
const exampleOrder = [
    { id: 1, name: 'Produto 1', price: 10.00, quantity: 2 },
    { id: 2, name: 'Produto 2', price: 15.00, quantity: 1 },
];

// Função para atualizar um arquivo JSON com novos dados
function updateJSONFile(filename, newData) {
    const fs = require('fs'); // Módulo 'fs' para manipulação de arquivos (Node.js)

    // Caminho do arquivo JSON
    const filePath = `./${filename}`;

    try {
        // Lê o arquivo JSON atual
        const currentData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        // Adiciona os novos dados ao arquivo JSON
        currentData.push(newData);

        // Escreve os dados atualizados de volta no arquivo JSON
        fs.writeFileSync(filePath, JSON.stringify(currentData, null, 2), 'utf-8');

        console.log(`Dados adicionados a ${filename}.`);
    } catch (error) {
        console.error(`Erro ao atualizar ${filename}: ${error}`);
    }
}

// Exemplo de como usar a função updateJSONFile para atualizar o arquivo 'pedidos.json'
const newOrder = [
    { id: 1, name: 'Produto 1', price: 10.00, quantity: 2 },
    { id: 2, name: 'Produto 2', price: 15.00, quantity: 1 },
];

updateJSONFile('pedidos.json', newOrder);

// Adicione pedidos de exemplo diretamente no array "orders"
orders.push(exampleOrder);
