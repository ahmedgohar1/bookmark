var nameSite = document.getElementById("nameSite");
var linkSite = document.getElementById("linkSite");
var addBtn = document.getElementById("addBtn");
var searchBar = document.getElementById("searchBar");
var nameAlertName = document.getElementById("nameAlertName");
var nameAlertUrl = document.getElementById("nameAlertUrl");
var cruntIndex = 0;
var sites = [];
if (JSON.parse(localStorage.getItem("siteSaved")) != null) {
  sites = JSON.parse(localStorage.getItem("siteSaved"));
  displayData();
}
addBtn.onclick = function () {
  if (addBtn.innerHTML == "add") {
    addSite();
  } else {
    updateSites();
  }
  displayData();
  clearfrom();
};

function addSite() {
  var site = {
    name: nameSite.value,
    link: linkSite.value,
  };
  sites.push(site);
  localStorage.setItem("siteSaved", JSON.stringify(sites));
}
function displayData() {
  var cont = "";
  for (var i = 0; i < sites.length; i++) {
    cont += `<tr>
    <td>${i + 1}</td>
    <td>${sites[i].name}</td>
    <td> <a href="http://${
      sites[i].link
    }"target="_blank"><button class="btn btn-primary"">visit</button></a></td>
    <td><button onclick="getPersonInfo(${i})" class="btn btn-warning">Update</button></td>
    <td><button onclick="delateSite(${i})" class="btn btn-danger" >Delate</button></td>
    </tr>`;
  }
  document.getElementById("tabelBody").innerHTML = cont;
}
function clearfrom() {
  nameSite.value = "";
  linkSite.value = "";
  rmove();
  rmoveUrl();
}

function delateSite(index) {
  sites.splice(index, 1);
  localStorage.setItem("siteSaved", JSON.stringify(sites));
  displayData();
}
searchBar.onkeyup = function () {
  var cont = "";
  for (var i = 0; i < sites.length; i++) {
    if (sites[i].name.toLowerCase().includes(searchBar.value.toLowerCase())) {
      cont += `<tr>
      <td>${i + 1}</td>
      <td>${sites[i].name}</td>
      <td> <a href="http://${
        sites[i].link
      }"target="_blank"><button class="btn btn-primary"">Viste</button></a></td>
      <td><button onclick="getPersonInfo(${i})" class="btn btn-warning">Update</button></td>
      <td><button onclick="delateSite(${i})" class="btn btn-danger" >Delate</button></td>
      </tr>`;
    }
  }
  document.getElementById("tabelBody").innerHTML = cont;
};
function getPersonInfo(index) {
  var cruntData = sites[index];
  nameSite.value = cruntData.name;
  linkSite.value = cruntData.link;
  addBtn.innerHTML = "update Site";
}
function updateSites() {
  var site = {
    name: nameSite.value,
    link: linkSite.value,
  };
  sites[cruntIndex] = site;
  localStorage.setItem("siteSaved", JSON.stringify(sites));
  addBtn.innerHTML = "add";
}
nameSite.onkeyup = function () {
  var nameRegex = /^[A-Z][a-z]{2,8}$/;
  if (nameRegex.test(nameSite.value)) {
    addBtn.removeAttribute("disabled");
    nameSite.classList.add("is-valid");
    nameSite.classList.remove("is-invalid");
    nameAlertName.classList.add("d-none");
  } else {
    addBtn.disabled = "true";
    nameSite.classList.remove("is-valid");
    nameSite.classList.add("is-invalid");
    nameAlertName.classList.remove("d-none");
  }
};
linkSite.onkeyup = function () {
  var nameRegex = /(?<=^|\s)(www\.[^\s]+)(?=\s|$)/;
  if (nameRegex.test(linkSite.value)) {
    addBtn.removeAttribute("disabled");
    linkSite.classList.add("is-valid");
    linkSite.classList.remove("is-invalid");
    nameAlertUrl.classList.add("d-none");
  } else {
    addBtn.disabled = "true";
    linkSite.classList.remove("is-valid");
    linkSite.classList.add("is-invalid");
    nameAlertUrl.classList.remove("d-none");
  }
};

function rmove() {
  nameSite.classList.remove("is-valid");
  addBtn.setAttribute("disabled", "");
}
function rmoveUrl() {
  linkSite.classList.remove("is-valid");
  addBtn.setAttribute("disabled", "");
}
