var table = document.getElementById("myTable");

for (var i = 0; i < json.length; i++) {
  var item = json[i];

  var row = table.insertRow();

  var taskname = item.taskname;
  var description = item.description;

  var cellTaskName = row.insertCell();
  cellTaskName.innerHTML = taskname;

  var cellDescription = row.insertCell();
  cellDescription.innerHTML = description;
//Sama
  var cellAction = row.insertCell();
  var updateButton = document.createElement("button");
  updateButton.textContent = "Update";
  cellAction.appendChild(updateButton);

  var deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  cellAction.appendChild(deleteButton);
}