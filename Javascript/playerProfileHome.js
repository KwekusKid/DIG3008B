
document.addEventListener("DOMContentLoaded", function () {

    const roleDes = [
        {
            position: "Goalkeeper",
            description: "The goalkeeper is the last line of defense and the first line of attack. They are responsible for protecting the goal and preventing the opposing team from scoring.",
            roles: [
                {
                    name: "Sweeper Keeper",
                    description: "A Goalkeeper that is excellent at disrupting play."
                },

                {
                    name: "Ball Playing Keeper",
                    description: "A Goalkeeper that is excellent at distributing the ball to teammates."
                }


            ]
        },

        {
            position: "Center Back",
            description: "Center Backs are the backbone of the defense. They are responsible for stopping opposing attackers and organizing the defensive line.",
            roles: [
                {
                    name: "Ball Playing Defender",
                    description: "A Center Back that is excellent at distributing the ball to teammates."
                },

                {
                    name: "Sweeper",
                    description: "A Center Back that uses there excellent athletic ability to disrupt opposition play and cover large spaces."

                }

            ]
        },

        {
            position: "Full Back",
            description: "Full Backs are responsible for defending against opposition wingers and providing width in attack. They often overlap with wingers to deliver crosses into the box.",
            roles: [
                {
                    name: "Inverted Full Back",
                    description: "A Full Back that moves centrally to support and overload the midfield for their team."
                },

                {
                    name: "Wide full Back",
                    description: "A Full Back that is excellent at defending against opposition wingers."
                }
            ]
        },

        {
            position: "Defensive Midfielder",
            description: "Defensive Midfielders shield the defense and break up opposition attacks. They are often the first line of attack when transitioning from defense to offense.",
            roles: [
                {
                    name: "The Ragista",
                    description: "A Defensive Midfielder that is excellent at dictating the tempo of the game."
                },
                {
                    name: "The Destroyer",
                    description: "A Defensive Midfielder that is excellent at breaking up opposition play, through tackling and interceptions."
                }

            ]

        },

        {
            position: "Midfielder",
            description: "Midfielders are the engine of the team. They link defense and attack, often controlling the flow of the game.",
            roles: [
                {
                    name: "Box to Box Midfielder",
                    description: "A Midfielder that is excellent at contributing to both defense and attack."
                },
                {
                    name: "Playmaker",
                    description: "A Midfielder that is excellent at distributing the ball with a wide range of passing."
                }

            ]
        },

        {
            position: "Attacking Midfielder",
            description: "Attacking Midfielders are creative playmakers who operate in advanced positions. They are responsible for creating scoring opportunities and often contribute with goals themselves.",
            roles: [
                {
                    name: "Mezzala",
                    description: "A player who combines there excellent athletic ability to score goals and create opportunities for their team."
                },
                {
                    name: "Advanced Playmaker",
                    description: "A player who uses there excellent vision and passing ability to create scoring opportunities for their team."
                },

                {
                    name: "Raumdeuter",
                    description: "A player who uses there excellent movement and positioning to find space and create scoring opportunities."
                }
            ]
        },

        {
            position: "Winger",
            description: "Wingers are responsible for providing width in attack and delivering crosses into the box. They often take on defenders one-on-one and create scoring opportunities for their teammates.",
            roles: [
                {
                    name: "Inside Forward",
                    description: "A Winger that cuts inside to create scoring opportunities for themselves and their teammates."
                },
                {
                    name: "Traditional Winger",
                    description: "A Winger that is excellent at delivering crosses into the box."
                },
                {
                    name: "Half Winger",
                    description: "A winger that is creative and can also contribute to the midfield play."
                }
            ]
        },

        {
            position: "Striker",
            description: "Strikers are the primary goal scorers for the team. They are responsible for finishing scoring opportunities and leading the attacking line.",
            roles: [
                {
                    name: "Poacher",
                    description: "A Striker that is excellent at scoring goals from smart movement in the box."
                },
                {
                    name: "TargetMan",
                    description: "A Striker that is excellent at holding up the ball and being an excellent aerial threat and box presence."
                },
                {
                    name: "False Nine",
                    description: "A Striker that drops deep to create scoring opportunities for their teammates by drawing defenders out of their positions."
                }
            ]

        }
    ]
    const panel = document.getElementById("infoPanel");
    const details = document.getElementById("playerDetails");
    const positionEl = document.getElementById("positionDescription");
    const closeBtn = document.getElementById('closePanel');
    const svg = document.querySelector('svg');

    // Open the side panel and shift the SVG left
    function openMenu(idOrName) {

        // idOrName may be a player number (1..11) or a position name string.
        let positionData = null;

        // If it's a number (or numeric string), try mapping player number -> position name
        const num = Number(idOrName);
        if (!Number.isNaN(num) && Number.isInteger(num)) {
            const mapping = {
                1: "Goalkeeper",
                2: "Full Back",
                3: "Full Back",
                4: "Center Back",
                5: "Center Back",
                6: "Defensive Midfielder",
                7: "Winger",
                8: "Midfielder",
                9: "Striker",
                10: "Attacking Midfielder",
                11: "Winger"
            };
            const posName = mapping[num];
            if (posName) positionData = roleDes.find(r => r.position.toLowerCase() === posName.toLowerCase());
        } else {
            // treat as a position name string
            const name = String(idOrName || '').trim();
            if (name) positionData = roleDes.find(r => r.position.toLowerCase() === name.toLowerCase());
        }

        // Populate the panel content safely
        if (positionData) {
            if (details) details.textContent = positionData.position;
            if (positionEl) {
                // clear
                positionEl.innerHTML = '';
                // description
                const desc = document.createElement('p');
                desc.textContent = positionData.description;
                positionEl.appendChild(desc);
                // roles list
                if (Array.isArray(positionData.roles) && positionData.roles.length) {
                    const rolesTitle = document.createElement('h4');
                    rolesTitle.textContent = 'Roles';
                    // add a class so we can style it from CSS (center, spacing)
                    rolesTitle.className = 'roles-title';
                    positionEl.appendChild(rolesTitle);
                    const ul = document.createElement('ul');
                    positionData.roles.forEach(r => {
                        const li = document.createElement('li');
                        const strong = document.createElement('strong');
                        strong.textContent = r.name + ': ';
                        li.appendChild(strong);
                        li.appendChild(document.createTextNode(r.description));
                        ul.appendChild(li);
                    });
                    positionEl.appendChild(ul);
                }
            }
        } else {
            if (details) details.textContent = "Information about " + idOrName;
            if (positionEl) positionEl.textContent = '';
        }

        // show panel and shift svg
        if (panel) {
            panel.classList.add("active");
            panel.setAttribute('aria-hidden', 'false');
        }
        if (svg) svg.classList.add('shifted');
    }

    // Close the side panel and reset SVG
    function closeMenu() {
        if (panel) {
            panel.classList.remove('active');
            panel.setAttribute('aria-hidden', 'true');
        }
        if (svg) svg.classList.remove('shifted');
    }

    // expose openMenu to global scope so inline onclick can call it
    window.openMenu = openMenu;

    if (closeBtn) closeBtn.addEventListener('click', closeMenu);

    // close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    });



});