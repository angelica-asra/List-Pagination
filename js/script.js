/******************************************
Angelica
Project 2 - List Filter and Pagination
******************************************/

// A global variable for the student list and a global variable setting the number of students per page.  
var studentlist = document.getElementsByClassName("student-item cf");
var perpage = 10; 

// I don't personally understand why I would make list a parameter of this function since studentlist is a global variable, and, were it not global, 
// that would definitely complicate the callback function. Regardless, I have included it as a parameter here. 

/*** 
	The showPage function calculates indices to slice the student list, retaining only the 10 students required for a given page.   	
***/

function showPage(list, page) {
	var startindex = (page-1)*perpage;
	var endindex = (page*perpage)-1;  
	// Loop through the student list and set the student's info to display only if it is within the designated range for the page. 
	for (i = 0; i < list.length; i++) {
	  	if (i >= startindex && i <= endindex) {
			list[i].style.display = "block";
		} else {
 			list[i].style.display = "none";
		}
	}
}

/*** 
	The changePage function	is a callback referenced within the appendPageLinks function below. It changes the page by setting the 
	clicked link's class to active and calling showPage with the associated page number. 
***/

function changePage(e) {
	// Get list of links created in appendPageLinks. 
	linklist = document.getElementsByClassName("pagination")[0].children[0];
	length = linklist.children.length;
	linkelements = linklist.getElementsByTagName("li");
	// Loop over the elements and give the clicked link (event target) a class of 'active' while removing the class from the previous page's link. 
	for (i = 0; i < linkelements.length; i++) {
		if (linkelements[i].children[0] == e.target) {
			e.target.className = "active";	
		} else {
			linkelements[i].children[0].classList.remove("active");
		}
	}
	var pagenumber = e.target.innerText;
	// Change the page displayed by calling showPage. 
	showPage(studentlist,pagenumber);
}

/*** 
   The appendPageLinks function dynamically creates DOM elements for the navigation links according to the student list provided. 
***/

function appendPageLinks(list) {
	var pagination = document.createElement("div");
	pagination.className = "pagination";

	var ul = document.createElement("ul");
	pagination.appendChild(ul); 

	var howmanypages = Math.ceil(list.length/perpage); 
	
	// Add in list element with its anchor tag child for each page link needed.  
	for (i = 0; i < howmanypages; i++) {
	  	var li = document.createElement("li"); 
	  	var a = document.createElement("a"); 
	  	if (i === 0) {
	  		// Set the first page to active by default. 
			a.className = "active";
		} 
	  	a.innerText = i+1; 
		a.href = "#";
		a.mylist = list;
		// Add an event listener to make the click functional with the changePage callback. 
		a.addEventListener("click", changePage);
		li.appendChild(a);
	  	ul.appendChild(li);  
	}

	// Append the pagination div element and all its children to the page class div element. 
	var mypage = document.getElementsByClassName("page")[0];
	mypage.appendChild(pagination);
}

// Call the showPage and appendPageLinks functions to display the first page of students and add in the navigation dynamically. 
showPage(studentlist,1); 
appendPageLinks(studentlist);
