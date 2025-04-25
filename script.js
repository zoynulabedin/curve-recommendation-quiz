// script.js

document.addEventListener("DOMContentLoaded", () => {
  const startQuiz = document.getElementById("startQuiz");
  const nextToStep3 = document.getElementById("nextToStep3");
  const showResult = document.getElementById("showResult");
  const step2 = document.getElementById("step2");
  const step3 = document.getElementById("step3");
  const result = document.getElementById("result");
  const resultTitle = document.getElementById("resultTitle");
  const resultDescription = document.getElementById("resultDescription");
  const productLink = document.getElementById("productLink");

  startQuiz.addEventListener("click", () => {
    startQuiz.parentElement.parentElement.classList.add("hidden");
    step2.classList.remove("hidden");
  });

  nextToStep3.addEventListener("click", () => {
    const selectedCategory = document.querySelector(
      'input[name="category"]:checked'
    );
    if (selectedCategory) {
      step2.classList.add("hidden");
      step3.classList.remove("hidden");
    } else {
      alert("Please select your current curve type");
    }
  });

  showResult.addEventListener("click", () => {
    const selectedCurve = document.querySelector(
      'input[name="category"]:checked'
    );
    const selectedPreference = document.querySelector(
      'input[name="preference"]:checked'
    );

    if (selectedCurve && selectedPreference) {
      // Hide step 3
      step3.classList.add("hidden");

      // Show result section
      const resultSection = document.getElementById("result");
      resultSection.classList.remove("hidden");
      resultSection.classList.add("flex");

      // Set the recommendation
      const resultTitle = document.getElementById("resultTitle");
      const resultDescription = document.getElementById("resultDescription");

      // Get recommendation based on selections
      const recommendation = getRecommendation(
        selectedCurve.value,
        selectedPreference.value
      );

      resultTitle.textContent = recommendation.title;
      resultDescription.textContent = recommendation.description;

      // Set up button links
      const browseInventoryBtn = document.getElementById("browse-inventory");
      const customBuildBtn = document.getElementById("custom-build");

      browseInventoryBtn.href = recommendation.inventoryLink || "#";
      customBuildBtn.href = recommendation.customLink || "#";
    } else {
      alert("Please select your preference");
    }
  });

  function getRecommendation(curve, preference) {
    // Example recommendation logic
    // You would expand this based on your actual recommendation rules
    return {
      title: `P92 (ST: Retail Sakic / Backstrom)`,
      description: `The P92 is a tried and true classic. Why change what isn't broken?\n\nWe stock this curve and have it ready to ship today in multiple flex options in the High Performance Inventory models as well as the OG Models. This curve is also available for custom orders in any flex you want (subject to current production time).`,
      inventoryLink: "/browse-inventory",
      customLink: "/custom-build",
    };
  }
});
