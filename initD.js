'use strict'

var container = document.getElementById('container');
var menu = document.getElementById('menu');
var containerMain = document.getElementById('container-main');
var menuActive = document.getElementById('menu-active');
var modal = document.getElementById('modalTask');
var toDo = document.getElementById('toDo');
var completed = document.getElementById('completed');
var filter = document.getElementById('filter');
var task = document.getElementsByClassName('task');
var filterMenu = document.getElementById('filterMenu');
menu.style.height = containerMain.offsetHeight + 'px'
var monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"
  ];
var colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
		  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
		  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
		  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
		  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
		  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
		  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
		  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
		  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
		  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];


function displayMenu() {
	var elem = document.getElementById('menu-icon');
	var menuWidth = 0;
	var containerMainWidth = '';
	var header = document.getElementById('header')
	elem.onclick = function () {
		function aa() {
			menu.appendChild(elem);
			elem.style.position = 'absolute';
			elem.style.top = '20px'
			elem.style.left = '110%'
			elem.style.zIndex = '3'
			menu.style.overflow = 'visible'
		}
	if(menuWidth === 0) {
		if(window.innerWidth < 870 && window.innerWidth >= 750) {
			menuWidth = '30%';
			containerMainWidth = '70%';
			menuActive.style.display = 'block';
		} else if(window.innerWidth < 750 && window.innerWidth > 550) {
			menu.style.position = 'absolute';
			menu.style.zIndex = '2';
			menuWidth = '35%';
			containerMainWidth = '100%';
			menuActive.style.display = 'block';
			aa()
		} else if(window.innerWidth <= 550 && window.innerWidth > 420) {
			menu.style.position = 'absolute';
			menu.style.zIndex = '2';
			menuWidth = '50%';
			containerMainWidth = '100%';
			menuActive.style.display = 'block';
			aa()
		} else if(window.innerWidth <= 420) {
			menu.style.position = 'absolute';
			menu.style.zIndex = '2';
			menuWidth = '70%';
			containerMainWidth = '100%';
			menuActive.style.display = 'block';
			aa()
		} else if(window.innerWidth >= 870){
			menuWidth = '20%';
			containerMainWidth = '80%';
			menuActive.style.display = 'block';
		} 

		
	} else {
		menuWidth = 0;
		containerMainWidth = '100%';
		menuActive.style.display = 'none';
		header.prepend(elem);
		elem.style.position = 'relative';
		elem.style.top = '0'
		elem.style.left = '0'
		elem.style.zIndex = '1'
		menu.style.overflow = 'hidden'
		container.style.height = containerMain.offsetHeight + 'px';
	}
	menu.style.width = menuWidth;
	containerMain.style.width = containerMainWidth;
	setTimeout(function(){menu.style.height = containerMain.offsetHeight + 'px'}, 300)
	}

	document.addEventListener('click', function(event) {
	  if (containerMain.contains(event.target) && event.target !== elem) {
	  	menuWidth = 0;
		containerMainWidth = '100%';
		menuActive.style.display = 'none';
		header.prepend(elem);
		elem.style.position = 'relative';
		elem.style.top = '0'
		elem.style.left = '0'
		elem.style.zIndex = '3'
		menu.style.overflow = 'hidden'

	}
	menu.style.width = menuWidth;
	containerMain.style.width = containerMainWidth;
	setTimeout(function(){container.style.height = containerMain.offsetHeight + 'px'}, 300);
	})
}

displayMenu()

function displayProfile() {
	var profile = document.getElementById('profile')
	var profileActive = document.getElementById('profile-active');
	var profileClassArr = ['profile-active', 'profile-not-active']

	var profileMenu = document.getElementById('profileMenu')
	profile.addEventListener('click', function( event ) {
		
			profileActive.classList.remove('profile-not-active');
			profileActive.classList.add('profile-active');
			profileMenu.style.display = 'block';
		
	
	})
	document.addEventListener('click', function( event ) {
	  if (!profileMenu.contains(event.target) && event.target !== profile ) {
	    profileMenu.style.display = 'none';
		profileActive.classList.remove('profile-active');
		profileActive.classList.add('profile-not-active');
	}
	})

}
displayProfile();

function addTask () {
	var modalBtn = document.getElementById('addTask');
	var modalClose = document.getElementsByClassName('close')[0];
	var btnAddTask = document.getElementById('btn-add-task');
	modalBtn.onclick = function(){
		modal.style.display = 'block';
	var hModal = document.getElementById('hModal');
	hModal.textContent = 'Add Task';
	var btnAddTask = document.getElementById('btn-add-task');
	btnAddTask.textContent = 'Add';
	}
	modalClose.onclick = function(){
		modal.style.display = 'none';
	}

	modal.onclick = function(event) {
		if(event.target == modal) {
			modal.style.display = 'none';
		}
	}
	btnAddTask.onclick = function(event) {
		if(hModal.textContent == 'Add Task') {
		addNewTask();
		modal.style.display = 'none';
	}
	}

}
addTask();

function createTask(iconSymbol,nameTask,descTask, priority, date) {
	var taskAdd = document.createElement('div');
	taskAdd.classList.add('task');
	taskAdd.id = 'task' + (task.length + 1);
	taskAdd.setAttribute('draggable', 'true')
	toDo.appendChild(taskAdd);

	var taskInfo = document.createElement('div');
	taskInfo.classList.add('task-info');
	taskAdd.appendChild(taskInfo);

		var prior = document.createElement('span');
		prior.classList.add('priority');
		if(priority==1) {
			prior.classList.add('high-priority');
			prior.textContent = 'High Priority';
		} else if (priority==3) {
			prior.classList.add('low-priority');
			prior.textContent = 'Low Priority';
		}
		taskInfo.appendChild(prior);

		var dateCreate = document.createElement('div');
		dateCreate.classList.add('date');
		taskInfo.appendChild(dateCreate);
		dateCreate.textContent = date.day + date.month + date.year + date.time;


	var iconTask = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
	iconTask.classList.add('task-icon');
	iconTask.setAttribute('width', '40');
	iconTask.setAttribute('height', '40');
	taskAdd.appendChild(iconTask);

		var randomColor = colorArray[Math.floor(Math.random()*colorArray.length)]
		var iconCircle = document.createElementNS("http://www.w3.org/2000/svg",'circle');
        iconCircle.setAttribute('fill', randomColor);
        iconCircle.setAttribute('r', '20');
        iconCircle.setAttribute('cx', '20');
        iconCircle.setAttribute('cy', '20');
        iconTask.appendChild(iconCircle);

        var iconText = document.createElementNS("http://www.w3.org/2000/svg",'text');
        iconText.textContent = iconSymbol;
        iconText.setAttribute('x', '13');
        iconText.setAttribute('y', '28');
        iconText.setAttribute('fill', '#fff');
        iconText.setAttribute('font-size', '25');
        iconTask.appendChild(iconText);

    var descriptionTask = document.createElement('div');
    descriptionTask.classList.add('description-task');
    taskAdd.appendChild(descriptionTask);

    	var nameTaskElem = document.createElement('h3')
    	nameTaskElem.textContent = nameTask;
    	descriptionTask.appendChild(nameTaskElem);

    	var pTask = document.createElement('p');
    	pTask.textContent = descTask;
    	descriptionTask.appendChild(pTask);

    var iconMenuTask = document.createElement( 'div');
    iconMenuTask.classList.add('icon-task-menu');
	taskAdd.appendChild(iconMenuTask);


	var menuTask = document.createElement('ul');
	menuTask.classList.add('task-menu')
	taskAdd.appendChild(menuTask)

		for(var t = 1; t <=3 ; t++) {
			var j = document.createElement('li')
			menuTask.appendChild(j);
		}
		var li = menuTask.getElementsByTagName('li')
			li[0].classList.add('compl');
			li[0].textContent = 'Completed';
			li[1].classList.add('edit')
			li[1].textContent = 'Edit';
			li[2].classList.add('del')
			li[2].textContent = 'Delete';
		
	showTaskMenu()
};

function addNewTask() {
	var modalForm = document.getElementById('modal-form')
	var nameTask = document.getElementById('nameTask').value;
	var descTask = document.getElementById('descriptionTask').value;
	var priority = modalForm.elements.checkPriority.value;
	var iconSymbol = nameTask[0].toUpperCase();
	var dateNow = new Date;
	var date = {
		day: dateNow.getDate() + ' ',
		month: monthNames[dateNow.getMonth()] + ' ',
		year: dateNow.getFullYear() + ' ',
		time: dateNow.getHours() + ':' + dateNow.getMinutes()
	}
	createTask(iconSymbol, nameTask, descTask, priority, date )
	modal.style.display = 'none';
	countTask()
}


function countTask() {
	var countToDo = document.getElementById('toDoCount');
	var countCompleted = document.getElementById('completedCount');
	var task = toDo.getElementsByClassName('task')
	var count = 0;
	for(var i = 0; i < task.length; i++) {
		if(!(task[i].style.display === 'none')){
			count++
		}
		}
	countToDo.textContent = '('+ count + ')'
	countCompleted.textContent = '('+ completed.getElementsByClassName('task').length + ')'

};
countTask()

function createMenuTask (e) {
	var task = document.getElementsByClassName('task');
	for (var i = 0; i < task.length; i++) {
	var menuTask = document.createElement('ul');
	menuTask.classList.add('task-menu')
	task[i].appendChild(menuTask)

		for(var t = 1; t <=3 ; t++) {
			var j = document.createElement('li')
			menuTask.appendChild(j);
		}
		var li = menuTask.getElementsByTagName('li')
			li[0].classList.add('compl');
			li[0].textContent = 'Completed';
			li[1].classList.add('edit')
			li[1].textContent = 'Edit';
			li[2].classList.add('del')
			li[2].textContent = 'Delete';
		}
}
createMenuTask();


function completedBlock () {
	var taskCompleted = completed.getElementsByClassName('task');
	var taskMenuCompleted = completed.getElementsByClassName('task-menu');
for(var i = 0; i < taskCompleted.length; i++) {
		var taskInfo = taskCompleted[i].querySelector('.task-info');
		var date = taskInfo.getElementsByClassName('date')[0];
		var todoTask = document.createElement('li');
		todoTask.classList.add('to-do');
		todoTask.textContent = 'To Do';
		date.style.display = 'none';
		taskMenuCompleted[i].removeChild(taskMenuCompleted[i].getElementsByClassName('compl')[0]);
		taskMenuCompleted[i].removeChild(taskMenuCompleted[i].getElementsByClassName('edit')[0]);
		taskMenuCompleted[i].prepend(todoTask);
		if(taskInfo.getElementsByClassName('priority').length !== 0) {
			taskInfo.getElementsByClassName('priority')[0].style.display = 'none';
		}
		var spanCompleted = taskInfo.getElementsByClassName('task-completed')
		if(spanCompleted.length == 0 ) {
		spanCompleted = document.createElement('span');
		spanCompleted.textContent = 'Completed!';
		spanCompleted.classList.add('task-completed');
		taskInfo.appendChild(spanCompleted);
		}
	}
}
completedBlock()

function showTaskMenu() {
	var a = document.getElementsByClassName('icon-task-menu');
	var b = document.getElementsByClassName('task-menu');
	var compl = document.getElementsByClassName('compl');
	var edit =  document.getElementsByClassName('edit');
	var del = document.getElementsByClassName('del');
	var todoTask = document.getElementsByClassName('to-do')
	var task = document.getElementsByClassName('task');
	var taskToDo = toDo.getElementsByClassName('task')
	var taskInfo = document.getElementsByClassName('task-info');
	var date = document.getElementsByClassName('date');
	var btnAddTask = document.getElementById('btn-add-task');
for(var t = 0; t < a.length; t++) {
	function ff(arg, argB, compl, edit, del, task, taskInfo, date, btn, todoM ) {
	return function( event ) {
		if( event.target == argB)	{
			arg.style.display = 'block';
		}
		if (!arg.contains(event.target) && event.target !== argB) {
	  		arg.style.display = 'none'

		}
		if(event.target == compl && !completed.contains(event.target)) {
			dropInCompleted (task,arg,compl,edit,date, taskInfo)
		};

		if(event.target == todoM && !toDo.contains(event.target)) {
			dragInToDo (task, todoM, arg,date, taskInfo)
		}

		if(toDo.contains(event.target) && event.target == del) {
			toDo.removeChild(task)
			container.style.height = containerMain.offsetHeight + 'px';
		}
		if(completed.contains(event.target) && event.target == del) {
			completed.removeChild(task)
			container.style.height = containerMain.offsetHeight + 'px';
		}
		var hModal = document.getElementById('hModal');	
		if(event.target == edit) {
			hModal.textContent = 'Edit Task';
			var btnAddTask = document.getElementById('btn-add-task');
			btnAddTask.textContent = 'Edit';
			modal.style.display = 'block';
			task.appendChild(modal);

			
		}
		if(event.target  == btn && task.contains(event.target) && hModal.textContent == 'Edit Task') {
			modal.style.display = 'none';
			editMenu(task);
			document.getElementById('header').appendChild(modal)		
		}
		countTask()

  	
	 }
	}
	document.addEventListener('click', ff(b[t],a[t], compl[t], edit[t], del[t], task[t], 
		taskInfo[t], date[t], btnAddTask, todoTask[t - taskToDo.length]) , false)

	task[t].addEventListener('dragstart', function(event) {return dragStart(event)})

 }
var textData;
if(navigator.userAgent.indexOf('Firefox') !== -1) {
	textData = 'text/html'
} else {
	textData = 'text'
}

function dragStart(ev) {
   ev.dataTransfer.effectAllowed='move';
   ev.dataTransfer.setData(textData, ev.target.getAttribute('id'));
   ev.dataTransfer.setDragImage(ev.target,task[0].offsetWidth/2,task[0].offsetHeight/2);
   return true;
}
function dragEnter(ev) {
	ev.dataTransfer.dropEffect = 'move';
   ev.preventDefault();
   return true;
}
function dragOver(ev) {
	ev.dataTransfer.dropEffect = 'move';
     ev.preventDefault();
}
function dragDrop(ev) {
   var data = ev.dataTransfer.getData(textData);
   var task = document.getElementById(data);
   var arg = task.querySelector('.task-menu');
   var compl = task.querySelector('.compl');
   var edit = task.querySelector('.edit');
   var date = task.querySelector('.date');
   var taskInfo = task.querySelector('.task-info');
   var todoM = task.querySelector('.to-do');
   	if(completed.contains(ev.target)) {
   completed.appendChild(document.getElementById(data)) 
   dropInCompleted (task,arg,compl,edit,date, taskInfo);
	} 
	if(toDo.contains(ev.target)) {
	   toDo.appendChild(document.getElementById(data))
	   dragInToDo (task, todoM, arg,date, taskInfo)
	}
	countTask()
    ev.stopPropagation();
    return false;
}

toDo.addEventListener('ragenter', function(event) {return dragEnter(event)})
toDo.addEventListener('drop', function(event) {return dragDrop(event)})
toDo.addEventListener('dragover', function(event) {return dragOver(event)})

completed.addEventListener('ragenter', function(event) {return dragEnter(event)})
completed.addEventListener('drop', function(event) {return dragDrop(event)})
completed.addEventListener('dragover', function(event) {return dragOver(event)})
} 
showTaskMenu()

function filterPriority() {
	var task = toDo.getElementsByClassName('task');
	var priorityAll = document.getElementById('priorityAll');
	var priorityHigh = document.getElementById('priorityHigh');
	var priorityLow = document.getElementById('priorityLow');
	for(var i = 0; i < task.length; i++) {
		if(priorityAll.checked) {
			task[i].style.display = 'flex';
		} 
		if(task[i].querySelector('.high-priority') == null && priorityHigh.checked) {
			task[i].style.display = 'none';
			
		} else {
			task[i].style.display = 'flex';
			
		};
		if(task[i].querySelector('.low-priority') == null && priorityLow.checked) {
			task[i].style.display = 'none';
			
		}
		container.style.height = containerMain.offsetHeight + 'px';
		countTask()
	}
};

document.onclick = function(e) {
	if(filter.contains(e.target)) {
		filterMenu.style.display = 'block';
		filterPriority()
	} else {
		filterMenu.style.display = 'none'
	}
};

function sortDescending(a, b) {

     var date1  = $(a).find(".date").text();
     date1 = date1.split(' ');
     for(var i = 0; i < monthNames.length; i++){
     	if(date1.indexOf(monthNames[i]) !== -1) {
     		date1[1] = i + ''
     	}
     }
     date1 = new Date(date1[2], date1[1], date1[0]);
     var date2  = $(b).find(".date").text();
       date2= date2.split(' ');
     for(var i = 0; i < monthNames.length; i++){
     	if(date2.indexOf(monthNames[i]) !== -1) {
     		date2[1] = i + ''
     	}
     }
     date2= new Date(date2[2], date2[1], date2[0]);

     var newFirst = document.getElementById('newFirst');
     var oldFirst = document.getElementById('oldFirst');
     if(newFirst.checked){
     	return date1 < date2 ? 1 : -1;
     } if(oldFirst.checked) {
     	return date1 > date2 ? 1 : -1;
     } 
    };
    function ff() {
        $('#toDo .task').sort(sortDescending).appendTo('#toDo');
    };

var sort = document.getElementById('sort');
var sortMenu = document.getElementById('sortMenu')
sort.addEventListener('click', function(event ) {
  sortMenu.style.display = 'block';
  ff()
})
document.addEventListener('click', function(event ) {
  if (!sortMenu.contains(event.target) && event.target !== sort)
    sortMenu.style.display = 'none'
});


function editMenu (task){
	var modalForm = document.getElementById('modal-form')
	var nameTask = document.getElementById('nameTask').value;
	var descTask = document.getElementById('descriptionTask').value;
	var priority = modalForm.elements.checkPriority.value;
	var hModal = document.getElementById('hModal');
	hModal.textContent = 'Edit Task';
	var btnAddTask = document.getElementById('btn-add-task');
	btnAddTask.textContent = 'Edit';
	var iconSymbol = nameTask[0].toUpperCase();
	var dateNow = new Date;
	var date = {
		day: dateNow.getDate() + ' ',
		month: monthNames[dateNow.getMonth()] + ' ',
		year: dateNow.getFullYear() + ' ',
		time: dateNow.getHours() + ':' + dateNow.getMinutes()
	}
	editMenuBtn(task,nameTask,descTask,date, priority, iconSymbol)
	modal.style.display = 'none';
};

function editMenuBtn(task,b,c,d, e, symbol) {
	var h = task.querySelector('h3');
	h.textContent = b;
	var p = task.querySelector('p');  
	p.textContent = c;
	var date = task.querySelector('.date'); 
	date.textContent = d.day + d.month + d.year + d.time;
	var priority = task.querySelector('.priority'); 
	if(e==1) {
			priority.classList.add('high-priority');
			priority.textContent = 'High Priority';
		} else if (e==3) {
			priority.classList.add('low-priority');
			priority.textContent = 'Low Priority';
		}
	task.querySelector('text').textContent = symbol
};

function dropInCompleted (task,arg,compl,edit,date, taskInfo) {
			var todoTask = document.createElement('li');
			todoTask.classList.add('to-do');
			todoTask.textContent = 'To Do'
			completed.appendChild(task);
			arg.style.display = 'none';
			arg.removeChild(compl);
			arg.removeChild(edit);
			arg.prepend(todoTask);
			date.style.display = 'none';

			if(taskInfo.getElementsByClassName('priority').length !== 0) {
			taskInfo.getElementsByClassName('priority')[0].style.display = 'none';
			}

			var spanCompleted = document.createElement('span');
			spanCompleted.textContent = 'Completed!';
			spanCompleted.classList.add('task-completed');
			taskInfo.appendChild(spanCompleted);
			showTaskMenu()
};

function dragInToDo (task, todoM, arg,date, taskInfo) {
			toDo.appendChild(task);

			arg.removeChild(todoM);

			arg.style.display = 'none';
			var editt = document.createElement('li');
			editt.classList.add('edit');
			editt.textContent = 'Edit';
			arg.prepend(editt);
			date.style.display = 'block';
			var compll = document.createElement('li');
			compll.classList.add('compl');
			compll.textContent = 'Completed';
			arg.prepend(compll);

			if(taskInfo.getElementsByClassName('priority').length !== 0) {
			taskInfo.getElementsByClassName('priority')[0].style.display = 'block';
			}
			var spanC = taskInfo.querySelector('.task-completed')
			taskInfo.removeChild(spanC);
			showTaskMenu()
}


