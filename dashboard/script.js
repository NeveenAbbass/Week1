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

// varibales setting
let loader = document.getElementById("loader");
let table = document.getElementById("usersTable");
let nextBtn = document.getElementById("next") 
let prevBtn = document.getElementById("prev") 
let page = 1;
let data = [];


async function fetchData() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    data = await response.json();
    return data;
}

fetchData().then((data) => {
  tableConstruct(data,page);
  mappingCompanies(data);
  searchByName();
})
.catch((error) => {
  loader.style.display = "none";
    document.getElementById("error").style.display = "block";

})

nextBtn.addEventListener("click", () => {
  const totalPages = Math.ceil(data.length / 5); 
  if (page < totalPages) {
      page++;
      tableConstruct(data, page);
  }
});

  prevBtn.addEventListener("click",(e)=>{
    if(page > 1)
      page--;
    tableConstruct(data,page);
  console.log(page);

  })

function tableConstruct(data,page) {
  //------------hiding the loader and displaying the UI elements
  loader.style.display = "none";
  table.style.display = "table";
  document.getElementById("search").style.display = "block";
  document.querySelector(".btn-container").style.display = "flex";

  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";

  let paginationParams = pagination(data,5,page);
  
  
  paginationParams[0].forEach((element) => {
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


//-----------------pagination------------------
function pagination(data,rows,page){
  var trimStart = (page -1) * rows;
  var trimEnd = trimStart + rows;

  var trimmedData = data.slice(trimStart, trimEnd);

  var pages = Math.ceil(data.length / rows);

  return [trimmedData, pages];
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
