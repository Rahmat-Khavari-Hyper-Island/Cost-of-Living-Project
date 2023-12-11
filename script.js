async function getData(country, category, tableDataCell) {
  try {
    const response = await fetch("data.json");
    const data = await response.json();
    const foundedCountry = data.find((entry) => Object.keys(entry)[0] === country);
    if (!foundedCountry || !foundedCountry[country] || !foundedCountry[country][category]) {
      throw new Error("Invalid country or category");
    }
    const categoryData = foundedCountry[country][category];
    Object.entries(categoryData).forEach(([key, value], index) => {
      document.getElementById(`${tableDataCell}_${index}`).textContent = value;
    });
  } catch (error) {
    console.error("Error fetching or processing data:", error.message);
  }
}


// getData(Argentina, Restaurants, Restaurants_Price_5)

/*
{
  "Argentina": {
      "Restaurants": {
        "Meal, Inexpensive Restaurant": "68.27 kr",
        "Meal for 2 People, Mid-range Restaurant, Three-course": "260.58 kr",
        "McMeal at McDonalds (or Equivalent Combo Meal)": "52.12 kr",
        "Domestic Non-Alcoholic Beer (0.5 liter draught)": "18.61 kr",
        "Imported Non-Alcoholic Beer (0.33 liter bottle)": "26.06 kr",
        "Cappuccino (regular)": "16.08 kr",
        "Coke/Pepsi (0.33 liter bottle)": "11.50 kr",
        "Water (0.33 liter bottle)": "8.79 kr"
      },

*/




document.querySelectorAll(".allPaths, .country-link").forEach((item) => {
  item.style.fill = "white";
  item.addEventListener("click", (event) => {
    event.preventDefault();
    const country = item.id || item.getAttribute("data-country");
    updateTheTable(country);
  });

  if (item.classList.contains("allPaths")) {
    item.addEventListener("mouseover", () => {
      item.style.fill = "pink";
      document.getElementById(
        "svg_country_name"
      ).textContent = `Name of the country: ${item.id}`;
    });

    item.addEventListener("mouseleave", () => {
      item.style.fill = "white";
      document.getElementById("svg_country_name").textContent =
        "Name of the country:";
    });
  }
});

function updateTheTable(selectedCountry) {
  const country = selectedCountry || "Unknown Country";
  document.getElementById(
    "countryCaption"
  ).textContent = `Cost Of Living In: ${country}`;
  getData(country, "Restaurants", "Restaurants_Price");
  getData(country, "Markets", "Market_Price");
  getData(country, "Transportation", "Transportation_Price");
  getData(country, "Utilities", "Utilities_Price");
  getData(country, "Sports and Leisure", "Sports_and_Leisure_Price");
  getData(country, "Childcare", "Childcare_Price");
  getData(country, "Clothing and Shoes", "Clothing_and_Shoes_Price");
  getData(country, "Rent Per Month", "Rent_Per_Month_Price");
  getData(country, "Buy Apartment Price", "Buy_Apartment_Price");
  getData(country, "Salaries And Financing", "Salaries_And_Financing_Price");
  scrollToTableSection();
}

function scrollToTableSection() {
  document
    .getElementById("col-table-section")
    .scrollIntoView({ behavior: "smooth", block: "start" });
}

window.addEventListener("scroll", function () {
  const section3 = document.getElementById("countries-list-section");
  const stickyDiv = document.querySelector(".sticky-div");

  if (window.scrollY >= section3.offsetTop) {
    stickyDiv.classList.add("active");
  } else {
    stickyDiv.classList.remove("active");
  }
});

function scrollToSection(sectionId) {
  document.getElementById("home").scrollIntoView({ behavior: "smooth" });
}

window.addEventListener("beforeunload", function () {
  window.scrollTo(0, 0);
});
