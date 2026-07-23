// ==========================================
// UYO CHAMBER OF COMMERCE
// Member Spotlights Script
// WDD 231
// ==========================================

const spotlightCards = document.querySelector("#spotlightCards");

const membersURL = "data/members.json";

// Load member data
const getSpotlightMembers = async() =>{

    try{

        const response = await fetch(membersURL);

        if(!response.ok){
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const members = await response.json();

        displaySpotlights(members);

    }catch(error){

        console.error("Unable to load member spotlights.", error);

        spotlightCards.innerHTML = `
            <p class="error-message">
                Sorry, member spotlights could not be loaded.
            </p>
        `;
    }

};

// Filter, shuffle, and display 2-3 gold/silver spotlight members
const displaySpotlights = (members) =>{

    const eligibleMembers = members.filter((member) =>
        member.membership === 2 || member.membership === 3
    );

    const shuffled = eligibleMembers.sort(() => Math.random() - 0.5);

    const numberToShow = Math.random() < 0.5 ? 2 : 3;

    const selectedMembers = shuffled.slice(0,numberToShow);

    spotlightCards.innerHTML = "";

    selectedMembers.forEach((member) =>{

        const membershipLevel =
            member.membership === 3 ? "Gold Member" : "Silver Member";

        const card = document.createElement("article");
        card.classList.add("spotlight-card");

        card.innerHTML = `
            <img
                src="${member.image}"
                alt="${member.name} Logo"
                loading="lazy"
                width="200"
                height="160">

            <h3>${member.name}</h3>

            <p>${member.phone}</p>

            <p>${member.address}</p>

            <p>
                <a
                
                    href="${member.website}"
                    target="_blank"
                    rel="noopener noreferrer">
                    Visit Website
                </a>
            </p>

            <span class="badge">${membershipLevel}</span>
        `;

        spotlightCards.appendChild(card);

    });

};

// Load spotlights when page opens
getSpotlightMembers();