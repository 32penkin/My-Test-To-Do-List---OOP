function ToDoList() {
// use single quotes
this.elem = document.createElement("ul");
// name it as itemsList or just items - you don't need to specify a type as a name of a variable	
this.itemsArr = [];
	
// use single quotes (') instead of double
this.currentFilter = "";

this.addNewItem = function(item) {
	// don't use tabs, use spaces (you can configure this in your editor to insert spaces on a tab press)
	// two spaces is prefered
	this.itemsArr.push(item);
};
this.deleteItem = function(instance) {
	// use .forEach or .filter this.itemsArr = this.itemsArr.filter(function(item) {retun item !== instance}
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
	
	// use .filter
	for(var i = 0; i < this.itemsArr.length; i++) {
		// always use === operator or use exclamation point if (!this.itemsArr[i].checked) {}
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
		
		// always use === operator or just if (this.itemsArr[i].checked) {}
		if(this.itemsArr[i].checked == true){
			itemsArrActive.push(this.itemsArr[i]);
		}
	}
	this.itemsArr = itemsArrActive;
	this.render();
	this.itemsArr = temp;
};
	
	
// generally you can rewrite this method without all this cycles inside	
this.deleteCompleted = function() {
	// you can be just .filter(function (item) { return item.checked})
	// so you don't need this overcomplication 
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
	
	// don't use button1 as a name as it doesn't give you understanding of what this button do
	// instead name it as for example showAllContainer
	var button1 = document.createElement("li");
	var showAllButton = document.createElement("button");
	// class names should be separated with - show-all instead of show_all
	showAllButton.className = "show_all";
	showAllButton.innerText = "All";
	showAllButton.className = this.currentFilter === "All" ? "filtered_button" : "";
	
	// remove this ?
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
