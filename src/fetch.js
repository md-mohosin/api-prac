const cardContainer = document.getElementById("card-container")
const userInfo = document.getElementById("user-info")
const singleUser = document.getElementById("single-user")
const backBtn = document.getElementById("back")


// fetch('https://jsonplaceholder.typicode.com/posts')
//     .then(res => res.json())
//     .then(data => {
//         const randomData = data.sort(() => 0.5 - Math.random()).slice(1, 11)
//         randomData.map(d => {
//             const card = document.createElement("div")
//             card.innerHTML = `
//             <div class="card">
//                 <div style="display: flex; justify-content: space-between;color: rgb(14, 112, 14);">
//                     <h3 class="id">Post ID:${d.id}</h3>
//                     <h3 class="id">User ID:${d.userId}</h3>
//                 </div>
//                 <div>
//                     <p><span class="heading">Title:</span>${d.title}</p>
//                     <p><span class="heading">Description:</span>${d.body} </p>
//                     <a class="details-btn" href="" data-userId="${d.userId}">Details</a>
//                 </div>
//             </div>`
//             cardContainer.appendChild(card)
//         })
//     }
//     )


// ROUTER FUNCTION

function router() {
    const path = window.location.pathname
    if (path === '/' || path === '') {
        showPost()
    }
    else if (path.startsWith("/user/")) {
        const userId = path.split("/")[2]
        showUser(userId)
    }
}




// const userIfno = document.getElementById("user-info")
// cardContainer.addEventListener("click", function (e) {
//     e.preventDefault()
//     if (e.target.classList.contains('details-btn')) {
//         const userId = e.target.dataset.userid
//         userIfno.style.display = 'block'
//         document.getElementById("all-cards").style.display = 'none'

//         fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
//             .then(res => res.json())
//             .then(user => {
//                 const div = document.createElement("div")
//                 div.innerHTML = `
//                      <div class="info">
//       <h1 class="user-info-heading">User information</h1>
//       <div class="user-info-card">
//         <div class="name-id">
//           <p class="user-name"><span class="heading">Name:</span>${user.name}</p>
//           <p class="id"><span class="heading">ID:</span>${user.id}</p>
//         </div>
//         <div class="email-info">
//           <p><span class="heading">Username:</span>${user.username}</p>
//           <p><span class="heading">Eamil:</span>${user.email}</p>
//         </div>
//         <div class="phone-info">
//           <p><span class="heading">Phone:</span>${user.phone}</p>
//           <p><span class="heading">Website:</span>${user.website}</p>
//         </div>
//       </div>
//     </div>
//                 `
//                 singleUser.appendChild(div)
//             })
//     }
// })



// SHOW POSTS
function showPost() {
    userInfo.style.display = 'none'
    document.getElementById("all-cards").style.display = "block";
    cardContainer.innerHTML = ''

    fetch("https://jsonplaceholder.typicode.com/posts")
        .then(res => res.json())
        .then(data => {
            data.forEach(post => {
                const div = document.createElement("div")
                div.className = 'card'

                div.innerHTML = `
             <h3>Post ID: ${post.id}</h3>
          <p>${post.title}</p>
          <button class="details-btn" data-userid="${post.userId}">
            Details
          </button>
            `
                cardContainer.appendChild(div)
            })
        })
}






// SHOW SINGLE USER
function showUser(userId) {
    document.getElementById("all-cards").style.display = "none";
    userInfo.style.display = "block";
    singleUser.innerHTML = "";

    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then(res => res.json())
        .then(user => {
            singleUser.innerHTML = `
        <h2>${user.name}</h2>
        <p><b>Username:</b> ${user.username}</p>
        <p><b>Email:</b> ${user.email}</p>
        <p><b>Phone:</b> ${user.phone}</p>
        <p><b>Website:</b> ${user.website}</p>
      `
        })
}






// CLICK HANDLING
cardContainer.addEventListener("click", e => {
    if (e.target.classList.contains("details-btn")) {
        const userId = e.target.dataset.userid;

        history.pushState({ userId }, "", `user/${userId}`)
        showUser(userId)
    }
})




//   BACK BUTTON
backBtn.addEventListener("click",()=>{
    history.pushState({},"","/")
    showPost()
})



window.onpopstate = () => {
  router();
};


router()


// document.getElementById('back').addEventListener("click", () => {
//     userIfno.style.display = 'none'
//     document.getElementById("all-cards").style.display = 'block'
//     singleUser.innerHTML = ''
// })