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

    // Add a click event listener to the new circle
    newCircle.addEventListener('mouseover', (event) => {
        newCircle.setAttribute('fill', 'green');
    });

    newCircle.addEventListener('mouseout', () => {
        newCircle.setAttribute('fill', 'blue');
    });

    // Add a click event listener to the new circle
    newCircle.addEventListener('click', (event) => {
        event.stopPropagation();
        alert('You clicked a circle!');
        // Optional: Change the color of the circle when clicked
        //newCircle.setAttribute('fill', 'blue');

    });

    // Append the new circle to the SVG layer
    svgLayer.appendChild(newCircle);
}

// Add an event listener to the SVG layer to draw a circle on click
svgLayer.addEventListener('click', drawCircle);

function editRelationships() {
    mode = 'relationships'

    // Select all buttons within the clickArea
    const nodes = svgLayer.querySelectorAll('circle');
    console.log("test")

    let coordinates = {};
    let counter = 0;

    // Loop through each button and log its position
    nodes.forEach(node => {
        coordinates[counter] = parseInt(node.cx, 10);
        counter++
        coordinates[counter] = parseInt(node.cy, 10);
        counter++
    });

    for (counter = 0; counter < buttonCount * 2; counter = counter + 2) {
        for (let counter2 = counter + 2; counter2 < buttonCount * 2; counter2 = counter2 + 2) {
            console.log(counter / 2, counter2 / 2, buttonCount, coordinates[counter2], coordinates[counter2 + 1])
            const newLine = document.createElement('line');
            newLine.setAttribute('x1', coordinates[counter]);
            newLine.setAttribute('y1', coordinates[counter + 1]);
            newLine.setAttribute('x2', coordinates[counter2]);
            newLine.setAttribute('y2', coordinates[counter2 + 1]);
            newLine.setAttribute('stroke', 'black');
            newLine.setAttribute('stroke-width', '2');

        }
    }

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


