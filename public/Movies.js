const movies = [
    { 
        id: 24,
        img: "/movie/The Beekeeper.jpg",
        title: "The Beekeeper",
        genres: ["Action", "Thriller"],
        year: 2024,
        rate: "6.7",
        url: "/movies/The Beekeeper.html",
        type: "movie"
    },  
    {
        id: 523,
        img: "/",
        title: "The Ministry of Ungentlemanly Warfare",
        genres: "",
        genres: "",
        year: "",
        rate: "",
        url: "/movies/The Ministry of Ungentlemanly Warfare.html",
        page: 1
    },    
    {
        id: 523,
        img: "/movie/Longlegs.jpg",
        title: "Longlegs",
        genres: ["Crime", "Horror", "Thriller"],
        year: "2024",
        rate: "7.9",
        url: "/movies/Longlegs.html",
        type: "movie",
    },
    {
        id: 524,
        img: "/movie/Trigger Warning.avif",
        title: "Trigger Warning",
        genres: ["Action", "Crime", "Thriller"],
        year: "2024",
        rate: "4.6",
        url: "/movies/Trigger Warning.html",
        type: "movie",
    },   
















    {
        id: 2.127,
        img: "/series/the night agent.jpeg",
        title: "The Night Agent",
        genres: [""],
        year: 0,
        rate: " ",
        url: "/Shows/The Night Agent/The Night Agent.html",
        type: "series"
    },
    {
        id: 2.103,
        img: "/series/",
        title: "The Office",
        genres: [""],
        year: 0,
        rate: " ",
        url: "/Shows/The Office/The Office.html",
        type: "series"
    },
    {
        id: 2.41,
        img: "/series/Mary & George S1.jpg",
        title: "Mary & George",
        genres: [""],
        year: 0,
        rate: " ",
        url: "/Shows/Mary & George/Mary & George.html",
        type: "series"
    },
]


//Action button and action box
/*
let action1 = document.getElementById('action1');
let action_bx = document.getElementById('action_bx');


action1.addEventListener('click', () => {
    action1.classList.toggle('cato_button_active');
    action_bx.classList.toggle('movie_box_active');
});

const action_array = movies.filter((e) => {
    return e.genres == "Action";
});

action_array.forEach(element => {
    const { img, title, year, url, rate } = element;
    let card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
    <a href="${url}">
    <img src="${img}">
    <div class="content">
        <h5>${title}</h5>
        <h6>
            <span>${year}</span>
            <div class="rate">
                <i class="fa-solid fa-heart"></i>
                <i class="fa-solid fa-eye"></i>
                <i class="fa-solid fa-star"></i>
                <h6>${rate}</h6>
            </div>
        </h6>
    </div>
</a>`

action_bx.appendChild(card);
});



//Crime button and crime box
let crime1 = document.getElementById('crime1');
let crime_bx = document.getElementById('crime_bx');

crime1.addEventListener('click', () => {
    crime1.classList.toggle('cato_button_active');
    crime_bx.classList.toggle('movie_box_active');
});

const crime_array = movies.filter((e) => {
    return e.genres == "Crime";
});

crime_array.forEach(element => {
    const { img, title, year, url, rate } = element;
    let card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
    <a href="${url}">
    <img src="${img}">
    <div class="content">
        <h5>${title}</h5>
        <h6>
            <span>${year}</span>
            <div class="rate">
                <i class="fa-solid fa-heart"></i>
                <i class="fa-solid fa-eye"></i>
                <i class="fa-solid fa-star"></i>
                <h6>${rate}</h6>
            </div>
        </h6>
    </div>
</a>`

crime_bx.appendChild(card);
});



//Adventure button and adventure box
let adventure1 = document.getElementById('adventure1');
let adventure_bx = document.getElementById('adventure_bx');

adventure1.addEventListener('click', () => {
    adventure1.classList.toggle('cato_button_active');
    adventure_bx.classList.toggle('movie_box_active');
});

const adventure_array = movies.filter((e) => {
    return e.genres == "Adventure";
});

adventure_array.forEach(element => {
    const { img, title, year, url, rate } = element;
    let card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
    <a href="${url}">
    <img src="${img}">
    <div class="content">
        <h5>${title}</h5>
        <h6>
            <span>${year}</span>
            <div class="rate">
                <i class="fa-solid fa-heart"></i>
                <i class="fa-solid fa-eye"></i>
                <i class="fa-solid fa-star"></i>
                <h6>${rate}</h6>
            </div>
        </h6>
    </div>
</a>`

adventure_bx.appendChild(card);
});



//Biography button and biography box
let biography1 = document.getElementById('biography1');
let biography_bx = document.getElementById('biography_bx');

biography1.addEventListener('click', () => {
    biography1.classList.toggle('cato_button_active');
    biography_bx.classList.toggle('movie_box_active');
});

const biography_array = movies.filter((e) => {
    return e.genres == "Biography";
});

biography_array.forEach(element => {
    const { img, title, year, url, rate } = element;
    let card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
    <a href="${url}">
    <img src="${img}">
    <div class="content">
        <h5>${title}</h5>
        <h6>
            <span>${year}</span>
            <div class="rate">
                <i class="fa-solid fa-heart"></i>
                <i class="fa-solid fa-eye"></i>
                <i class="fa-solid fa-star"></i>
                <h6>${rate}</h6>
            </div>
        </h6>
    </div>
</a>`

biography_bx.appendChild(card);
});*/