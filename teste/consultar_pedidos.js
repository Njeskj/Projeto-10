// Função para carregar e exibir os pedidos na página
function loadOrders() {
    // Faz uma requisição para o arquivo 'pedidos.json'
    fetch('pedidos.json')
        .then(response => response.json())
        .then(data => {
            const orderList = document.getElementById('order-list');
            orderList.innerHTML = ''; // Limpa a lista de pedidos

            // Itera pelos pedidos e os exibe na página
            data.forEach((order, index) => {
                const listItem = document.createElement('li');
                listItem.textContent = `Pedido ${index + 1}: ${JSON.stringify(order)}`;
                orderList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar os pedidos:', error);
        });
}

// Carrega os pedidos quando a página é carregada
window.addEventListener('load', loadOrders);
