const products = [
  {
    id: 1,
    name: "Kit huerto balcón",
    price: 18990,
    color: "#157347",
    icon: "MR",
    summary: "Macetas biodegradables, semillas y guía de cultivo para espacios pequeños.",
    description: "Kit inicial para cultivar hierbas en departamentos. Incluye instrucciones impresas y sustrato liviano."
  },
  {
    id: 2,
    name: "Botella térmica acero",
    price: 12990,
    color: "#0d6efd",
    icon: "BT",
    summary: "Botella reutilizable de 750 ml con tapa hermética.",
    description: "Mantiene líquidos fríos o calientes durante la jornada y reduce el uso de envases desechables."
  },
  {
    id: 3,
    name: "Bolsa compra plegable",
    price: 4990,
    color: "#6f42c1",
    icon: "BP",
    summary: "Bolsa resistente, lavable y compacta para compras diarias.",
    description: "Diseñada para soportar peso sin ocupar espacio en mochila o cartera."
  },
  {
    id: 4,
    name: "Set limpieza reutilizable",
    price: 15990,
    color: "#fd7e14",
    icon: "LR",
    summary: "Paños de fibra, cepillo de bambú y contenedor recargable.",
    description: "Alternativa ordenada para reducir residuos en rutinas de limpieza doméstica."
  }
];

const formatter = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0
});

function getCart() {
  return JSON.parse(localStorage.getItem("tiendAmbienteCart") || "[]");
}

function saveCart(cart) {
  localStorage.setItem("tiendAmbienteCart", JSON.stringify(cart));
  updateCartCount();
}

function addToCart(productId) {
  const cart = getCart();
  const item = cart.find((entry) => entry.id === productId);

  if (item) {
    item.quantity += 1;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }

  saveCart(cart);
}

function updateCartCount() {
  const counter = document.querySelector("#cart-count");
  if (!counter) return;
  const totalItems = getCart().reduce((total, item) => total + item.quantity, 0);
  counter.textContent = String(totalItems);
}

function renderProducts() {
  const container = document.querySelector("#product-list");
  if (!container) return;

  container.innerHTML = products.map((product) => `
    <article class="col-12 col-md-6 col-lg-3">
      <div class="card product-card h-100">
        <div class="product-illustration" style="--product-color: ${product.color};" aria-hidden="true">
          <span class="fw-bold">${product.icon}</span>
        </div>
        <div class="card-body d-flex flex-column">
          <h3 class="h5 card-title">${product.name}</h3>
          <p class="card-text text-secondary">${product.summary}</p>
          <p class="fw-bold mt-auto">${formatter.format(product.price)}</p>
          <div class="d-grid gap-2">
            <a class="btn btn-outline-success" href="producto.html?id=${product.id}">Ver más</a>
            <button class="btn btn-success" type="button" data-add="${product.id}">Agregar al carrito</button>
          </div>
        </div>
      </div>
    </article>
  `).join("");
}

function renderDetail() {
  const container = document.querySelector("#product-detail");
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const productId = Number(params.get("id") || products[0].id);
  const product = products.find((entry) => entry.id === productId) || products[0];

  document.title = `TiendAmbiente | ${product.name}`;
  container.innerHTML = `
    <div class="col-12 col-lg-6">
      <div class="product-illustration rounded shadow-sm" style="--product-color: ${product.color}; min-height: 320px;" aria-hidden="true">
        <span class="fw-bold">${product.icon}</span>
      </div>
    </div>
    <div class="col-12 col-lg-6">
      <p class="text-uppercase fw-bold text-success mb-2">Detalle de producto</p>
      <h1>${product.name}</h1>
      <p class="lead">${product.description}</p>
      <p class="display-6 fw-bold">${formatter.format(product.price)}</p>
      <button class="btn btn-success btn-lg" type="button" data-add="${product.id}">Agregar</button>
    </div>
  `;
}

function renderCart() {
  const container = document.querySelector("#cart-content");
  if (!container) return;

  const cart = getCart();
  if (cart.length === 0) {
    container.innerHTML = `
      <div class="p-4 text-center">
        <h2 class="h4">Tu carrito está vacío</h2>
        <p class="text-secondary">Agrega productos desde el catálogo para ver el contador y el listado.</p>
        <a class="btn btn-success" href="index.html#productos">Ir al catálogo</a>
      </div>
    `;
    return;
  }

  const rows = cart.map((item) => {
    const product = products.find((entry) => entry.id === item.id);
    const subtotal = product.price * item.quantity;
    return `
      <article class="cart-row">
        <div>
          <h2 class="h5 mb-1">${product.name}</h2>
          <p class="text-secondary mb-0">Cantidad: ${item.quantity} x ${formatter.format(product.price)}</p>
        </div>
        <p class="fw-bold mb-0">${formatter.format(subtotal)}</p>
      </article>
    `;
  }).join("");

  const total = cart.reduce((sum, item) => {
    const product = products.find((entry) => entry.id === item.id);
    return sum + product.price * item.quantity;
  }, 0);

  container.innerHTML = `
    ${rows}
    <div class="p-3 bg-light d-flex justify-content-between align-items-center">
      <strong>Total estimado</strong>
      <strong>${formatter.format(total)}</strong>
    </div>
  `;
}

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-add]");
  if (!button) return;
  addToCart(Number(button.dataset.add));
  button.textContent = "Agregado";
  window.setTimeout(() => {
    button.textContent = button.closest("#product-detail") ? "Agregar" : "Agregar al carrito";
  }, 900);
});

document.querySelector("#clear-cart")?.addEventListener("click", () => {
  saveCart([]);
  renderCart();
});

updateCartCount();
renderProducts();
renderDetail();
renderCart();

