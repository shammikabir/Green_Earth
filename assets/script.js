// category functionaluty
const loadcategory = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((json) => displaycategory(json.categories));
};
// display category
const displaycategory = (categories) => {
  const categoryContainer = document.getElementById("category-container");
  //   categoryContainer.innerHTML = "";

  for (let category of categories) {
    const button = document.createElement("button");
    button.id = category.id;
    button.className =
      "w-[200px] h-[35px] px-2  text-left hover:bg-[#15803D] hover:text-white rounded text-[16px]";
    button.innerText = category.category_name;

    categoryContainer.appendChild(button);
    // console.log(category);
  }

  //   hover active process
  categoryContainer.addEventListener("click", (e) => {
    const allBtns = document.querySelectorAll("button");

    // console.log(allBtns);
    allBtns.forEach((btn) => {
      btn.classList.remove("bg-[#15803D]", "text-white");
    });

    if (e.target.localName === "button") {
      console.log(e.target.id);
      loadspinner();
      e.target.classList.add("bg-[#15803D]", "text-white");
      loadCardbyCategory(e.target.id);
    }
  });
};
// card loadby category................................................................

/////////////////////// default data load function////////

const loaddefaultData = () => {
  fetch(`https://openapi.programming-hero.com/api/plants`)
    .then((res) => res.json())
    .then((json) => displayCard(json.plants));
};

// 1.data fetch
const loadCardbyCategory = (id) => {
  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then((res) => res.json())
    .then((json) => displayCard(json.plants));
};

// 2.display the card
const cardcontainer = document.getElementById("card-container");

const displayCard = (plants) => {
  console.log(plants);
  cardcontainer.innerHTML = "";
  plants.forEach((plant) => {
    cardcontainer.innerHTML += `<div class=" bg-white shadow-lg w-[296px] h-[360px] p-3 rounded mb-3">
    <div >
            <img src="${plant.image}" alt="" class="h-[180px] w-full" />
          </div>
          <h1 class="font-semibold pt-2 id="${plant.id}">${plant.name}</h1>
          <p class="text-gray-500 text-[9px] pt-1 pb-1">${plant.description}</p>
          <div class="flex justify-between pt-1">
            <h1 class="bg-[#DCFCE7] text-green-700 px-1 rounded text-[12px]">
              ${plant.category}
            </h1>
            <h2 class="font-semibold">$${plant.price}</h2>
          </div>
          <button
            type="button"
            class=" bg-[#15803D] mt-3 w-full font-bold rounded-xl border-0 shadow-none text-white text-[12px] h-[30px]"
          >
            Add to Cart
          </button>`;
  });
};

// load spinner
const loadspinner = () => {
  cardcontainer.innerHTML = ` <div
            class="fixed inset-0 flex flex-col justify-center items-center bg-white/50 z-50"
          >
            <div
              class="w-12 h-12 border-4 border-blue-800 border-t-transparent rounded-full animate-spin"
            ></div>
            <p class="mt-4 text-blue-700 font-medium text-sm">Loading...</p>
          </div>`;
};

// add to cart functionality

const Addtocartcontainer = document.getElementById("Addtocart-container");

cardcontainer.addEventListener("click", (e) => {
  if (e.target.innerText === "Add to Cart") {
    // console.log("cart btn clicked");
    const plantname = e.target.parentNode.childNodes[3].innerText;
    const price = e.target.parentNode.childNodes[7].childNodes[3].innerText;

    const addtocart = document.createElement("div");
    addtocart.innerHTML = `<div class="bg-[#F0FDF4] rounded m-2 p-2 h-[65px]">
            <div class="flex justify-between items-center">
              <div>
                <h2 class="text-[14px]">${plantname}</h2>
                <h3 class="text-[12px] mt-2 text-gray-500"> ${price}</h3>
              </div>
              <i class="fa-solid fa-xmark text-gray-400"></i>
            </div>
          </div>`;

    Addtocartcontainer.appendChild(addtocart);
  }
});

loadcategory();
loaddefaultData();
