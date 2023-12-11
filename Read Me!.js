function getData(country, category, tableDataCell) {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      const foundedCountry = data.find(
        (entry) => Object.keys(entry)[0] === country
      );
      if (!foundedCountry) return console.error(`${country} not founded.`);
      const categoryData = foundedCountry[country][category];
      if (!categoryData) return console.error(`${category} not founded.`);
      Object.keys(categoryData).forEach(function (key, index) {
        const priceElement = document.getElementById(
          `${tableDataCell}_${index}`
        );
        if (priceElement) priceElement.textContent = categoryData[key];
      });
    });
}

const allPaths = document.querySelectorAll(".allPaths");
allPaths.forEach((path) => {
  path.addEventListener("click", () => {
    const country = path.id;
    updateTheTable(country);
    scrollToTableSection();
  });

  path.addEventListener("mouseover", () => {
    path.style.fill = "pink";
    document.getElementById(
      "svg_country_name"
    ).textContent = `Name of the country: ${path.id}`;
  });

  path.addEventListener("mouseleave", () => {
    path.style.fill = "#f4f4f4";
    document.getElementById("svg_country_name").textContent =
      "Name of the country";
  });
});

const countryLinks = document.querySelectorAll(".country-link");
countryLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const country = link.getAttribute("data-country");
    updateTheTable(country);
    scrollToTableSection();
  });
});

function updateTheTable(Input) {
  const selectedCountry = Input;
  if (selectedCountry) {
    const captionElement = (document.getElementById(
      "countryCaption"
    ).textContent = `Cost Of Living In: ${
      selectedCountry || "Unknown Country"
    }`);
    getData(selectedCountry, "Restaurants", "Restaurants_Price");
    getData(selectedCountry, "Markets", "Market_Price");
    getData(selectedCountry, "Transportation", "Transportation_Price");
    getData(selectedCountry, "Utilities", "Utilities_Price");
    getData(selectedCountry, "Sports and Leisure", "Sports_and_Leisure_Price");
    getData(selectedCountry, "Childcare", "Childcare_Price");
    getData(selectedCountry, "Clothing and Shoes", "Clothing_and_Shoes_Price");
    getData(selectedCountry, "Rent Per Month", "Rent_Per_Month_Price");
    getData(selectedCountry, "Buy Apartment Price", "Buy_Apartment_Price");
    getData(
      selectedCountry,
      "Salaries And Financing",
      "Salaries_And_Financing_Price"
    );
  } else {
    console.error("Country parameter not found.");
  }
}

function scrollToTableSection() {
  const tableSection = document.getElementById("col-table-section");
  if (tableSection) {
    tableSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

function showCountryTooltip(element, countryName) {
  const tooltip = document.createElement("div");
  tooltip.classList.add("country-tooltip");
  tooltip.textContent = countryName;
  const rect = element.getBoundingClientRect();
  tooltip.style.top = rect.top + "px";
  tooltip.style.left = rect.left + rect.width + "px";

  document.body.appendChild(tooltip);
}

function hideCountryTooltip() {
  const tooltip = document.querySelector(".country-tooltip");
  if (tooltip) {
    tooltip.remove();
  }
}
