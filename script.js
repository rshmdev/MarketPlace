const jacketL = {
  id: "jacketL",
  img: "surf.png",
  imgTag: "Jaqueta preta",
  category: "Jaquetas",
  title: "Surf Jacket",
  description:
    "Essa jaqueta é uma combinaçao perfeita de conforto e qualidade...",
  price: 200,
};
const hat = {
  id: "hat",
  img: "chapeu.png",
  imgTag: "Boné preto",
  category: "Acessórios",
  title: "Bone Nike",
  description:
    "Feito de tecido macio, o boné Nike Sportswear...",
  price: 170,
};
const tenis = {
  id: "tenis",
  img: "air max.png",
  imgTag: "Tenis Air max",
  category: "Acessórios",
  title: "Air Max 97",
  description:
    "A marca do Swoosh não há de se negar, acumula ao longo de décadas muitas cartadas de sucesso dentro...",
  price: 1000,
};
const tshirtB = {
  id: "tshirtB",
  img: "camisa.png",
  imgTag: "Camiseta Nike",
  category: "Camisetas",
  title: "Camisa Nike Pebbles",
  description:
    "Essa camisa sensacional é perfeita para sair com os amigos e...",
  price: 169,
};
const tshirtW = {
  id: "tshirtW",
  img: "camisa basica.png",
  imgTag: "Camiseta branca com logo da nike",
  category: "Camisetas",
  title: "Camisa Basica Nike",
  description:
    "camisa basica super confortavel e resistente, fabricada com um tecido mais...",
  price: 70,
};
const jacketC = {
  id: "jacketC",
  img: "corta vento.png",
  imgTag: "Corta vento nike",
  category: "Jaquetas",
  title: "Corta vento nike runner",
  description:
    "Um look lendário remonta às suas raízes com a jaqueta Nike Sportswear...",
  price: 300,
};

const productsList = [jacketL, hat, tenis, tshirtB, tshirtW, jacketC];
const body = document.querySelector("body");
const main = document.querySelector("main");
const cartContainer = document.querySelector(".productsCart");
const cart = document.getElementById("cartHtml");
const cartHeader = document.getElementById("cartHeader");
const values = document.getElementById("values");
const quantityHtml = document.getElementById("quantityHtml");
const totalHtml = document.getElementById("totalHtml");
const quantityHeader = document.createElement("p");
const searchText = document.getElementById("searchText");
const searchButton = document.getElementById("searchButton");
let cartList = [];

createCards(productsList);
cartAssets();
mobileCartAssets();

const todosButton = document.getElementById("todos");
const acessoriosButton = document.getElementById("acessórios");
const jaquetasButton = document.getElementById("jaquetas");
const camisetasButton = document.getElementById("camisetas");
const buttonsArray = [
  todosButton,
  acessoriosButton,
  jaquetasButton,
  camisetasButton,
];
const buttonsHtml = document.getElementById("filter");
const filterImg = document.getElementById("filterImg");
let filterWasClicked = false;

buttonsArray.forEach((elem) => {
  elem.addEventListener(
    "click",
    () => {
      filterButton(elem.id);
    },
    false
  );
});

filterImg.addEventListener("click", filterToggle, false);

body.addEventListener(
  "click",
  () => {
    buttonsArray.forEach(function (elem) {
      if (elem.classList != "hide") {
        elem.classList = "hide";
      }
    });
    if (filterImg.classList == "hide") {
      filterImg.classList = "filterImg";
    }
  },
  true
);

searchButton.addEventListener("click", function (e) {
  e.preventDefault();
  filterText();
});

filterToggle();

function mobileCartAssets() {
  if (isMobile()) {
    let quantityRemove = document.getElementById("quantityContainer");
    values.removeChild(quantityRemove);
    cartHeader.classList = "headerCart emptyHeader";
    cartHeader.addEventListener("click", () => {
      if (cartIsEmpty() === false) {
        cartToggle();
      }
    });
  }
}

function hideCart() {
  cartContainer.classList = "hide";
  values.classList = "hide";
}

function headerCartCount() {
  quantityHeader.innerText = cartList.length;
  quantityHeader.classList = "counterHeader";
  cartHeader.appendChild(quantityHeader);
  if (cartIsEmpty()) {
    quantityHeader.classList = "hide";
  }
}

function cartToggle() {
  if (cartContainer.classList == "hide") {
    cartContainer.classList = "productsCart";
    values.classList = "valuesCart";
    cartHeader.classList = "headerCart";
  } else {
    cartHeader.classList = "headerCart emptyHeader";
    cartContainer.classList = "hide";
    values.classList = "hide";
  }
}

function isMobile() {
  if (window.innerWidth < 933) {
    return true;
  } else {
    return false;
  }
}

function isAlredyOnCart(product) {
  if (cartList.includes(product)) {
    return true;
  } else {
    return false;
  }
}

function whatAmount(product) {
  let amountHtml = document.getElementById(`amount${product.id}`);
  let amount = Number(amountHtml.innerText);
  return amount;
}

function addOneMore(product) {
  let amountHtml = document.getElementById(`amount${product.id}`);
  amountHtml.innerText = `${whatAmount(product) + 1}`;
}

function isProductMultiple(product) {
  if (whatAmount(product) > 1) {
    return true;
  } else {
    return false;
  }
}

function reduceOne(product) {
  let amountHtml = document.getElementById(`amount${product.id}`);
  amountHtml.innerText = `${whatAmount(product) - 1}`;
}

function removeFromCartList(product) {
  let y = false;
  for (let i = 0; y == false; i++) {
    if (cartList[i] == product) {
      cartList.splice(i, 1);
      y = true;
    }
  }
}

function calcTotal() {
  let valorTotal = 0;
  for (let i = 0; i < cartList.length; i++) {
    valorTotal += parseInt(cartList[i].price);
  }
  return valorTotal;
}

function recalcValues() {
  quantityHtml.innerText = cartList.length;
  let totalHtml = document.getElementById("totalHtml");
  totalHtml.innerText = calcTotal();
}

function removeEmptyMessage() {
  emptyCartHtml = document.getElementById("emptyCartMessage");
  cartContainer.classList = "productsCart";
  if (emptyCartHtml) {
    cartContainer.removeChild(emptyCartHtml);
    showValues();
  }
}

function createEmptyMessage() {
  let emptyCartHtml = document.createElement("p");
  emptyCartHtml.innerText = `Carrinho vazio
		Experimente adicionar algo ao carrinho`;
  emptyCartHtml.id = "emptyCartMessage";
  cartContainer.classList = "productsCart emptyCart";
  cartContainer.appendChild(emptyCartHtml);
}

function hideValues() {
  values.classList = "hide";
}

function showValues() {
  values.classList = "valuesCart";
}

function cartIsEmpty() {
  if (cartList.length == 0) {
    return true;
  } else {
    return false;
  }
}

function cartAssets() {
  if (isMobile()) {
    if (cartIsEmpty()) {
      hideCart();
    }
    headerCartCount();
  } else {
    if (cartIsEmpty()) {
      createEmptyMessage();
      hideValues();
    } else {
      removeEmptyMessage();
    }
  }
}

function removeFromCart(product) {
  if (isProductMultiple(product)) {
    reduceOne(product);
  } else {
    let idRemove = `cart${product.id}`;
    let toRemove = document.getElementById(idRemove);
    cartContainer.removeChild(toRemove);
  }

  removeFromCartList(product);
  recalcValues();
  cartAssets();
}

function addOnCart(product) {
  if (isAlredyOnCart(product)) {
    addOneMore(product);
  } else {
    let miniCard = document.createElement("div");
    let containerImgMini = document.createElement("div");
    let imgMini = document.createElement("img");
    let infoMini = document.createElement("div");
    let titleMini = document.createElement("h3");
    let priceMini = document.createElement("p");
    let quantityMini = document.createElement("p");
    let removeCart = document.createElement("button");

    miniCard.classList = "productMini";
    imgMini.src = product.img;
    imgMini.alt = product.imgTag;
    removeCart.innerHTML = "Remover produto";
    removeCart.id = `remove${product.id}`;
    miniCard.id = `cart${product.id}`;
    titleMini.innerText = product.title;
    priceMini.innerText = "R$ " + product.price + ".00";
    quantityMini.id = `amount${product.id}`;
    quantityMini.innerText = "1";
    miniCard.classList = "productsMini";
    containerImgMini.classList = "containerImageMini";
    imgMini.classList = "imageMini";
    infoMini.classList = "infoMini";
    titleMini.classList = "productTitle";
    priceMini.classList = "price";
    quantityMini.classList = "quantityMini";
    removeCart.classList = "removeCart";
    removeCart.addEventListener("click", function () {
      removeFromCart(product);
    });

    infoMini.appendChild(titleMini);
    infoMini.appendChild(priceMini);
    infoMini.appendChild(priceMini);
    infoMini.appendChild(quantityMini);
    infoMini.appendChild(removeCart);
    containerImgMini.appendChild(imgMini);
    miniCard.appendChild(containerImgMini);
    miniCard.appendChild(infoMini);
    cartContainer.appendChild(miniCard);
    miniCard.classList = "productMini";
  }
  cartList.push(product);
  recalcValues();
  cartAssets();
}

function createCards(productArray) {
  let containerProducts = document.createElement("div");
  containerProducts.classList = "products";
  containerProducts.id = "containerProducts";
  productArray.forEach(function (elem) {
    let card = document.createElement("div");
    let imgContainer = document.createElement("div");
    let image = document.createElement("img");
    let infoContainer = document.createElement("div");
    let categoryName = document.createElement("h3");
    let productTitle = document.createElement("h2");
    let description = document.createElement("p");
    let price = document.createElement("p");
    let addToCart = document.createElement("button");

    card.id = elem.id;
    image.src = elem.img;
    image.alt = elem.imgTag;
    categoryName.innerText = elem.category;
    productTitle.innerText = elem.title;
    description.innerText = elem.description;
    price.innerText = "R$ " + elem.price + ".00";

    addToCart.id = `cart${elem.id}`;

    card.classList = "cards";
    imgContainer.classList = "containerImage";
    image.classList = "image";
    infoContainer.classList = "containerInfo";
    categoryName.classList = "category";
    productTitle.classList = "productTitle";
    description.classList = "description";
    price.classList = "price";
    addToCart.classList = "addCart";
    card.appendChild(imgContainer);
    card.appendChild(infoContainer);
    imgContainer.appendChild(image);
    infoContainer.appendChild(categoryName);
    infoContainer.appendChild(productTitle);
    infoContainer.appendChild(description);
    infoContainer.appendChild(price);
    if (isMobile()) {
      let addToCartContainer = document.createElement("div");
      addToCartContainer.appendChild(addToCart);
      card.appendChild(addToCartContainer);
      addToCartContainer.classList = "containerAddToCart";
      addToCart.innerText = "Comprar";
      addToCartContainer.addEventListener("click", function () {
        addOnCart(elem);
      });
    } else {
      addToCart.addEventListener("click", function () {
        addOnCart(elem);
      });
      infoContainer.appendChild(addToCart);
      addToCart.innerText = "Adicionar ao carrinho";
    }
    containerProducts.appendChild(card);
  });

  main.appendChild(containerProducts);
}

function filterButton(category) {
  main.removeChild(document.getElementById("containerProducts"));
  let filteredList = productsList.filter((elem) => {
    if ((category == elem.category.toLowerCase()) | (category == "todos")) {
      return true;
    } else {
      return false;
    }
  });
  createCards(filteredList);
}

function filterToggle() {
  if (filterWasClicked === true) {
    if (filterImg.classList == "filterImg") {
      filterImg.classList = "hide";
    } else if (filterImg.classList == "hide") {
      filterImg.classList = "filterImg";
    }
  }
  filterWasClicked = true;
  buttonsArray.forEach(function (elem) {
    if (elem.classList != "hide") {
      elem.classList = "hide";
    } else {
      elem.classList = "filterButton";
    }
  });
}

function filterText() {
  let search = searchText.value.toLowerCase();
  main.removeChild(document.getElementById("containerProducts"));
  let filteredList = productsList.filter((elem) => {
    let titleSearch = elem.title.toLowerCase()
    let categorySearch = elem.category.toLowerCase()
    if (
      (categorySearch.includes(search)) |
      (search == "todos") |
      (titleSearch.includes(search))
    ) {
      return true;
    } else {
      return false;
    }
  });
  createCards(filteredList);
}
