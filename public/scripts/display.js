console.log("Front end working");

// Counter to keep track of how many buttons have been created
let nodeCounter = 0;
let nodeDetails = []; //no

const svgLayer = document.getElementById('svgLayer');

const infoBox = document.getElementById('infoBox');
const infoBoxContainer = document.getElementById('infoBoxContainer');

// Function to add a circle to the SVG at the click position
function drawCircle(event) {  //if in edit mode, need to add lines too
    nodeCounter++;
    const nodeNo = nodeCounter;
    const rect = svgLayer.getBoundingClientRect();
    let hideTimeout;

    const x = event.clientX - rect.left; // Get x position relative to the SVG
    const y = event.clientY - rect.top;  // Get y position relative to the SVG

    // Create a new circle element
    const newCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    newCircle.setAttribute('cx', x);
    newCircle.setAttribute('cy', y);
    newCircle.setAttribute('r', 20); // Radius of the circle
    newCircle.setAttribute('fill', 'red');
    newCircle.setAttribute('stroke', 'black');
    newCircle.setAttribute('stroke-width', 2);

    // Add a hover event listener to the new circle
    newCircle.addEventListener('mouseover', (event) => {
        clearTimeout(hideTimeout);
        const rect = svgLayer.getBoundingClientRect();
        newCircle.setAttribute('fill', 'green');
        const a = newCircle.cx.baseVal.value - rect.left - infoBoxContainer.width.baseVal.value / 2 + newCircle.r.baseVal.value + 6;
        const b = newCircle.cy.baseVal.value - rect.top - 70;



        const newBox = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        newBox.setAttribute('points', "0,0 150,0 150,50 100,50 75,70 50,50 0,50");
        newBox.setAttribute('class', "info-box.show")
        newBox.setAttribute('id', `node${nodeNo}`);

        //newBox.className = "info-box";
        newBox.style.transform = `translate(${a}px, ${b}px)`;
        newBox.setAttribute('fill', 'red');
        newBox.setAttribute('stroke', 'black');
        newBox.setAttribute('stroke-width', 2);

        newBox.addEventListener('mouseover', (event) => {

        });
        newBox.addEventListener('mouseout', (event) => {

        });

        const newText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        newText.setAttribute('x', newCircle.cx.baseVal.value - rect.left - 21);
        newText.setAttribute('y', newCircle.cy.baseVal.value - rect.top - 40);

        //console.log(parseInt(newBox.id.slice(4))-1, nodeDetails.length)
        //display name or node n
        if (parseInt(newBox.id.slice(4)) - 1 < nodeDetails.length)
            newText.innerHTML = nodeDetails[parseInt(newBox.id.slice(4)) - 1].name;
        else
            newText.innerHTML = newBox.id //node4

        svgLayer.appendChild(newBox);
        svgLayer.appendChild(newText);
        event.stopImmediatePropagation();
    });

    newCircle.addEventListener('mouseout', (event) => {
        newCircle.setAttribute('fill', 'blue');
        hideTimeout = setTimeout(() => {
            const polygons = svgLayer.querySelectorAll('polygon');
            const texts = svgLayer.querySelectorAll('text');
            // Loop through each polygon and remove it
            polygons.forEach(polygon => polygon.remove());
            texts.forEach(text => text.remove()); // too broad, not working with the delay/animation
            //removing last child twice cause them to stick sometimes

        }, 100);


        event.stopImmediatePropagation();
    });

    // Add a click event listener to the new circle
    newCircle.addEventListener('click', (event) => {
        redirectToText(nodeNo);
        event.stopImmediatePropagation();
        //alert('You clicked a circle!');
    });

    // Append the new circle to the SVG layer
    svgLayer.appendChild(newCircle);
}

function editRelationships() {
    const lines = svgLayer.querySelectorAll('line');

    lines.forEach(line => {
        line.setAttribute('stroke-width', 8);
    });

    // Select all buttons within the clickArea
    const nodes = svgLayer.querySelectorAll('circle');
    //console.log("test")
    console.log("nodes:", nodes.length)

    const coordinates = [];
    let counter = 0;

    // Loop through each button and log its position
    nodes.forEach(node => {
        //console.log(node.cx.baseVal.value)
        coordinates[counter] = parseInt(node.cx.baseVal.value);
        counter++
        coordinates[counter] = parseInt(node.cy.baseVal.value);
        counter++

    });

    counter = 0;

    for (counter = 0; counter < nodes.length * 2; counter = counter + 2) {
        for (let counter2 = counter + 2; counter2 < nodes.length * 2; counter2 = counter2 + 2) {
            let preExisting = false;
            lines.forEach(line => {
                //console.log(coordinates[counter], line.x1.baseVal.value,coordinates[counter2], line.x2.baseVal.value )
                if (coordinates[counter] == line.x1.baseVal.value && coordinates[counter + 1] == line.y1.baseVal.value &&
                    coordinates[counter2] == line.x2.baseVal.value && coordinates[counter2 + 1] == line.y2.baseVal.value) {
                    preExisting = true
                }
            });
            //console.log(preExisting)
            if (!preExisting) {

                //console.log(counter / 2, counter2 / 2, coordinates.length, coordinates[counter], coordinates[counter + 1])


                // Create a new line element
                const newLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                newLine.setAttribute('x1', coordinates[counter]);
                newLine.setAttribute('y1', coordinates[counter + 1]);
                newLine.setAttribute('x2', coordinates[counter2]);
                newLine.setAttribute('y2', coordinates[counter2 + 1]);
                newLine.setAttribute('stroke', 'white');
                newLine.setAttribute('stroke-width', 8);
                newLine.setAttribute('enabled', false)
                newLine.value = false

                // Add a click event listener to the new circle
                newLine.addEventListener('mouseover', (event) => {
                    if (newLine.getAttribute('stroke-width') == 8)
                        if (newLine.value == false)
                            newLine.setAttribute('stroke', 'green');
                        else
                            newLine.setAttribute('stroke', 'red');
                });

                newLine.addEventListener('mouseout', () => {
                    if (newLine.value == false)
                        newLine.setAttribute('stroke', 'white');
                    else
                        newLine.setAttribute('stroke', 'black');
                });

                // Add a line event listener to the new line
                newLine.addEventListener('click', (event) => {
                    //event.stopPropagation();
                    event.stopImmediatePropagation()
                    //alert(newLine.value);
                    if (newLine.value == true)
                        newLine.value = false;
                    else
                        newLine.value = true;

                    //console.log(newLine.value)
                    // Optional: Change the color of the circle when clicked
                    //newCircle.setAttribute('fill', 'blue');

                });

                // Append the new line to the SVG layer
                svgLayer.appendChild(newLine);

            }
            //else
            //console.log("PreExisting!!")
        }
    }

}

function editOff() {
    const lines = svgLayer.querySelectorAll('line');

    lines.forEach(line => {
        if (line.value == false)
            svgLayer.removeChild(line);
        else
            line.setAttribute('stroke-width', 2);
    });

}

function redirectToText(nodeNo) {   

    console.log(nodeDetails[nodeNo-1].name)

    // Encode the text to be URL-safe
    const encodedText = encodeURIComponent(nodeDetails[nodeNo-1].name);

    // Redirect to /display/encodedText
    window.location.href = `/display/${encodedText}`;
}

// Fetch node from the backend when the page loads
fetch('http://localhost:3000/display/data')
    .then(response => response.json()) // Parse JSON from the response
    .then(data => {
        //const scoreList = document.getElementById('scoreList');
        console.log("receiving...")
        console.log(data)

        // Loop through the data and display each item in a list
        data.forEach((node, index) => {
            const dummyEvent = { clientX: node.X, clientY: node.X }; // Example coordinates
            drawCircle(dummyEvent);
            const nodeInfo = { nodeid: nodeCounter, name: node.name }
            nodeDetails[index] = nodeInfo;
            //listItem.textContent = `Name: ${node.name}, Score: ${node.score}`; // Customize according to your data structure
            //scoreList.appendChild(listItem);
            console.log(node.name)
        });
    })
    .catch(error => console.error('Hello, Error fetching data:', error));

//look into https://tympanus.net/codrops/2023/10/10/progressively-enhanced-webgl-lens-refraction/



