/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/**
 * Create showPage function which will display students on the page.
 * @param {list} will store array data from the students data.js
 * @param {page} will display the current page.
 */

function showPage(list, page) {
   const startIndex = (page * 9) - 9;
   const endIndex = page * 9; 
   const studentList = document.querySelector('.student-list');
   studentList.innerHTML = '';
   for (let i = 0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {
         let studentItem = `
         <li class="student-item cf">
            <div class="student-details">
            <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
            <h3>${list[i].name.first} ${list[i].name.last}</h3>
            <span class="email">${list[i].email}</span>
            </div>
            <div class="joined-details">
            <span class="date">Joined ${list[i].registered.date}</span>
            </div>
         </li>
         `;
         studentList.insertAdjacentHTML('beforeend', studentItem);
      }
   }
 }

/**
 * Create a function for pagination. 
 * The number in the pagination should correspond to the number of elements on the page.
 * OnClick to the pagination will set the .active class and will display the elements to that page.
 * @param {list} students array list which is divided by the number of students per page to display the page number.
 */

function addPagination(list) {
   const numOfPages = Math.ceil(list.length / 9);
   const linkList = document.querySelector('.link-list');
   linkList.innerHTML = '';
   for (let i = 1; i <= numOfPages; i++) {
      let button = `
      <li>
         <button type="button">${i}</button>
      </li>
      `;
      linkList.insertAdjacentHTML('beforeend', button);
   }

   document.querySelector('button').className = 'active';

   linkList.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
         const active = document.querySelector('.active');
         active.className = '';
         e.target.className = 'active';
         showPage(list, e.target.textContent);
      }
   });
 }

/**
 * Adding Search Bar
 * Handling click and keyup events
 */
function addSearchBar() {
   const header = document.querySelector('.header');

   const searchElement = `
      <label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
      </label> 
   `;
   
   header.insertAdjacentHTML('beforeend', searchElement);

   const search = document.querySelector('.student-search input');
   const submit = document.querySelector('.student-search button');

   submit.addEventListener('click', (e) => {
      e.preventDefault();
      searchFunc(data);
   });
   
   search.addEventListener('keyup', () => {
      searchFunc(data);
   });
}

/**
 * Search function
 * Filter .student-list based on search input
 * @param {list} returns the data of students 
 */
function searchFunc(list) {
   const studentList = document.querySelector('.student-list');
   const input = document.querySelector('.student-search input').value.toLowerCase();
   const showStudents = [];
   for (let i = 0; i < list.length; i++) {
      const name = Object.values(list[i].name).join(' ').toLowerCase();
      if ( input !== 0 && name.includes(input)) {
         showStudents.push(list[i]);
         studentList.textContent = '';
         showPage(showStudents, 1);
         addPagination(showStudents);
       }
       if (showStudents.length === 0) {
          studentList.textContent = 'No results found';
          addPagination(showStudents);
       }
   }
}


// Call functions
showPage(data, 1);
addPagination(data);
addSearchBar();