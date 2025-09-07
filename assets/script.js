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
      e.target.classList.add("bg-[#15803D]", "text-white");
      loadCardbyCategory(e.target.id);
    }
  });
};
// card loadby category

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
    cardcontainer.innerHTML += `<div class=" bg-white shadow-lg w-[290px] h-[360px] p-3 rounded ">
    <div >
            <img src="${plant.image}" alt="" class="h-[180px] w-full" />
          </div>
          <h1 class="font-semibold pt-2">${plant.name}</h1>
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

loadcategory();
