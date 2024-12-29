// * Simple User Management Dashboard
// 	. Fetch data from https://jsonplaceholder.typicode.com/users using the fetch API
// 	. Display a loading message while fetching the data
// 	. Handle errors gracefully if the fetch request fails
// 	. Create table with the following columns (Name, Email, Phone, Company Name) Styling is a plus
// 	.Use forEach to iterate over the user data and populate the rows of the table dynamically
// 	. Use map to extract the names of all companies into an array
// 	. Display these company names as a comma-separated list below the table

// 	^ Bonus Features:
// 		-Search Functionality: Add an input field to search users by name. Highlight matching rows in the table.
// ?		-Pagination: Display 5 users per page with "Next" and "Previous" buttons.

// dom varibales setting
var loader = document.getElementById("loader");
var table = document.getElementById("usersTable");

async function fetchData() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const dataSet = await response.json();
    return dataSet;

}

fetchData().then((data) => {
  tableConstruct(data);
  mappingCompanies(data);
  searchByName();
})
.catch((error) => {
  loader.style.display = "none";
    document.getElementById("error").style.display = "block";

})

function tableConstruct(data) {
  //------------hiding the loader and displaying the table and the search field
  loader.style.display = "none";
  table.style.display = "table";
  document.getElementById("search").style.display = "block";
  document.querySelector(".btn-container").style.display = "flex";

  data.forEach((element) => {
    //---------putting data into dynamic table
    document.getElementById("tableBody").innerHTML += `
<tr>
  <td>${element.name}</td>
  <td>${element.email}</td>
  <td>${element.phone}</td>
  <td>${element.company.name}</td>
</tr>
`
})
}


// ----------------mapping companies names into an array-------------

function mappingCompanies(data){
  let companies = data.map((user) => user.company.name).join(",");
  document.querySelector(".container").innerHTML += `<div class="comp-list"><span> compnaies list: </span><br><br>  ${companies} </div>`;
}

//----------------search functionality ----------------
function searchByName() {
  document.getElementById("search").addEventListener("input", (e) => {
    let searchVal = e.target.value 
    let regexMatcher = new RegExp(searchVal ,"gi") ;
    let nameCells = document.querySelectorAll("td:first-child");

    if(searchVal.trim() ===""){
      nameCells.forEach(element=>{
        element.style.backgroundColor = "";
        element.style.color = "";
      });
      return;
    }
    nameCells.forEach(element => {
      if(element.innerText.match(regexMatcher)){
        element.style.backgroundColor = "white";
        element.style.color = "blue";
      }
    else{
      element.style.backgroundColor = "";
      element.style.color = "";
    }
  })
});
}
