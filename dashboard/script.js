// * Simple User Management Dashboard
// 	. Fetch data from https://jsonplaceholder.typicode.com/users using the fetch API
// 	. Display a loading message while fetching the data
// 	. Handle errors gracefully if the fetch request fails
// 	. Create table with the following columns (Name, Email, Phone, Company Name) Styling is a plus
// 	.Use forEach to iterate over the user data and populate the rows of the table dynamically
// 	. Use map to extract the names of all companies into an array
// 	. Display these company names as a comma-separated list below the table

// 	^ Bonus Features:
// ?		-Search Functionality: Add an input field to search users by name. Highlight matching rows in the table.
// ?		-Pagination: Display 5 users per page with "Next" and "Previous" buttons.

async function fetchData() {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => {
      //hiding the loader and displaying the table
      document.getElementById("loader").style.display = "none";
      document.getElementById("usersTable").style.display = "table";
      return response.json();
    })
    .then((data) => {
      data.forEach((element) => {
        //putting data into dynamic table
        document.getElementById("tableBody").innerHTML += `
    <tr>
      <td>${element.name}</td>
      <td>${element.email}</td>
      <td>${element.phone}</td>
      <td>${element.company.name}</td>
    </tr>
    `;
      });
      // mapping companies names into an array
      let companies = data.map((user) => user.company.name).join(",");
      document.querySelector(
        ".container"
      ).innerHTML += `<div class="comp-list"><span> compnaies list: </span><br><br>  ${companies} </div>`;
    })
    .catch((error) => {
      document.getElementById("loader").style.display = "none";
      document.getElementById("error").style.display = "block";
    });
}

fetchData()

async function searchByName(name){
  const dataResult = await fetchData();

}