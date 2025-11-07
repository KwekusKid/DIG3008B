
document.addEventListener("DOMContentLoaded", function (){
const positions = [
    {
        position: "Striker",
        description: "The focal point of a team, main goal scoring threat",
        roles: [
            {
                name: "False Nine",
                description: "A striker that drops deep to draw CBs",
                stats: "HIGH technical ability and hold up",
                example: "Bobby Firmino for Liverpool best season 2018/2019 where he scored 9 goals and provided 7 assists, playing a false nine role for Jurgen Klopp"
            },
            {
                name: "Poacher",
                description: "A striker that offers goal threat from smart box presence",
                stats: "HIGH off the ball movement",
                example: "Sergio Argueo's 2018/2019 season for Pep Guardiola's Manchester City, where he scored 21 goals in 31 starts."
            },
            {
                name: "Targetman",
                description: "A strong presence in the box",
                stats: "HIGH physicality and athletic ability",
                example:"Didier Drogba's 2009/2010 season for Chelsea where he scored 29 goals in all competitions, using his strength and aerial ability to dominate defenders."

            }
        ]
    },
    {
        position: "Midfielder",
        description: "The engine of the team, connects defense and attack",
        roles: [
            {
                name: "Playmaker",
                description: "Creates chances from deep positions",
                stats: "HIGH passing and vision",
                 
            },
            {
                name: "Box to Box",
                description: "Covers entire pitch from defense to attack",
                stats: "HIGH endurance and work rate"
            },
            {
                name: "Carrilero",
                description: "Wide midfielder who covers half-spaces",
                stats: "HIGH tactical intelligence and positioning"
            }
        ]
    },
    {
        position: "Attacking Midfielder",
        description: "Attacking threat from midfield",
        roles: [
            {
                name: "Mezzala",
                description: "Attacking box to box midfielder",
                stats: "HIGH in creativity and ball carrying"
            },
            {
                name: "Raumdeuter",
                description: "Using smart movement, players can become a goal threat",
                stats: "HIGH off ball movement",
                example: "Thomas Muller during the 2019/2020 season for Bayern Munich, where he scored 8 goals and provided 21 assists, showcasing his ability to find and exploit space effectively."
            },
            {
                name: "Advanced Playmaker",
                description: "Creative force in final third",
                stats: "HIGH vision and through balls"
            }
        ]
    },
    {
        position: "Defensive Midfielder",
        description: "Screens the backline, the pivot(s)",
        roles: [
            {
                name: "The Regista",
                description: "A deep line playmaker who progresses a teams play through a wide range of passing",
                stats: "HIGH passing range, can complete any pass at an excellent standard",
                example: "Andrea Pirlo during his time at Juventus, where he orchestrated play from deep positions with his exceptional passing ability."
            },
            {
                name: "Ball Winner",
                description: "Aggressive midfielder who breaks up opposition attacks",
                stats: "HIGH tackling and anticipation",
                example: ""
            },
            {
                name: "Anchor",
                description: "Stays deep to protect defensive line",
                stats: "HIGH positioning and interceptions"
            }
        ]
    },
    {
        position: "Fullback",
        description: "Provides width and defensive cover on flanks",
        roles: [
            {
                name: "Wide Fullback",
                description: "Traditional fullback who stays wide and provides crosses",
                stats: "HIGH crossing and stamina"
            },
            {
                name: "Inverted Fullback",
                description: "Moves into midfield areas to create overloads",
                stats: "HIGH technical ability and passing"
            }
        ]
    },
    {
        position: "Center Back",
        description: "Defensive backbone, organizes and protects the goal",
        roles: [
            {
                name: "Sweeper",
                description: "Covers behind defensive line and reads danger",
                stats: "HIGH anticipation and positioning"
            },
            {
                name: "Ball Playing Center Back",
                description: "Initiates attacks from defense with passing",
                stats: "HIGH passing range and composure"
            },
            {
                name: "All Rounder",
                description: "Complete defender with no major weaknesses",
                stats: "GOOD across all defensive attributes"
            }
        ]
    },
    {
        position: "Winger",
        description: "Attacking threat from wide areas",
        roles: [
            {
                name: "Inside Forward",
                description: "Cuts inside to shoot and create chances",
                stats: "HIGH shooting and dribbling"
            },
            {
                name: "Traditional Winger",
                description: "Creates chances from wide areas with crossing",
                stats: "HIGH crossing and vision"
            },
            {
                name: "Half Winger",
                description: "Hybrid role that combines winger and midfielder duties",
                stats: "HIGH tactical intelligence and versatility"
            }
        ]
    },
    {
        position: "Goalkeeper",
        description: "Last line of defense and first line of attack",
        roles: [
            {
                name: "Sweeper Keeper",
                description: "Acts as an extra defender outside the box",
                stats: "HIGH rushing out and passing"
            },
            {
                name: "Shot Stopper",
                description: "Traditional keeper focused on saving shots",
                stats: "HIGH reflexes and one-on-ones"
            },
            {
                name: "Modern Keeper",
                description: "Balanced approach with distribution skills",
                stats: "GOOD across all goalkeeping attributes"
            }
        ]
    }
];

// Add this JavaScript after your positions array

// Get DOM elements
const positionNameElement = document.querySelector('.positionName');
const positionDescriptionElement = document.querySelector('.positionDescription');
const positionRolesElement = document.querySelector('.positionRoles');
const placeholderTextElement = document.querySelector('.placeHolderText');
const roleNameElement = document.querySelector('.roleName');


// Function to find position data by position name
function findPositionData(positionName) {
    return positions.find(pos => 
        pos.position.toLowerCase() === positionName.toLowerCase()
    );
}

// Function to update the display with position data
function updatePositionDisplay(positionData) {
    // Hide placeholder text
    placeholderTextElement.style.display = 'none';
    
    // Update position name and description
    if (positionNameElement) positionNameElement.textContent = positionData.position;
    // debug: log the description element and the incoming description
    console.log('updatePositionDisplay - description element:', positionDescriptionElement);
    console.log('updatePositionDisplay - incoming description:', positionData && positionData.description);
    if (positionDescriptionElement) positionDescriptionElement.textContent = positionData.description;
    
    // Update roles section title
    if (roleNameElement) roleNameElement.textContent = `Roles`;

    // Clear existing roles and rebuild safely
    if (positionRolesElement) {
        positionRolesElement.innerHTML = '';
        const frag = document.createDocumentFragment();
        (positionData.roles || []).forEach(role => {
            const roleItem = document.createElement('li');
            roleItem.className = 'role';

            const title = document.createElement('h3');
            title.className = 'role-title';
            title.textContent = role.name;

            const section = document.createElement('section');
            section.className = 'roleDescription';

            const pDesc = document.createElement('p');
            const strongDesc = document.createElement('strong');
            strongDesc.textContent = 'Description:';
            pDesc.appendChild(strongDesc);
            pDesc.appendChild(document.createTextNode(' ' + (role.description || '')));

            const pStats = document.createElement('p');
            const strongStats = document.createElement('strong');
            strongStats.textContent = 'Key Stats:';
            pStats.appendChild(strongStats);
            pStats.appendChild(document.createTextNode(' ' + (role.stats || '')));

            const pExample = document.createElement('p');
            const strongExample = document.createElement('strong');
            strongExample.textContent = 'Example:';
            pExample.appendChild(strongExample);
            pExample.appendChild(document.createTextNode(' ' + (role.example || '')));

            section.appendChild(pDesc);
            section.appendChild(pStats);
            section.appendChild(pExample);

                        roleItem.appendChild(title);
                        roleItem.appendChild(section);

                        // add click listener directly to the title element before it's appended
                        title.addEventListener('click', () => {
                                // collapse any other open roles inside this container
                                const siblingRoles = positionRolesElement.querySelectorAll('.role');
                                siblingRoles.forEach(r => { if (r !== roleItem) r.classList.remove('active'); });
                                // toggle this role
                                roleItem.classList.toggle('active');
                        });

                        frag.appendChild(roleItem);
        });
        positionRolesElement.appendChild(frag);
    } else {
        console.warn('positionRolesElement not found, cannot render roles');
    }
    
    // Show all elements (in case they were hidden)
    positionNameElement.style.display = 'block';
    positionDescriptionElement.style.display = 'block';
    roleNameElement.style.display = 'block';
    positionRolesElement.style.display = 'block';
}

// Function to reset to initial state
function resetToInitialState() {
    placeholderTextElement.style.display = 'none';
    positionNameElement.textContent = '';
    positionDescriptionElement.textContent = '';
    roleNameElement.textContent = '';
    positionRolesElement.innerHTML = '';
}

// Add click event listeners to all player circles


    // include SVG groups and regular elements
    const players = document.querySelectorAll('g.player, .player');
    
    console.log(`Found ${players.length} players (searched "g.player, .player")`);

    players.forEach(player => {
        const position = player.getAttribute('data-position') || '';

  
        player.addEventListener('click', function(event){
            event.stopPropagation(); // prevent outside-click reset
            console.log(`Player position: ${position}`);

               const positionMap = {
             'goalkeeper': 'Goalkeeper',
             'leftBack': 'Fullback',
             'leftCenterBack': 'Center Back',
             'rightCenterBack': 'Center Back',
             'rightBack': 'Fullback',
            'centralMidfielder': 'Midfielder',
            'attackingMidfielder': 'Attacking Midfielder',
             'defensiveMidfielder': 'Defensive Midfielder',
             'striker': 'Striker',
            'leftWinger': 'Winger',
             'rightWinger': 'Winger'
         };

         const descriptionMap = {
            

         }
            const mappedPositionName = positionMap[position];
        
         if (mappedPositionName) {
             const positionData = findPositionData(mappedPositionName);
            
             if (positionData) {
                 updatePositionDisplay(positionData);
               
                 // Optional: Add visual feedback for selected position (include SVG <g> elements)
                 document.querySelectorAll('g.player, .player').forEach(p => {
                     p.style.opacity = '0.7'; // Dim other players
                 });
                 this.style.opacity = '1'; // Highlight selected player
             }
         }
     });
        });
    });


// position.forEach(player => {
//     player.addEventListener('click', function() {
//         const positionName = this.getAttribute('data-position');
//         console.log(positionName)
//         // Map SVG position names to your data structure names
//         const positionMap = {
//             'goalkeeper': 'Goalkeeper',
//             'leftBack': 'Fullback',
//             'leftCenterBack': 'Center Back',
//             'rightCenterBack': 'Center Back',
//             'rightBack': 'Fullback',
//             'centralMidfielder': 'Midfielder',
//             'defensiveMidfielder': 'Defensive Midfielder',
//             'striker': 'Striker',
//             'leftWinger': 'Winger',
//             'rightWinger': 'Winger'
//         };
        
//         const mappedPositionName = positionMap[positionName];
        
//         if (mappedPositionName) {
//             const positionData = findPositionData(mappedPositionName);
            
//             if (positionData) {
//                 updatePositionDisplay(positionData);
               
//                 // Optional: Add visual feedback for selected position
//                 document.querySelectorAll('.player').forEach(p => {
//                     p.style.opacity = '0.7'; // Dim other players
//                 });
//                 this.style.opacity = '1'; // Highlight selected player
//             }
//         }
//     });
// });

// Optional: Add keyboard navigation and escape key to reset
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        resetToInitialState();
        // Reset all player opacities
        document.querySelectorAll('.player').forEach(player => {
            player.style.opacity = '1';
        });
    }


// Optional: Click outside to reset
document.addEventListener('click', function(event) {
    if (!event.target.closest('.player') && !event.target.closest('.playerDescription')) {
        resetToInitialState();
        document.querySelectorAll('.player').forEach(player => {
            player.style.opacity = '1';
        });
    }
});
});
