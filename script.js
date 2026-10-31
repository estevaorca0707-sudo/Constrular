// BANCO DE PRODUTOS

const products = [
    {
        id: 1,
        name: "Cimento Todas as Obras 50kg",
        category: "Cimento",
        price: 38.90,
        old: 44.90,
        image: "https://images.unsplash.com/photo-1513467655676-561b7d489a88?auto=format&fit=crop&w=700&q=85",
        tag: "Oferta",
        rating: "4,9 (128)"
    },
    {
        id: 2,
        name: "Kit de ferramentas profissional",
        category: "Ferramentas",
        price: 129.90,
        image: "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?auto=format&fit=crop&w=700&q=85",
        tag: "Destaque",
        rating: "4,8 (86)"
    },
    {
        id: 3,
        name: "Tinta acrílica branca 18L",
        category: "Tintas",
        price: 219.90,
        old: 249.90,
        image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=700&q=85",
        tag: "Oferta",
        rating: "4,9 (54)"
    },
    {
        id: 4,
        name: "Lâmpada LED 12W",
        category: "Elétrica",
        price: 12.50,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=85",
        rating: "4,7 (39)"
    },
    {
        id: 5,
        name: "Torneira para banheiro",
        category: "Hidráulica",
        price: 74.90,
        image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=700&q=85",
        rating: "4,8 (41)"
    },
    {
        id: 6,
        name: "Furadeira de impacto",
        category: "Ferramentas",
        price: 289.90,
        old: 319.90,
        image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=700&q=85",
        tag: "Oferta",
        rating: "4,9 (73)"
    },
    {
        id: 7,
        name: "Tinta colorida 3,6L",
        category: "Tintas",
        price: 89.90,
        image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=700&q=85",
        rating: "4,6 (28)"
    },
    {
        id: 8,
        name: "Tubo PVC para água 3m",
        category: "Hidráulica",
        price: 24.90,
        image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=700&q=85",
        rating: "4,8 (62)"
    },
    {
        id: 9,
        name: "Argamassa AC-II 20kg",
        category: "Cimento",
        price: 31.90,
        image: "https://images.unsplash.com/photo-1513467655676-561b7d489a88?auto=format&fit=crop&w=700&q=85",
        rating: "4,7 (33)"
    },
    {
        id: 10,
        name: "Jogo de chaves manuais",
        category: "Ferramentas",
        price: 59.90,
        image: "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?auto=format&fit=crop&w=700&q=85",
        rating: "4,8 (47)"
    },
    {
        id: 11,
        name: "Revestimento cerâmico",
        category: "Acabamento",
        price: 54.90,
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=700&q=85",
        rating: "4,9 (19)"
    },
    {
        id: 12,
        name: "Tinta para acabamento 3,6L",
        category: "Acabamento",
        price: 99.90,
        image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=700&q=85",
        rating: "4,7 (22)"
    }
];

// ELEMENTOS

const $ = id => document.getElementById(id);

const money = value => value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
});

let cart = [];
let favorites = new Set();

// EXIBIR PRODUTOS

function renderProducts() {

    const search = $("searchInput").value
        .trim()
        .toLowerCase();

    const category = $("categoryFilter").value;
    const sort = $("sortFilter").value;

    let filtered = products.filter(product => {

        const matchesSearch =
            product.name.toLowerCase().includes(search) ||
            product.category.toLowerCase().includes(search);

        const matchesCategory =
            category === "Todos" ||
            product.category === category;

        return matchesSearch && matchesCategory;

    });

    if (sort === "low") {
        filtered.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
        filtered.sort((a, b) => b.price - a.price);
    }

    if (sort === "name") {
        filtered.sort((a, b) =>
            a.name.localeCompare(b.name, "pt-BR")
        );
    }

    $("productGrid").innerHTML = filtered.map(product => `

        <article class="product-card">

            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                >

                ${product.tag ? `
                    <span class="product-tag ${product.old ? "sale" : ""}">
                        ${product.tag}
                    </span>
                ` : ""}

                <button
                    class="favorite ${favorites.has(product.id) ? "liked" : ""}"
                    data-favorite="${product.id}"
                    aria-label="Favoritar produto"
                >♥</button>

            </div>

            <div class="product-info">

                <span class="product-category">
                    ${product.category}
                </span>

                <h3>${product.name}</h3>

                <div class="rating">
                    ★★★★★ <span>${product.rating}</span>
                </div>

                <div class="product-bottom">

                    <div class="price-area">

                        ${product.old ? `
                            <small class="old-price">
                                ${money(product.old)}
                            </small>
                        ` : ""}

                        <span class="price">
                            ${money(product.price)}
                        </span>

                    </div>

                    <button
                        class="add-button"
                        data-add="${product.id}"
                    >
                        + Adicionar
                    </button>

                </div>

            </div>

        </article>

    `).join("");

    $("emptyState").hidden = filtered.length > 0;

    $("resultCount").textContent =
        `Exibindo ${filtered.length} de ${products.length} produtos`;

}

// FAVORITOS E CARRINHO

$("productGrid").addEventListener("click", event => {

    const addButton = event.target.closest("[data-add]");
    const favoriteButton = event.target.closest("[data-favorite]");

    if (addButton) {

        const id = Number(addButton.dataset.add);

        const product = cart.find(item => item.id === id);

        if (product) {
            product.quantity++;
        } else {

            const selected = products.find(item => item.id === id);

            cart.push({
                ...selected,
                quantity: 1
            });

        }

        renderCart();

        toast("Produto adicionado ao carrinho!");

    }

    if (favoriteButton) {

        const id = Number(favoriteButton.dataset.favorite);

        if (favorites.has(id)) {
            favorites.delete(id);
        } else {
            favorites.add(id);
        }

        renderProducts();

    }

});

// ATUALIZAR CARRINHO

function renderCart() {

    const quantity = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    $("cartCount").textContent = quantity;

    if (cart.length === 0) {

        $("cartItems").innerHTML = `
            <div class="empty-cart">
                <span>🛒</span>
                <b>Seu carrinho está vazio</b>
                <small>Adicione produtos para começar.</small>
            </div>
        `;

    } else {

        $("cartItems").innerHTML = cart.map(item => `

            <div class="cart-line">

                <div>
                    <strong>${item.name}</strong>

                    <small>
                        ${money(item.price)} cada
                    </small>

                </div>

                <div class="quantity">

                    <button
                        data-change="${item.id}"
                        data-delta="-1"
                    >−</button>

                    <span>${item.quantity}</span>

                    <button
                        data-change="${item.id}"
                        data-delta="1"
                    >+</button>

                </div>

            </div>

        `).join("");

    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    $("cartTotal").textContent = money(total);

}

// ALTERAR QUANTIDADE

$("cartItems").addEventListener("click", event => {

    const button = event.target.closest("[data-change]");

    if (!button) return;

    const id = Number(button.dataset.change);
    const delta = Number(button.dataset.delta);

    const product = cart.find(item => item.id === id);

    product.quantity += delta;

    if (product.quantity <= 0) {

        cart = cart.filter(item => item.id !== id);

    }

    renderCart();

});

// NOTIFICAÇÕES

function toast(message) {

    const element = $("toast");

    element.textContent = message;

    element.classList.add("show");

    clearTimeout(toast.timer);

    toast.timer = setTimeout(() => {
        element.classList.remove("show");
    }, 2300);

}

// ABRIR E FECHAR CARRINHO

function openCart() {

    $("cartDrawer").classList.add("open");
    $("overlay").classList.add("open");

}

function closeCart() {

    $("cartDrawer").classList.remove("open");
    $("overlay").classList.remove("open");

}

$("cartButton").addEventListener("click", openCart);

$("closeCart").addEventListener("click", closeCart);

$("overlay").addEventListener("click", closeCart);

// FILTROS

$("searchInput").addEventListener(
    "input",
    renderProducts
);

$("categoryFilter").addEventListener(
    "change",
    renderProducts
);

$("sortFilter").addEventListener(
    "change",
    renderProducts
);

// CATEGORIAS

document.querySelectorAll(".category-card").forEach(button => {

    button.addEventListener("click", () => {

        const category = button.dataset.category;

        $("categoryFilter").value = category;

        renderProducts();

        $("produtos").scrollIntoView({
            behavior: "smooth"
        });

    });

});

// LIMPAR FILTROS

$("clearFilters").addEventListener("click", () => {

    $("searchInput").value = "";

    $("categoryFilter").value = "Todos";

    $("sortFilter").value = "featured";

    renderProducts();

});

// MENU RESPONSIVO

$("menuToggle").addEventListener("click", () => {

    const navbar = $("navbar");

    navbar.classList.toggle("open");

    $("menuToggle").textContent =
        navbar.classList.contains("open") ? "×" : "☰";

});

document.querySelectorAll("#navbar a").forEach(link => {

    link.addEventListener("click", () => {

        $("navbar").classList.remove("open");

        $("menuToggle").textContent = "☰";

    });

});

// ÁREA DO CLIENTE

$("accountButton").addEventListener("click", () => {

    $("accountModal").classList.add("open");

});

$("closeModal").addEventListener("click", () => {

    $("accountModal").classList.remove("open");

});

$("modalOk").addEventListener("click", () => {

    $("accountModal").classList.remove("open");

});

// FECHAR MODAL CLICANDO FORA

$("accountModal").addEventListener("click", event => {

    if (event.target === $("accountModal")) {

        $("accountModal").classList.remove("open");

    }

});

// FINALIZAR ORÇAMENTO

$("checkout").addEventListener("click", () => {

    if (cart.length === 0) {

        toast("Seu carrinho está vazio!");

        return;

    }

    const phone = "5500000000000";

    let message = "Olá! Gostaria de solicitar um orçamento:%0A%0A";

    cart.forEach(item => {

        message +=
            `${item.quantity}x ${item.name} - ${money(item.price * item.quantity)}%0A`;

    });

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    message += `%0ATotal estimado: ${money(total)}`;

    window.open(
        `https://wa.me/${phone}?text=${message}`,
        "_blank"
    );

});

// TECLA ESC

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closeCart();

        $("accountModal").classList.remove("open");

        $("navbar").classList.remove("open");

    }

});

// INICIALIZAÇÃO

renderProducts();

renderCart();