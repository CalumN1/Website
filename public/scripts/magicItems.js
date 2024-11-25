console.log("Front end working");

let selectedItem = 0;
let displayItem = 0
let itemArray;



// Fetch items from the backend when the page loads
fetch('http://localhost:3000/magicItems/data')
    .then(response => response.json()) // Parse JSON from the response
    .then(data => {
        itemList = document.getElementById('list');
        console.log("receiving...")
        console.log(data)
        itemArray = data;
        console.log(itemArray)

        // Loop through the data and display each item in a list
        let itemCounter = 0
        data.forEach(item => {
            console.log(item)
            const listItem = document.createElement('li');
            //listItem.number = itemCounter
            listItem.addEventListener('click', (function (itemCounter) {
                return function () {
                    selectedItem = itemCounter;
                    switchItem(`${itemCounter}`);
                };
            })(itemCounter));

            listItem.addEventListener('mouseover', (function (itemCounter) {
                return function () {
                    switchItem(`${itemCounter}`);
                };
            })(itemCounter));

            listItem.addEventListener('mouseout', (event) => {
                switchItem(`${selectedItem}`);
            });

            listItem.textContent = `${item.Name}`; // Customize according to your data structure
            itemList.appendChild(listItem);
            console.log(item.Name)

            itemCounter++
        });

        document.getElementById('name').innerHTML = data[selectedItem].Name
        document.getElementById('description').innerHTML = data[selectedItem].Description
        document.getElementById('image').src = itemArray[selectedItem].Image
    })
    .catch(error => console.error('Hello, Error fetching data:', error));


function switchItem(itemNumber) {
    console.log(itemNumber)
    displayItem = itemNumber;
    document.getElementById('name').innerHTML = itemArray[displayItem].Name
    document.getElementById('description').innerHTML = itemArray[displayItem].Description
    document.getElementById('image').src = itemArray[displayItem].Image

}