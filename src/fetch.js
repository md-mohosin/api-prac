const cardContainer = document.getElementById("card-container")


fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(data => {
        const randomData = data.sort(() => 0.5 - Math.random()).slice(1, 11)
        randomData.map(d => {
            const card = document.createElement("div")
            card.innerHTML = `
            <div class="card">
                <div style="display: flex; justify-content: space-between;color: rgb(14, 112, 14);">
                    <h3 class="id">Post ID:${d.id}</h3>
                    <h3 class="id">User ID:${d.userId}</h3>
                </div>
                <div>
                    <p><span class="heading">Title:</span>${d.title}</p>
                    <p><span class="heading">Description:</span>${d.body} </p>
                    <a class="details-btn" href="" data-userId="${d.userId}">Details</a>
                </div>
            </div>`
            cardContainer.appendChild(card)
        })
    }
    )





const userIfno = document.getElementById("user-info")

cardContainer.addEventListener("click", function (e) {
    e.preventDefault()
    if (e.target.classList.contains('details-btn')) {
        const userId = e.target.dataset.userid
        userIfno.style.display = 'block'
        document.getElementById("all-cards").style.display = 'none'

        fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
            .then(res => res.json())
            .then(user => {
                const div = document.createElement("div")
                div.innerHTML = `
                     <div class="info">
      <h1 class="user-info-heading">User information</h1>
      <div class="user-info-card">
        <div class="name-id">
          <p class="user-name"><span class="heading">Name:</span></p>
          <p class="id"><span class="heading">ID:</span></p>
        </div>
        <div class="email-info">
          <p><span class="heading">Username:</span></p>
          <p><span class="heading">Eamil:</span></p>
        </div>
        <div class="phone-info">
          <p><span class="heading">Phone:</span></p>
          <p><span class="heading">Website:</span></p>
        </div>
      </div>
      <button class="back-btn" id="back">Back</button>
    </div>
                `
                userIfno.appendChild(div)
            })
    }
})




document.getElementById('back').addEventListener("click", () => {
    userIfno.style.display = 'none'
    document.getElementById("all-cards").style.display = 'block'
})