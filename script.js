// Original itemsA and itemsB arrays will remain as they are
const itemsA = [
  { id: "A1", title: 'P92 or similar (AKA "Sakic" or "Backstrom")' },
  { id: "A2", title: 'P88 or similar (AKA "Kane" or "Lindros")' },
  { id: "A3", title: 'P28 or similar (AKA "Mcdavid", "Giroux" or "Eichel")' },
  { id: "A4", title: 'P14 or similar (AKA "Toews")' },
  { id: "A5", title: 'P46 or similar (AKA "Bergeron")' },
  { id: "A6", title: 'P90TM or similar (AKA "Tavares")' },
  { id: "A7", title: 'P91A or similar (AKA "Drury" or "Staal")' },
  { id: "A8", title: 'P02 or similar (AKA "Lidstrom" or "Kesler")' },
  {
    id: "A9",
    title: 'PM9 or similar (AKA "Modano", "Zetterberg" or "Stamkos")',
  },
  { id: "A10", title: "P92M or similar" },
  { id: "A11", title: "P28M or similar" },
  { id: "A12", title: 'P38 or similar (AKA "Datsyuk")' },
  { id: "A13", title: "Low lie curve" },
  { id: "A14", title: "High lie curve" },
  { id: "A15", title: "Square toe" },
  { id: "A16", title: "Max height blade" },
  { id: "A17", title: "Big rocker" },
  { id: "A18", title: "Flat bottom (no rocker)" },
  { id: "A19", title: "Huge toe curve" },
  { id: "A20", title: "Normal toe curve" },
  { id: "A21", title: "Mid curve" },
  { id: "A22", title: "Heel curve" },
  { id: "A23", title: "Flat curve" },
];

const itemsB = [
  { id: "B1", title: "Nothing, I want the exact same curve" },
  {
    id: "B2",
    title:
      "Nothing, but I want the closest option PRO carries in stock (don't want to wait for custom order)",
  },
  { id: "B3", title: "I want a more open curve or more toe hook" },
  { id: "B4", title: "I want a more closed, less open or less curved option" },
  { id: "B5", title: "I want a higher lie" },
  { id: "B6", title: "I want a lower lie" },
  { id: "B7", title: "I want more consistent snap shots" },
  { id: "B8", title: "I want more consistent one timers" },
  { id: "B9", title: "I'm shooting too high" },
  { id: "B10", title: "I'm shooting too low" },
  { id: "B11", title: "I want better stickhandling and control" },
  { id: "B12", title: "I just want to have fun" },
  { id: "B13", title: "I want more control on backhands" },
  { id: "B14", title: "I want a better two-way curve" },
  { id: "B15", title: "I want a blade that feels better receiving passes" },
  { id: "B16", title: "I want a more versatile all-around curve" },
  { id: "B17", title: "I want better puck pickup and cradling" },
  { id: "B18", title: "I want a more fun curve overall" },
];

// Initialize resultCMappings as an empty object - will be loaded from data.json
let resultCMappings = {};

document.addEventListener("DOMContentLoaded", () => {
  const startQuiz = document.getElementById("startQuiz");
  const step2 = document.getElementById("step2");
  const step3 = document.getElementById("step3");
  const result = document.getElementById("result");
  const resultTitle = document.getElementById("resultTitle");
  const resultDescription = document.getElementById("resultDescription");
  const browseInventory = document.getElementById("browse-inventory");
  const customBuild = document.getElementById("custom-build");

  // Get the container elements
  const curveOptionsContainer = document.getElementById("curveOptions");
  const preferenceOptionsContainer =
    document.getElementById("preferenceOptions");

  // Load data from data.json
  fetch("data.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Store the loaded data in resultCMappings
      resultCMappings = data;
      console.log("Data loaded from data.json successfully");

      // Now that data is loaded, initialize the application
      loadCurveOptions();
      loadPreferenceOptions();
      initializeRadioOptions();
    })
    .catch((error) => {
      console.error("Error loading data from data.json:", error);
      // Fallback - use any existing data in resultCMappings if available
      loadCurveOptions();
      loadPreferenceOptions();
      initializeRadioOptions();
    });

  // Dynamically load A options into HTML by looping through itemsA array
  function loadCurveOptions() {
    curveOptionsContainer.innerHTML = "";

    // Loop through all A1-A23 options from itemsA
    itemsA.forEach((item) => {
      const optionDiv = document.createElement("div");
      optionDiv.className =
        "radio-option p-4 border rounded-lg hover:bg-gray-50 cursor-pointer flex items-center";

      optionDiv.innerHTML = `
        <input
          type="radio"
          name="category"
          id="${item.id}"
          value="${item.id}"
          class="mr-3 visible"
          style="display:inline-block; visibility:visible; opacity:1;"
        />
        <label for="${item.id}" class="cursor-pointer flex-grow text-white">${item.title}</label>
      `;

      curveOptionsContainer.appendChild(optionDiv);
      console.log(`Added option: ${item.id} - ${item.title}`);
    });
    console.log("All A options loaded into curveOptions container");
  }

  // Dynamically load all B options into HTML but hide them by default
  function loadPreferenceOptions() {
    preferenceOptionsContainer.innerHTML = "";

    itemsB.forEach((item) => {
      const optionDiv = document.createElement("div");
      optionDiv.className =
        "radio-option p-4 border rounded-lg hover:bg-gray-50 cursor-pointer flex items-center";
      optionDiv.style.display = "none"; // Hide all by default

      optionDiv.innerHTML = `
        <input
          type="radio"
          name="preference"
          id="${item.id}"
          value="${item.id}"
          class="mr-3 visible"
          style="display:inline-block; visibility:visible; opacity:1;"
        />
        <label for="${item.id}" class="cursor-pointer flex-grow text-white">${item.title}</label>
      `;

      preferenceOptionsContainer.appendChild(optionDiv);
    });
    console.log("All B options loaded into preferenceOptions container");
  }

  // Event listeners for navigation
  startQuiz.addEventListener("click", () => {
    console.log("Start Quiz button clicked");
    startQuiz.closest("section").classList.add("hidden");
    step2.classList.remove("hidden");

    // Make sure all radio options are visible in step2
    const options = document.querySelectorAll("#curveOptions .radio-option");
    options.forEach((option) => {
      const radio = option.querySelector('input[type="radio"]');
      if (radio) {
        radio.style.display = "inline-block";
        radio.style.visibility = "visible";
        radio.style.opacity = "1";
      }
    });

    console.log(`Number of visible options: ${options.length}`);
    console.log("Step 2 displayed");
  });

  function showBOptionsForSelectedA(curveId) {
    console.log(`Selected A option: ${curveId}`);

    // Hide all B options first
    document.querySelectorAll("#step3 .radio-option").forEach((option) => {
      option.style.display = "none";
    });

    // Uncheck any previously selected preferences
    document
      .querySelectorAll('input[name="preference"]:checked')
      .forEach((input) => {
        input.checked = false;
      });

    // Check if the selected A option exists in resultCMappings
    if (resultCMappings[curveId]) {
      // Get available B options DIRECTLY from resultCMappings for this A option
      const availableBOptions = Object.keys(resultCMappings[curveId]);

      console.log(
        `Filtering B options for ${curveId}. Found ${availableBOptions.length} options in resultCMappings:`,
        availableBOptions
      );

      // Show only B options that are mapped with this A option in resultCMappings
      if (availableBOptions.length > 0) {
        availableBOptions.forEach((bOption) => {
          const option = document.querySelector(`#${bOption}`);
          if (option) {
            const optionDiv = option.closest(".radio-option");
            optionDiv.style.display = "block";

            // Make radio button explicitly visible
            option.style.display = "inline-block";
            option.style.visibility = "visible";
            option.style.opacity = "1";

            console.log(
              `Showing B option: ${bOption} - ${option.nextElementSibling.textContent.trim()}`
            );
          } else {
            console.log(`B option ${bOption} not found in DOM`);
          }
        });

        // Show how many B options were found vs how many are available
        console.log(
          `Displayed ${availableBOptions.length} B options for ${curveId}`
        );
      } else {
        console.log(`No B options found for ${curveId} in resultCMappings`);
      }
    } else {
      console.log(`${curveId} does not exist in resultCMappings`);
    }

    // Show step 3 instantly after selecting an A option
    step2.classList.add("hidden");
    step3.classList.remove("hidden");
    step3.classList.add("flex");
  }

  function showResultForSelected(curveId, preferenceId) {
    // Get the selected labels for context
    const curveLabel = document.querySelector(
      `label[for="${curveId}"]`
    ).textContent;
    const preferenceLabel = document.querySelector(
      `label[for="${preferenceId}"]`
    ).textContent;

    // Get recommendation directly from resultCMappings
    if (resultCMappings[curveId] && resultCMappings[curveId][preferenceId]) {
      const recommendation = resultCMappings[curveId][preferenceId];
      console.log("Found recommendation:", recommendation);

      // Create prescription message based on selections
      const prescriptionMessage = createPrescriptionMessage(
        curveLabel,
        preferenceLabel
      );
      document.querySelector("#result h2").textContent = prescriptionMessage;

      // Update the UI with the recommendation
      resultTitle.textContent = recommendation.value;
      resultDescription.textContent = recommendation.text;

      // Set up button links for inventory and custom build
      browseInventory.href = "/browse-inventory";
      customBuild.href = "/custom-build";

      // Hide step 3 and show result
      step3.classList.add("hidden");
      step3.classList.remove("flex");
      result.classList.remove("hidden");
      result.classList.add("flex");
    } else {
      alert("No recommendation found. Please try another combination.");
    }
  }

  function createPrescriptionMessage(curve, preference) {
    if (
      preference.includes("exact same curve") ||
      preference.includes("Nothing, I want the exact same curve")
    ) {
      return `Dr. Geppetto confirms your choice of ${curve
        .split("(")[0]
        .trim()}:`;
    }
    if (preference.includes("closest option") || preference.includes("stock")) {
      return `Dr. Geppetto recommends this stock option for ${curve
        .split("(")[0]
        .trim()}:`;
    }
    if (preference.includes("fun")) {
      return "Dr. Geppetto's fun prescription for you:";
    }
    if (preference.includes("shooting")) {
      return "Dr. Geppetto's accuracy enhancement:";
    }
    if (
      preference.includes("stickhandling") ||
      preference.includes("control")
    ) {
      return "Dr. Geppetto's control enhancement:";
    }
    if (preference.includes("timers") || preference.includes("snap shots")) {
      return "Dr. Geppetto's power prescription:";
    }
    return `Dr. Geppetto's recommendation based on your ${curve
      .split("(")[0]
      .trim()}:`;
  }

  // Helper function to make the radio options clickable on the whole div
  function initializeRadioOptions() {
    // Use direct event handling for the dynamically created options
    document.addEventListener("click", function (event) {
      const option = event.target.closest(".radio-option");
      if (!option) return;

      const radio = option.querySelector('input[type="radio"]');
      if (!radio) return;

      // Explicitly check the radio button and ensure it's visible
      radio.checked = true;
      radio.style.display = "inline-block";
      radio.style.visibility = "visible";
      radio.style.opacity = "1";

      // Apply styling
      if (option.closest("#step2")) {
        document.querySelectorAll("#step2 .radio-option").forEach((opt) => {
          opt.classList.remove("bg-gray-100");
        });
        option.classList.add("bg-gray-100");

        // For A options, show corresponding B options
        showBOptionsForSelectedA(radio.value);
      } else if (option.closest("#step3")) {
        document.querySelectorAll("#step3 .radio-option").forEach((opt) => {
          opt.classList.remove("bg-gray-800");
          opt.classList.remove("text-white");
        });
        option.classList.add("bg-gray-800");
        option.classList.add("text-white");

        // For B options, show the result
        const selectedCategory = document.querySelector(
          'input[name="category"]:checked'
        );
        if (selectedCategory && radio.checked) {
          showResultForSelected(selectedCategory.value, radio.value);
        }
      }
    });

    // Add specific handlers for the radio inputs themselves
    document.addEventListener("change", function (event) {
      if (event.target.type === "radio") {
        const radioInput = event.target;

        if (radioInput.name === "category") {
          // If an A option radio button is changed
          showBOptionsForSelectedA(radioInput.value);
        } else if (radioInput.name === "preference") {
          // If a B option radio button is changed
          const selectedCategory = document.querySelector(
            'input[name="category"]:checked'
          );
          if (selectedCategory) {
            showResultForSelected(selectedCategory.value, radioInput.value);
          }
        }
      }
    });
  }
});
