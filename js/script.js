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
            <img class="avatar" src="${data[i].picture.large}" alt="Profile Picture">
            <h3>${data[i].name.first} ${data[i].name.last}</h3>
            <span class="email">${data[i].email}</span>
            </div>
            <div class="joined-details">
            <span class="date">${data[i].registered.date}</span>
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


// Call functions
showPage(data, 1);
addPagination(data);