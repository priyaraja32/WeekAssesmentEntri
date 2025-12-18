const container = document.getElementById("container");

function searchProducts() {
  let input = document.getElementById("searchInput").value.toLowerCase();
  let products = document.querySelectorAll(".product-card");

  products.forEach(product => {
    let title = product.querySelector("h3").innerText.toLowerCase();
    product.style.display = title.includes(input) ? "block" : "none";
  });
}

// Load all products
async function getAllProduct() {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();

  container.innerHTML = "";

  data.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p><strong>Price:</strong> $${product.price}</p>
      <p>${product.description.substring(0, 100)}...</p>

      <button class="edit-btn" onclick="openEditForm(${product.id})">Edit</button>
      <button class="delete-btn" onclick="deleteProduct(${product.id})">Delete</button>
    `;

    container.appendChild(card);
  });
}

// ADD PRODUCT
let popup = null;

function openAddForm() {
  popup = document.createElement("div");
  popup.className = "edit-popup";

  popup.innerHTML = `
    <div class="edit-box">
        <h2>Add New Product</h2>

        <label>Title</label>
        <input type="text" id="addTitle">

        <label>Price</label>
        <input type="number" id="addPrice">

        <label>Description</label>
        <textarea id="addDesc"></textarea>

        <label>Image URL</label>
        <input type="text" id="addImage">

        <button onclick="addProduct()" class="save-btn">Add</button>
        <button onclick="closePopup()" class="cancel-btn">Cancel</button>
    </div>
  `;

  document.body.appendChild(popup);
}

function closePopup() {
  if (popup) {
    popup.remove();
    popup = null;
  }
}

// ADD PRODUCT (POST)
async function addProduct() {
  const newProduct = {
    title: document.getElementById("addTitle").value,
    price: document.getElementById("addPrice").value,
    description: document.getElementById("addDesc").value,
    image: document.getElementById("addImage").value,
    category: "general"
  };

  const res = await fetch("https://fakestoreapi.com/products", {
    method: "POST",
    body: JSON.stringify(newProduct),
    headers: { "Content-Type": "application/json" }
  });

  const data = await res.json();
  console.log("Added:", data);

  closePopup();
  getAllProduct();
}

// EDIT PRODUCT
let editForm = null;

async function openEditForm(id) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product = await res.json();

  editForm = document.createElement("div");
  editForm.className = "edit-popup";

  editForm.innerHTML = `
    <div class="edit-box">
        <h2>Edit Product</h2>

        <label>Title</label>
        <input type="text" id="editTitle" value="${product.title}">

        <label>Price</label>
        <input type="number" id="editPrice" value="${product.price}">

        <label>Description</label>
        <textarea id="editDesc">${product.description}</textarea>

        <label>Image URL</label>
        <input type="text" id="editImage" value="${product.image}">

        <button onclick="updateProduct(${id})" class="save-btn">Update</button>
        <button onclick="closeEditForm()" class="cancel-btn">Cancel</button>
    </div>
  `;

  document.body.appendChild(editForm);
}

function closeEditForm() {
  if (editForm) {
    editForm.remove();
    editForm = null;
  }
}

// UPDATE PRODUCT
async function updateProduct(id) {
  const updatedProduct = {
    title: document.getElementById("editTitle").value,
    price: document.getElementById("editPrice").value,
    description: document.getElementById("editDesc").value,
    image: document.getElementById("editImage").value
  };

  const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(updatedProduct),
    headers: { "Content-Type": "application/json" }
  });

  const data = await response.json();
  console.log("Updated:", data);

  closeEditForm();
  getAllProduct();
}

// DELETE PRODUCT
async function deleteProduct(productId) {
  const response = await fetch(`https://fakestoreapi.com/products/${productId}`, {
    method: "DELETE"
  });

  const data = await response.json();
  console.log("Deleted:", data);

  getAllProduct();
}

// Load products
getAllProduct();






