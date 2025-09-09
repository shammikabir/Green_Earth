// nav-bar toggle
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

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
      "md:w-[200px] w-full h-[35px] px-2  text-left hover:bg-[#15803D] hover:text-white rounded md:text-[16px] text-2xl md:mb-0 mb-3";
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
  // console.log(plants);
  cardcontainer.innerHTML = "";
  plants.forEach((plant) => {
    cardcontainer.innerHTML += `<div class=" bg-white shadow-lg md:w-[296px] w-[350px] mx-auto h-[360px] p-3 rounded mb-3">
    <div >
            <img src="${plant.image}" alt="" class="h-[180px] w-full" />
          </div>
          <h1 class="font-semibold pt-2 " id="${plant.id}">${plant.name}</h1>
          <p class="text-gray-500 text-[9px] pt-1 pb-1">${plant.description}</p>
          <div class="flex justify-between pt-1">
            <h1 class="bg-[#DCFCE7] text-green-700 px-1 rounded text-[12px]">
              ${plant.category}
            </h1>
            <h2 class="font-semibold"><span>$</span>${plant.price}</h2>
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
const plantdetailsmodal = document.getElementById("plant-details-modal");
const modalcontainer = document.getElementById("modal-container");
let cartTotal = 0;
cardcontainer.addEventListener("click", (e) => {
  // /////////////////////////////////////////////////////// modal
  if (e.target.tagName === "H1") {
    // console.log("modal clicked");
    const plantID = e.target.id;
    openModal(plantID);
  }

  if (e.target.innerText === "Add to Cart") {
    // console.log("cart btn clicked");
    const plantname = e.target.parentNode.childNodes[3].innerText;
    const price = e.target.parentNode.childNodes[7].childNodes[3].innerText;
    const Convertprice = parseFloat(price.replace("$", ""));

    const addtocart = document.createElement("div");
    addtocart.innerHTML = `<div class="bg-[#F0FDF4] rounded m-2 p-2 h-[65px]">
            <div class="flex justify-between items-center">
              <div>
                <h2 class="text-[14px]">${plantname}</h2>
                <h3 class="text-[12px] mt-2 text-gray-500"> ${price}</h3>
              </div>
              <i class="fa-solid fa-xmark text-gray-400 "></i>
            </div>
           
          </div>
           `;

    Addtocartcontainer.appendChild(addtocart);

    const totalprice = document.getElementById("total-price");
    cartTotal += Convertprice;
    document.getElementById(
      "total-price"
    ).innerText = `Total price = ${cartTotal} tk`;
  }
});
// modal open data fetch
const openModal = (id) => {
  // plantdetailsmodal.showModal();
  fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then((res) => res.json())
    .then((json) => showdatainModal(json.plants));
};

const showdatainModal = (plants) => {
  plantdetailsmodal.showModal();

  modalcontainer.innerHTML = `
            <h1 class="font-bold pt-2 mb-2 text-[20px]" >${plants.name}</h1> 
            <img src="${plants.image}" alt="" class="h-[180px] w-full" />
            <h1 class=" mt-2 mb-2 "> <span class="font-bold text-[13px]">Category:</span>
            <span class="text-[13px]">${plants.category}</span>
              
            </h1>
            <h2><span class="font-bold text-[13px]">Price:</span> <span class="text-gray-600 text-[13px]">${plants.price}$</span></h2>
            <p class="text-[10px] pt-2 pb-1"><span class="font-bold text-[13px]">Description:</span><span class="text-[12px]">  ${plants.description}</span></p>`;
};

// remove div
Addtocartcontainer.addEventListener("click", (e) => {
  if (e.target.tagName === "I") {
    const priceText = e.target.parentNode.childNodes[1].childNodes[3].innerText;
    // console.log(e.target.parentNode.childNodes[1].childNodes[3].innerText);
    const price = parseFloat(priceText.replace("$", ""));

    // total
    cartTotal -= price;
    const totalPriceEl = document.getElementById("total-price");
    if (cartTotal > 0) {
      totalPriceEl.innerText = `Total price = ${cartTotal} tk`;
    } else {
      totalPriceEl.innerText = "";
    }

    // div remove
    e.target.parentNode.parentNode.remove();
  }
});
loadcategory();
loaddefaultData();
