// Function to dynamically fill hostel options
function fillHostelOptions() {
  var hostels = [
    "Paari", "Kaari", "Oori", "Adhiyaman", "Nelson Mandela", "Manoranjitham",
    "Mullai", "Thamarai", "Malligai", "Sannasi", "Began", "Pierre Fauchard",
    "M Block", "Senbagam", "ESQ", "Kalpana Chawla", "Meenakshi", "NRI Premium",
    "Green Pearl"
  ]; 
  var select = document.getElementById("hostel-1");
  var querySelect = document.getElementById("query-hostel");

  // Clear existing options
  select.innerHTML = "";
  querySelect.innerHTML = "";

  // Add default option
  var defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.text = "Select hostel";
  defaultOption.disabled = true;
  defaultOption.selected = true;
  select.appendChild(defaultOption.cloneNode(true));
  querySelect.appendChild(defaultOption.cloneNode(true));

  // Add hostel options
  hostels.forEach(function(hostel) {
    var option = document.createElement("option");
    option.value = hostel;
    option.text = hostel;
    select.appendChild(option.cloneNode(true));
    querySelect.appendChild(option.cloneNode(true));
  });
}

// Function to handle form submission (submit event)
function handleFormSubmission(event) {
  event.preventDefault(); // Prevent form from submitting and refreshing page

  // Fetch form data
  var formData = {
    name: document.getElementById("name-1").value,
    email: document.getElementById("email-1").value,
    hostel: document.getElementById("hostel-1").value,
    room: document.getElementById("room-1").value
  };

  // AJAX request to submit form data to server
  $.ajax({
    type: 'POST',
    url: '/api/students',
    contentType: 'application/json',
    data: JSON.stringify(formData),
    success: function (response) {
      console.log('Form data sent successfully:', response);
      alert('Form submitted successfully!');
    },
    error: function (error) {
      console.error('Error sending form data:', error);
      alert('Error submitting form. Please try again.');
    },
  });
}

// Function to handle search by name button click
function searchByName() {
  var queryName = document.getElementById("query-name").value;

  // AJAX request to search students by name
  $.ajax({
    type: 'GET',
    url: '/api/students/search/name',
    data: { name: queryName },
    success: function (response) {
      console.log('Search results:', response);
      displaySearchResults(response);
    },
    error: function (error) {
      console.error('Error searching by name:', error);
      alert('Error searching by name. Please try again.');
    },
  });
}

// Function to handle search by hostel and room number button click
function searchByHostelAndRoom() {
  var queryHostel = document.getElementById("query-hostel").value;
  var queryRoom = document.getElementById("query-room").value;

  // AJAX request to search students by hostel and room number
  $.ajax({
    type: 'GET',
    url: '/api/students/search/hostel',
    data: { hostel: queryHostel, room: queryRoom },
    success: function (response) {
      console.log('Search results:', response);
      displaySearchResults(response);
    },
    error: function (error) {
      console.error('Error searching by hostel and room:', error);
      alert('Error searching by hostel and room number. Please try again.');
    },
  });
}

// Function to display search results
function displaySearchResults(results) {
  const resultsContainer = document.getElementById("search-results-content");
  resultsContainer.innerHTML = "";
  results.forEach(result => {
    const resultDiv = document.createElement("div");
    resultDiv.className = "result-item";
    resultDiv.innerHTML = `
      <h3>${result.name}</h3>
      <p>Email: ${result.email}</p>
      <p>Hostel: ${result.hostel}</p>
      <p>Room: ${result.room}</p>
    `;
    resultsContainer.appendChild(resultDiv);
  });
  document.getElementById("search-results").style.display = "block";
}

// Add event listeners after document is fully loaded
document.addEventListener("DOMContentLoaded", function() {
  fillHostelOptions();

  // Event listener for student form submission
  document.getElementById("student-form").addEventListener("submit", handleFormSubmission);

  // Event listener for search by name button click
  document.getElementById("search-name-button").addEventListener("click", searchByName);

  // Event listener for search by hostel and room number button click
  document.getElementById("search-hostel-button").addEventListener("click", searchByHostelAndRoom);

  // Event listeners for toggling search types
  document.getElementById("search-by-name").addEventListener("change", function() {
    if (this.checked) {
      document.getElementById("search-by-name-group").style.display = "block";
      document.getElementById("search-by-hostel-group").style.display = "none";
      document.getElementById("search-results").style.display = "none";
    }
  });

  document.getElementById("search-by-hostel").addEventListener("change", function() {
    if (this.checked) {
      document.getElementById("search-by-hostel-group").style.display = "block";
      document.getElementById("search-by-name-group").style.display = "none";
      document.getElementById("search-results").style.display = "none";
    }
  });
});
