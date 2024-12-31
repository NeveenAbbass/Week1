// varibales setting
let loader = document.getElementById("loader");
let table = document.getElementById("usersTable");
let data = [];


async function fetchData() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    data = await response.json();
    return data;
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
  //------------hiding the loader and displaying the UI elements
  loader.style.display = "none";
  table.style.display = "table";
  document.getElementById("search").style.display = "block";

  const tableBody = document.getElementById("tableBody");

  // ?tableBody.innerHTML = "";
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
