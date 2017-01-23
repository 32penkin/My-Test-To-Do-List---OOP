function ToDoList() {
this.elem = document.createElement("ul");
this.itemsArr = [];
this.currentFilter = "";

this.addNewItem = function(item) {
	this.itemsArr.push(item);
};
this.deleteItem = function(instance) {
	for(var i = 0; i < this.itemsArr.length; i++){
		if(this.itemsArr[i] == instance) this.itemsArr.splice(i,1);
	}
	this.render();
};
this.getAll = function() {
	this.currentFilter = "All";
	this.render();
};
this.getActive = function() {
	this.currentFilter = "Active";
	var itemsArrActive = [];
	var temp = this.itemsArr;
	for(var i = 0; i < this.itemsArr.length; i++) {
		if(this.itemsArr[i].checked == false){
			itemsArrActive.push(this.itemsArr[i]);
		}
	}
	this.itemsArr = itemsArrActive;
	this.render();
	this.itemsArr = temp;
};
this.getCompleted = function() {
	this.currentFilter = "Completed";
	var itemsArrActive = [];
	var temp = this.itemsArr;
	for(var i = 0; i < this.itemsArr.length; i++) {
		if(this.itemsArr[i].checked == true){
			itemsArrActive.push(this.itemsArr[i]);
		}
	}
	this.itemsArr = itemsArrActive;
	this.render();
	this.itemsArr = temp;
};
this.deleteCompleted = function() {
	var filteredDtaListAll = this.itemsArr.filter(function (item){
		var filteredItem;
		if(item.checked == true) filteredItem = item;
		return filteredItem;
	});
	for(var i = 0; i < this.itemsArr.length; i++){
		for(var j = 0; j < filteredDtaListAll.length; j++){
			if(this.itemsArr[i] === filteredDtaListAll[j]) this.itemsArr.splice(i, 1);
		}
	}
	
	this.render();
};

this.render = function() {
	this.elem.innerHTML = "";
	var that = this;
	that.itemsArr.forEach( function(item) {
		that.elem.appendChild(item.render());
	});

	var buttonContainer = document.getElementById("footLi");
	buttonContainer.innerHTML = "";
	//-------------------------------------------------------
	var button1 = document.createElement("li");
	var showAllButton = document.createElement("button");
	showAllButton.className = "show_all";
	showAllButton.innerText = "All";
	showAllButton.className = this.currentFilter === "All" ? "filtered_button" : "";
	showAllButton.onclick = function (){

	};
	button1.appendChild(showAllButton);
	buttonContainer.appendChild(button1);
	//-------------------------------------------------------
	var button2 = document.createElement("li");
	var showActiveButton = document.createElement("button");
	showActiveButton.className = "show_active";
	showActiveButton.innerText = "Active";
	showActiveButton.className = this.currentFilter === "Active" ? "filtered_button" : "";
	button2.appendChild(showActiveButton);
	buttonContainer.appendChild(button2);
	//-------------------------------------------------------
	var button3 = document.createElement("li");
	var showCompletedButton = document.createElement("button");
	showCompletedButton.className = "show_comleted";
	showCompletedButton.innerText = "Completed";
	showCompletedButton.className = this.currentFilter === "Completed" ? "filtered_button" : "";
	button3.appendChild(showCompletedButton);
	buttonContainer.appendChild(button3);
//-------------------------------------------------------
	var button4 = document.createElement("li");
	var deleteCompletedButton = document.createElement("button");
	deleteCompletedButton.className = "clear_completed";
	deleteCompletedButton.innerText = "Clear completed";
	button4.appendChild(deleteCompletedButton);
	buttonContainer.appendChild(button4);

	showAllButton.onclick = function (){
		that.getAll();
	};

	showActiveButton.onclick = function(){
		that.getActive();
	};	

	showCompletedButton.onclick = function (){
		that.getCompleted();
	};

	deleteCompletedButton.onclick = function (){
		that.deleteCompleted();
	};

	return this.elem;
};


};



function ToDoItem(value, checked, edit, list) {
	this.value = value;
	this.checked = checked; 
	this.edit = edit;
	this.list = list;

	this.elem = document.createElement("li");

	this.setChecked = function() {
		this.checked = !this.checked;
		this.render();
		return false;
	};

	this.setEdit = function() {
		this.edit = !this.edit;
 		this.render();
 		return false;
	};

	this.render = function() {
		this.elem.innerHTML = '';
		this.elem.className = "view";

		if (this.edit === true) {
      		var internalElement = document.createElement('input');
     		internalElement.type = 'text';
     		internalElement.value = this.value;
     		internalElement.className = "int_el";
    	} else {
      		var internalElement = document.createElement('span');
      		internalElement.className = (this.checked === true) ? 'checked' : '';
      		internalElement.innerHTML = this.value; 
    	}

			
		var fontAweTest = document.createElement("i");
		fontAweTest.className = "fa fa-hand-o-right";


		var tBar = document.createElement("div");
		tBar.className = "tBar";


		var doneButton = document.createElement("button");
		doneButton.setAttribute("title", "Click to check todo");
		var iconCh = document.createElement("i");
		iconCh.className = "fa fa-check";
		doneButton.className = "check";
		doneButton.appendChild(iconCh);


		var editButton = document.createElement("button");
		editButton.setAttribute("title", "Click to edit todo");
   		var iconEdit = document.createElement("i");
   		var iconEdit1 = document.createElement("i");
   		iconEdit.className = "fa fa-pencil-square-o";
   		iconEdit1.className = "fa fa-check-circle-o";
   		editButton.className = "edit";
   		if(this.edit == true){ editButton.appendChild(iconEdit1); }
   		else { editButton.appendChild(iconEdit); }

   		var deleteButton = document.createElement("button");
   		deleteButton.setAttribute("title", "Click to delete todo");
   		var iconDel = document.createElement("i");
		iconDel.className = "fa fa-times";
		deleteButton.className = "del";
		deleteButton.appendChild(iconDel);



		tBar.appendChild(doneButton);
		tBar.appendChild(editButton);
		tBar.appendChild(deleteButton);
		this.elem.appendChild(fontAweTest);
   		this.elem.appendChild(internalElement);
   		this.elem.appendChild(tBar);

   		var instance = this;
   		doneButton.onclick = function (){
			instance.setChecked();
		};

		editButton.onclick = function (){
			if (instance.edit == true) instance.value = internalElement.value;
			instance.setEdit();
		};
		internalElement.onkeyup = function(event){
			if(event.which == 13){
				if (instance.edit == true) instance.value = internalElement.value;
				instance.setEdit();
			}
		};

		var parentList = this.list;
		deleteButton.onclick = function (){
			//debugger;
			parentList.deleteItem(instance);
			instance.render();
		};



		return this.elem;
	};


};



var myToDoList = new ToDoList();


var inputItemText = document.getElementById("text2");
inputItemText.focus();

var addButton = document.getElementById("add_button");
addButton.onclick = function() {
	if(!inputItemText.value || inputItemText.value == "" || inputItemText.value == " ") return false;
	myToDoList.addNewItem(new ToDoItem(inputItemText.value, false, false, myToDoList));
	//console.log(myToDoList.itemsArr);
	inputItemText.focus();
	inputItemText.select();
	myToDoList.render();
}

inputItemText.onkeyup = function(event) {
	if(event.which === 13){
		if(!inputItemText.value || inputItemText.value == "" || inputItemText.value == " ") return false;
		myToDoList.addNewItem(new ToDoItem(inputItemText.value, false, false, myToDoList));
		inputItemText.focus();
		inputItemText.select();
		myToDoList.render();
	}
}

document.getElementsByTagName('main')[0].appendChild(myToDoList.render());








/*
var dataListAll  = [];
var dataListActive = [];
var dataListCompleted = [];

var inputItemText = document.getElementById("text2");
inputItemText.focus();

inputItemText.onkeyup = function (event) {
	if(event.which === 13)
	{
		if(!inputItemText.value || inputItemText.value == "" || inputItemText.value == " ") return false;
		dataListAll.push({ value: inputItemText.value, checked: false, edit: false});
		inputItemText.focus();
		inputItemText.select();
	}
	render(dataListAll);
}

var addButton = document.getElementById("add_button");
addButton.onclick = function() {
	dataListAll.push({ value: inputItemText.value, checked: false, edit: false});
	inputItemText.focus();
	inputItemText.select();
	render(dataListAll);
}




function render(dl) {
	var container = document.getElementById("toDos");
	container.innerHTML = '';


	dl.forEach(function(dataItem) {
		var itemLi = document.createElement("li");
		itemLi.className = "view";


    	if (dataItem.edit) {
      		var internalElement = document.createElement('input');
     		internalElement.type = 'text';
     		internalElement.value = dataItem.value;
     		internalElement.className = "int_el";
    	} else {
      		var internalElement = document.createElement('span');
      		internalElement.className = dataItem.checked ? 'checked' : '';
      		internalElement.innerHTML = dataItem.value; 
    	}

			
		var fontAweTest = document.createElement("i");
		fontAweTest.className = "fa fa-hand-o-right";


		var tBar = document.createElement("div");
		tBar.className = "tBar";


		var doneButton = document.createElement("button");
		doneButton.setAttribute("title", "Click to check todo");
		var iconCh = document.createElement("i");
		iconCh.className = "fa fa-check";
		doneButton.className = "check";
		doneButton.appendChild(iconCh);
		doneButton.onclick = function () {
      		dataItem.checked = !dataItem.checked;
      		render(dl);
      		return false;	
   		};

		var editButton = document.createElement("button");
		editButton.setAttribute("title", "Click to edit todo");
   		var iconEdit = document.createElement("i");
   		var iconEdit1 = document.createElement("i");
   		iconEdit.className = "fa fa-pencil-square-o";
   		iconEdit1.className = "fa fa-check-circle-o";
   		editButton.className = "edit";
   		if(dataItem.edit){ editButton.appendChild(iconEdit1); }
   		else { editButton.appendChild(iconEdit); }
		editButton.onclick = function(){
			internalElement.focus();
			//internalElement.select();
   			if (dataItem.edit) dataItem.value = internalElement.value;
 			dataItem.edit = !dataItem.edit;
 			render(dl);
 			return false;
 		};
 		internalElement.onkeyup = function(event1) {
 			if(event1.which == 13) {
 				if (dataItem.edit) dataItem.value = internalElement.value;
 				dataItem.edit = !dataItem.edit;
 				render(dl);
 				return false;
 			}
 		};	


   		var deleteButton = document.createElement("button");
   		deleteButton.setAttribute("title", "Click to delete todo");
   		var iconDel = document.createElement("i");
		iconDel.className = "fa fa-times";
		deleteButton.className = "del";
		deleteButton.appendChild(iconDel);
		deleteButton.onclick = function () {
		 	for(var i = 0; i < dl.length; i++){
				if(dl[i] == dataItem) dl.splice(i,1);
		 	}
			render(dl);
		};


		tBar.appendChild(doneButton);
		tBar.appendChild(editButton);
		tBar.appendChild(deleteButton);
		itemLi.appendChild(fontAweTest);
   		itemLi.appendChild(internalElement);
   		itemLi.appendChild(tBar);
		container.appendChild(itemLi);
	});
	if(dl.length == 0) document.getElementById("empty_message").style.display = "block";
	else document.getElementById("empty_message").style.display = "none";
}
//-------------------------------------------------------

function renderFooter(currentFilter){
	var buttonContainer = document.getElementById("footLi");
	buttonContainer.innerHTML = "";
//-------------------------------------------------------
	var button1 = document.createElement("li");
	var showAllButton = document.createElement("button");
	showAllButton.id = "show_all";
	showAllButton.innerText = "All";
	showAllButton.className = currentFilter === "All" ? "filtered_button" : "";
	showAllButton.onclick = function () {
		render(dataListAll);
		renderFooter("All");
	};
	button1.appendChild(showAllButton);
	buttonContainer.appendChild(button1);
//-------------------------------------------------------
	var button2 = document.createElement("li");
	var showActiveButton = document.createElement("button");
	showActiveButton.id = "show_active";
	showActiveButton.innerText = "Active";
	showActiveButton.className = currentFilter === "Active" ? "filtered_button" : "";
	showActiveButton.onclick = function() {
		currentFilter = "Active";
		for(var i = 0; i < dataListAll.length; i++) {
			if(!dataListAll[i].checked){
				dataListActive.push(dataListAll[i]);
			}
		}
		render(dataListActive);
		dataListActive = [];
		renderFooter("Active");
	};
	button2.appendChild(showActiveButton);
	buttonContainer.appendChild(button2);
//-------------------------------------------------------
	var button3 = document.createElement("li");
	var showCompletedButton = document.createElement("button");
	showCompletedButton.id = "show_comleted";
	showCompletedButton.innerText = "Completed";
	showCompletedButton.className = currentFilter === "Completed" ? "filtered_button" : "";
	showCompletedButton.onclick = function() {
		currentFilter = "Completed";
		for(var i = 0; i < dataListAll.length; i++) {
			if(dataListAll[i].checked){
				dataListCompleted.push(dataListAll[i]);
			}
		}
		render(dataListCompleted);
		dataListCompleted = [];
		renderFooter("Completed");
	};
	button3.appendChild(showCompletedButton);
	buttonContainer.appendChild(button3);
//-------------------------------------------------------
	var button4 = document.createElement("li");
	var deleteCompletedButton = document.createElement("button");
	deleteCompletedButton.id = "clear_completed";
	deleteCompletedButton.innerText = "Clear completed";
	deleteCompletedButton.onclick = function() {
		var filteredDtaListAll = dataListAll.filter(function (item){
			var filteredItem;
			if(item.checked) filteredItem = item;
			return filteredItem;
		});
		for(var i = 0; i < dataListAll.length; i++){
			for(var j = 0; j < filteredDtaListAll.length; j++){
				if(dataListAll[i] === filteredDtaListAll[j]) dataListAll.splice(i, 1);
			}
		}
	
		render(dataListAll);
	};
	button4.appendChild(deleteCompletedButton);
	buttonContainer.appendChild(button4);
}

renderFooter("");
*/


/*
function ToDoItem(value, checked, edit) {
  this.instance = null;
  
  
 this.value = value;
 this.checked = checked; 
 this.edit = edit;

 this.setChecked = function() {};
 this.edit = function() {};
  
 this.render = function() {
  var itemLi = document.createElement("li");
  var span = document.createElement("span");
  span.innerText = "123123123";
  itemLi.appendChild(span);
   
   this.instance = itemLi
   this.attachEvents();
   return itemLi;
 };
  
 this.attachEvents = function() {
   if (this.instance) {
     this.instance.querySelector('span').onclick = function () { alert('hi')}
   }
 }; 
 
};

this.instance = itemLi
*/