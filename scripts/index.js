// ── Selección de elementos ──────────────────────────────────────────────────

// Perfil
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");

// Popup EDITAR PERFIL
const editButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__close");
const formElement = document.querySelector(".popup__form");
const inputName = document.querySelector("#popup-name");
const inputProfession = document.querySelector("#popup-about");

// Popup AGREGAR TARJETA
const addButton = document.querySelector(".profile__add-button");
const popupAdd = document.querySelector(".popup-add");
const closeAddButton = document.querySelector(".popup__close_add");
const formAdd = document.querySelector(".popup__form_add");
const inputTitle = document.querySelector("#title-input");
const inputUrl = document.querySelector("#url-input");

// Popup IMAGEN AMPLIADA
const popupImage = document.querySelector(".popup-image");
const closeImgButton = document.querySelector(".popup__close_image");
const zoomImage = document.querySelector(".popup__zoom-image");
const zoomCaption = document.querySelector(".popup__zoom-caption");

// Cards
const templateCard = document.querySelector(".template-card");
const cardsList = document.querySelector(".cards__list");

// ── Tarjetas iniciales ──────────────────────────────────────────────────────

const initialCards = [
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
  {
    name: "Vanoise National",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
];

// ── Funciones de popup ──────────────────────────────────────────────────────

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    if (openedPopup) closePopup(openedPopup);
  }
}

function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
}

function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
}

// Cerrar al hacer clic en el overlay (fondo oscuro)
[popup, popupAdd, popupImage].forEach(function (p) {
  p.addEventListener("click", function (evt) {
    if (evt.target === p) closePopup(p);
  });
});

// ── Popup: Editar perfil ────────────────────────────────────────────────────

editButton.addEventListener("click", function () {
  inputName.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;
  resetValidation(formElement, validationConfig);
  openPopup(popup);
});

closeButton.addEventListener("click", function () {
  closePopup(popup);
});

formElement.addEventListener("submit", function (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputProfession.value;
  closePopup(popup);
});

// ── Popup: Agregar tarjeta ──────────────────────────────────────────────────

addButton.addEventListener("click", function () {
  formAdd.reset();
  resetValidation(formAdd, validationConfig);
  openPopup(popupAdd);
});

closeAddButton.addEventListener("click", function () {
  closePopup(popupAdd);
});

formAdd.addEventListener("submit", function (evt) {
  evt.preventDefault();
  createCard(inputTitle.value, inputUrl.value);
  closePopup(popupAdd);
});

// ── Popup: Imagen ampliada ──────────────────────────────────────────────────

closeImgButton.addEventListener("click", function () {
  closePopup(popupImage);
});

function openImagePopup(name, link) {
  zoomImage.src = link;
  zoomImage.alt = name;
  zoomCaption.textContent = name;
  openPopup(popupImage);
}

// ── Función crear tarjeta ───────────────────────────────────────────────────

function createCard(name, link) {
  const clone = templateCard.content
    .querySelector(".cards__content")
    .cloneNode(true);
  const cardTitle = clone.querySelector(".cards__content-description");
  const cardImage = clone.querySelector(".cards__content-image");
  const likeBtn = clone.querySelector(".cards__content-like");
  const trashBtn = clone.querySelector(".cards__trash-button");

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  // Like toggle
  likeBtn.addEventListener("click", function () {
    likeBtn.classList.toggle("cards__content-like--active");
  });

  // Eliminar tarjeta
  trashBtn.addEventListener("click", function () {
    clone.remove();
  });

  // Abrir imagen ampliada
  cardImage.addEventListener("click", function () {
    openImagePopup(name, link);
  });

  cardsList.prepend(clone);
}

// ── Renderizar tarjetas iniciales ───────────────────────────────────────────

initialCards.forEach(function (item) {
  createCard(item.name, item.link);
});
