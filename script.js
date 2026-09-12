// ================================
// TrafficEase - Demo JavaScript
// ================================

document.addEventListener("DOMContentLoaded", function () {

  // -------------------------------
  // Get HTML elements
  // -------------------------------

  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modalContent");
  const toast = document.getElementById("toast");
  const reportForm = document.getElementById("reportForm");

  let selectedType = "Heavy Traffic";

  // -------------------------------
  // Issue type selection
  // -------------------------------

  const issueButtons = document.querySelectorAll(".issue-type");

  issueButtons.forEach(function (button) {
    button.addEventListener("click", function () {

      issueButtons.forEach(function (btn) {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      selectedType = button.getAttribute("data-type");
    });
  });

  // -------------------------------
  // Report form
  // -------------------------------

  if (reportForm) {

    reportForm.addEventListener("submit", function (event) {

      event.preventDefault();

      const locationInput =
        document.getElementById("location");

      const detailsInput =
        document.getElementById("details");

      const alertGrid =
        document.getElementById("alertGrid");

      const issueCount =
        document.getElementById("issueCount");

      const location =
        locationInput.value.trim();

      const details =
        detailsInput.value.trim();

      // Check location
      if (!location) {
        showToast("⚠️ Please enter the location.");
        return;
      }

      // Create alert card
      const card = document.createElement("article");

      card.className = "alert-card info";

      // Icon
      const icon = document.createElement("div");
      icon.className = "alert-icon";
      icon.textContent = getIssueIcon(selectedType);

      // Main content
      const content = document.createElement("div");

      const tag = document.createElement("span");
      tag.className = "tag info-tag";
      tag.textContent = selectedType.toUpperCase();

      const heading = document.createElement("h3");
      heading.textContent = selectedType + " reported";

      const place = document.createElement("p");
      place.textContent = location + " · Just now";

      const detailText = document.createElement("strong");
      detailText.textContent =
        details || "Community report added";

      content.appendChild(tag);
      content.appendChild(heading);
      content.appendChild(place);
      content.appendChild(detailText);

      // View button
      const viewButton = document.createElement("button");
      viewButton.textContent = "View";

      viewButton.addEventListener("click", function () {
        showReportDetails(selectedType, location);
      });

      // Put everything together
      card.appendChild(icon);
      card.appendChild(content);
      card.appendChild(viewButton);

      // Add new report to top
      if (alertGrid) {
        alertGrid.prepend(card);
      }

      // Increase issue count
      if (issueCount) {
        const current =
          parseInt(issueCount.textContent) || 0;

        issueCount.textContent = current + 1;
      }

      // Save report in browser
      saveReport(selectedType, location, details);

      // Reset form
      reportForm.reset();

      // Reset issue selection
      issueButtons.forEach(function (btn) {
        btn.classList.remove("active");
      });

      const defaultButton =
        document.querySelector(
          '.issue-type[data-type="Heavy Traffic"]'
        );

      if (defaultButton) {
        defaultButton.classList.add("active");
      }

      selectedType = "Heavy Traffic";

      // Show message
      showToast(
        "✅ Report submitted — thank you for helping other drivers!"
      );

      // Scroll to alerts
      const alerts =
        document.getElementById("alerts");

      if (alerts) {
        setTimeout(function () {
          alerts.scrollIntoView({
            behavior: "smooth"
          });
        }, 300);
      }

    });

  }

});


// ======================================
// Get icon according to issue type
// ======================================

function getIssueIcon(type) {

  if (type === "Accident") {
    return "💥";
  }

  if (type === "Construction") {
    return "🚧";
  }

  if (type === "Road Block") {
    return "🚫";
  }

  return "🚗";
}


// ======================================
// Scroll to report section
// ======================================

window.scrollToReport = function () {

  const report =
    document.getElementById("report");

  if (report) {
    report.scrollIntoView({
      behavior: "smooth"
    });
  }

};


// ======================================
// Locate user - DEMO
// ======================================

window.locateMe = function () {

  showToast(
    "📍 Demo location selected: Mysuru City"
  );

};


// ======================================
// Show route
// ======================================

window.showRoute = function () {

  const modal =
    document.getElementById("modal");

  const modalContent =
    document.getElementById("modalContent");

  const destinationInput =
    document.getElementById("destination");

  if (!modal || !modalContent) {
    return;
  }

  const destination =
    destinationInput &&
    destinationInput.value.trim()
      ? destinationInput.value.trim()
      : "your destination";

  modalContent.innerHTML = "";

  const heading = document.createElement("h3");
  heading.textContent =
    "🗺️ Route to " + destination;

  const routeInfo = document.createElement("p");
  routeInfo.innerHTML =
    "<b>Recommended route:</b> 7.4 km · 22 min";

  const warning = document.createElement("p");
  warning.textContent =
    "⚠️ One accident is reported ahead. " +
    "TrafficEase recommends avoiding Ring Road " +
    "and using the alternative route.";

  const button = document.createElement("button");

  button.className = "primary full";
  button.textContent = "Start this route";

  button.addEventListener("click", function () {
    closeModal();
    showToast(
      "🗺️ Demo route selected successfully!"
    );
  });

  modalContent.appendChild(heading);
  modalContent.appendChild(routeInfo);
  modalContent.appendChild(warning);
  modalContent.appendChild(button);

  modal.classList.remove("hidden");

};


// ======================================
// Select map pin
// ======================================

window.selectPin = function (
  type,
  place,
  delay
) {

  const modal =
    document.getElementById("modal");

  const modalContent =
    document.getElementById("modalContent");

  if (!modal || !modalContent) {
    return;
  }

  modalContent.innerHTML = "";

  const icon = document.createElement("div");

  icon.style.fontSize = "32px";
  icon.textContent = getIssueIcon(type);

  const heading = document.createElement("h3");
  heading.textContent = type;

  const location = document.createElement("p");

  const bold = document.createElement("b");
  bold.textContent = place;

  location.appendChild(bold);

  const info = document.createElement("p");

  info.textContent =
    "Community report · Expected " +
    delay + ".";

  const button = document.createElement("button");

  button.className = "primary full";
  button.textContent = "Got it";

  button.addEventListener("click", function () {
    closeModal();
  });

  modalContent.appendChild(icon);
  modalContent.appendChild(heading);
  modalContent.appendChild(location);
  modalContent.appendChild(info);
  modalContent.appendChild(button);

  modal.classList.remove("hidden");

};


// ======================================
// Show submitted report details
// ======================================

window.showReportDetails = function (
  type,
  place
) {

  const modal =
    document.getElementById("modal");

  const modalContent =
    document.getElementById("modalContent");

  if (!modal || !modalContent) {
    return;
  }

  modalContent.innerHTML = "";

  const icon = document.createElement("div");

  icon.style.fontSize = "32px";
  icon.textContent = "📢";

  const heading = document.createElement("h3");

  heading.textContent = type;

  const location = document.createElement("p");

  const bold = document.createElement("b");

  bold.textContent = place;

  location.appendChild(bold);

  const description = document.createElement("p");

  description.textContent =
    "This is a newly submitted community report. " +
    "In a production version, nearby drivers " +
    "would receive an alert.";

  const button = document.createElement("button");

  button.className = "primary full";
  button.textContent = "Close";

  button.addEventListener("click", function () {
    closeModal();
  });

  modalContent.appendChild(icon);
  modalContent.appendChild(heading);
  modalContent.appendChild(location);
  modalContent.appendChild(description);
  modalContent.appendChild(button);

  modal.classList.remove("hidden");

};


// ======================================
// Close modal
// ======================================

window.closeModal = function () {

  const modal =
    document.getElementById("modal");

  if (modal) {
    modal.classList.add("hidden");
  }

};


// ======================================
// Close modal when clicking outside
// ======================================

document.addEventListener(
  "click",
  function (event) {

    const modal =
      document.getElementById("modal");

    if (
      modal &&
      event.target === modal
    ) {
      closeModal();
    }

  }
);


// ======================================
// Filter issues - DEMO
// ======================================

window.filterIssues = function () {

  showToast(
    "🔎 Demo filter: showing all active issues"
  );

};


// ======================================
// Toast notification
// ======================================

window.showToast = function (message) {

  const toast =
    document.getElementById("toast");

  if (!toast) {
    return;
  }

  toast.textContent = message;

  toast.classList.add("show");

  clearTimeout(window.trafficEaseToastTimer);

  window.trafficEaseToastTimer =
    setTimeout(function () {

      toast.classList.remove("show");

    }, 3000);

};


// ======================================
// Save report in browser
// ======================================

function saveReport(
  type,
  location,
  details
) {

  try {

    const reports =
      JSON.parse(
        localStorage.getItem(
          "trafficEaseReports"
        ) || "[]"
      );

    reports.push({
      type: type,
      location: location,
      details: details,
      time: new Date().toISOString()
    });

    localStorage.setItem(
      "trafficEaseReports",
      JSON.stringify(reports)
    );

  } catch (error) {

    console.log(
      "Local storage is not available."
    );

  }

    }
