const editButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__close");
const formElement = document.querySelector(".popup__form");
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");
const inputName = document.querySelector("#popup-name");
const inputProfession = document.querySelector("#popup-about");
const templateCard = document.querySelector(".template-card");
const cardsList = document.querySelector(".cards__list");

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

initialCards.forEach(function (item) {
  createCard(item.name, item.link);
});

function createCard(name, link) {
  const cloneCard = templateCard.content
    .querySelector(".cards__content")
    .cloneNode(true);
  const cardTitle = cloneCard.querySelector(".cards__content-description");
  const cardImage = cloneCard.querySelector(".cards__content-image");
  const cardLikeButton = cloneCard.querySelector(".cards__content-like");

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  cardLikeButton.addEventListener("click", function () {
    cardLikeButton.classList.toggle("cards__content-like_active");
  });

  cardsList.prepend(cloneCard);
}

function openPopup() {
  popup.classList.add("popup_opened");
  // Cargar valores actuales en los inputs
  inputName.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

// Event listeners
editButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);

// Cerrar popup al hacer clic en el overlay
popup.addEventListener("click", function (evt) {
  if (evt.target === popup) {
    closePopup();
  }
});

// Manejar submit del formulario
formElement.addEventListener("submit", function (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputProfession.value;
  closePopup();
});
