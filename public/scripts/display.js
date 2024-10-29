console.log("Front end working");


// Counter to keep track of how many buttons have been created
let buttonCount = 0;

let mode = 'nodes'

const svgLayer = document.getElementById('svgLayer');

// Function to add a circle to the SVG at the click position
function drawCircle(event) {
    const rect = svgLayer.getBoundingClientRect();
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
        newCircle.setAttribute('fill', 'green');
    });

    newCircle.addEventListener('mouseout', (event) => {
        newCircle.setAttribute('fill', 'blue');
    });

    // Add a click event listener to the new circle
    newCircle.addEventListener('click', (event) => {
        event.stopPropagation();
        //alert('You clicked a circle!');
        // Optional: Change the color of the circle when clicked
        //newCircle.setAttribute('fill', 'blue');

    });

    // Append the new circle to the SVG layer
    svgLayer.appendChild(newCircle);
}

// Add an event listener to the SVG layer to draw a circle on click
//svgLayer.addEventListener('click', drawCircle);

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
        coordinates[counter] = parseInt(node.cx.baseVal.value); //to fix/check  parse Int
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

function Wobble() {
    // Select all buttons within the clickArea
    const buttons = clickArea.querySelectorAll('button');

    // Loop through each button and adjust its left position
    buttons.forEach(button => {
        // Get the current left position (remove 'px' and convert to a number)
        const currentLeft = parseInt(button.style.left, 10);
        // Set the new left position by adding the offset
        //button.style.left = `${currentLeft + offset}px`;
    });

    //look into https://tympanus.net/codrops/2023/10/10/progressively-enhanced-webgl-lens-refraction/
}


