// ── Mostrar / ocultar error de un input ────────────────────────────────────

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__error_visible");
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("popup__input_type_error");
  errorElement.classList.remove("popup__error_visible");
  errorElement.textContent = "";
}

// ── Verificar validez de un input ──────────────────────────────────────────

function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

// ── ¿Hay algún input inválido? ─────────────────────────────────────────────

function hasInvalidInput(inputList) {
  return inputList.some(function (inputElement) {
    return !inputElement.validity.valid;
  });
}

// ── Habilitar / deshabilitar botón submit ──────────────────────────────────

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute("disabled", true);
    buttonElement.classList.add("popup__submit_disabled");
  } else {
    buttonElement.removeAttribute("disabled");
    buttonElement.classList.remove("popup__submit_disabled");
  }
}

// ── Agregar listeners a cada input de un formulario ────────────────────────

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__submit");

  toggleButtonState(inputList, buttonElement);

  inputList.forEach(function (inputElement) {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });

  // Bloquear submit con Enter si hay campos inválidos
  formElement.addEventListener("submit", function (evt) {
    if (hasInvalidInput(inputList)) {
      evt.preventDefault();
      inputList.forEach(function (inputElement) {
        checkInputValidity(formElement, inputElement);
      });
    }
  });
}

// ── Activar validación en todos los formularios ────────────────────────────

function enableValidation() {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach(function (formElement) {
    setEventListeners(formElement);
  });
}

enableValidation();
