// ==========================================
// UYO CHAMBER OF COMMERCE
// Directory Page
// WDD 231
// ==========================================

const directory = document.querySelector("#directory");
const gridButton = document.querySelector("#gridView");
const listButton = document.querySelector("#listView");

const membersURL = "data/members.json";

// Load member data
const getMembers = async() =>{

    try{

        const response = await fetch(membersURL);

        if(!response.ok){
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const members = await response.json();

        displayMembers(members);

    }catch(error){

        console.error("Unable to load member data.", error);

        directory.innerHTML = `
            <p class="error-message">
                Sorry, the business directory could not be loaded.
            </p>
        `;
    }

};

// Display members as cards
const displayMembers = (members) =>{

    directory.innerHTML = "";

    members.forEach((member) =>{

        const card = document.createElement("section");
        card.classList.add("member-card");

        const membershipLevel =
            member.membership === 3
                ? "Gold Member"
                : member.membership === 2
                ? "Silver Member"
                : "Member";

        card.innerHTML = `
            <img
                src="${member.image}"
                alt="${member.name} Logo"
                loading="lazy"
                width="300"
                height="200"
            >

            <div class="member-content">

                <h3>${member.name}</h3>

                <p>${member.description}</p>

                <p><strong>Address:</strong><br>${member.address}</p>

                <p><strong>Phone:</strong><br>${member.phone}</p>

                <p>
                    <strong>Email:</strong><br>
                    <a href="mailto:${member.email}">
                        ${member.email}
                    </a>
                </p>

                <p>
                    <strong>Website:</strong><br>
                    
                        href="${member.website}"
                        target="_blank"
                        rel="noopener noreferrer">
                        Visit Website
                    </a>
                </p>

                <p>
                    <strong>Membership:</strong>
                    ${membershipLevel}
                </p>

            </div>
        `;

        directory.appendChild(card);

    });

};

// Grid View
gridButton.addEventListener("click",() =>{

    directory.classList.remove("list-view");

});

// List View
listButton.addEventListener("click",() =>{

    directory.classList.add("list-view");

});

// Load data when page opens
getMembers();