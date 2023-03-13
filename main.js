const API_URL =
  "https://api-rick-ymorty-production-8b90.up.railway.app/characters";
const personajesDiv = document.getElementById("personajes");
const nextPageBtn = document.getElementById("nextPageBtn");
const prevPageBtn = document.getElementById("prevPageBtn");
const pjContainerBtn = document.getElementById("pjContainerBtn");
const createPjBtn = document.getElementById("createPjBtn");
const charactersContainer = document.querySelector(".personajes-container");
const formContainer = document.querySelector(".form-container");
const nameInput = document.getElementById("name");
const genderInput = document.getElementById("gender");
const statusInput = document.getElementById("status");
const imageInput = document.getElementById("image");
const btn = document.getElementById("btn");

let page = 1;

//* SPA NAV
const goCharacters = () => {
  charactersContainer.classList.remove("hide");
  formContainer.classList.add("hide");
};
const goCreateView = () => {
  charactersContainer.classList.add("hide");
  formContainer.classList.remove("hide");
};
pjContainerBtn.addEventListener("click", goCharacters);
createPjBtn.addEventListener("click", goCreateView);

//funcion que muestra personajes en el HTML
const mostrarPersonajes = (personajes) => {
  personajesDiv.innerHTML = ""; //limpiamos busqueda
  personajes.forEach((personaje) => {
    personajesDiv.innerHTML += `
                    <div class="card col-lg-3 col-xs-12 col-md-6">
                        <div class="personaje">
                        <div class="card-body">
                        <h3 class="card-header">${personaje.name}</h3>
                        <h4 class="card-text">${personaje.gender}</h4>
                        <h5 class="card-title">${personaje.status}</h5>
                        <img style="height: 200px; width: 100%; display: block;" src="${personaje.image}"  alt="Card image">
                        <!-- hago el onclick aqui para pasarle el id del personaje --> 
                        <button type="button" class="btn btn-danger" onclick="deleteCharacter('${personaje._id}')">Delete Character</button>
                        </div>
                        </div>
                        </div>
                         `;
  });
};

const getCharacters = async () => {
  try {
    const res = await axios.get(API_URL + "?page=" + page);
    mostrarPersonajes(res.data);
  } catch (error) {
    console.error(error);
  }
};

const nextPage = () => {
  page++;
  getCharacters();
};
const prevPage = () => {
  page--;
  getCharacters();
};
getCharacters();

const createCharacter = async (e) => {
  e.preventDefault();
  try {
    const newCharacter = {
      name: nameInput.value,
      gender: genderInput.value,
      status: statusInput.value,
      image: imageInput.value,
    };
    await axios.post(API_URL, newCharacter);
    goCharacters();
  } catch (error) {
    console.error(error);
  }
};

const deleteCharacter = async (id) => {
  try {
    await axios.delete(API_URL + "/id/" + id);
    getCharacters();
  } catch (error) {
    console.error(error);
  }
};

nextPageBtn.addEventListener("click", nextPage);
prevPageBtn.addEventListener("click", prevPage);
btn.addEventListener("click", createCharacter);
