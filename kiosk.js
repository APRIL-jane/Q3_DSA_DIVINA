// SELLERS DATA (A.1)
// array of sellers for authentication
// each seller has a username and password.

const sellers = [
    { username: "admin", password: "1234" },
    { username: "seller1", password: "password1" },
];

// PRODUCT DATA (B.1)
// objects representing the available products categories and their items.
const products = {
    Pasta: [
        { name: "Spaghetti", price: 50 },
        { name: "Carbonara", price: 70 },
        { name: "Pesto", price: 80 },
    ],
    Desserts: [
        { name: "Brownie", price: 30 },
        { name: "Ice cream", price: 40 },
        { name: "Cheesecake", price: 60 },
    ],
    Drinks: [
        { name: "Water", price: 10 },
        { name: "Soda", price: 20 },
        { name: "Coffee", price: 30 },
    ],   
};

// CUSTOMER CART (B.5)
// array to store items added to the customer's cart
let cart = [];

// A.1: SELLER AUTHENTICATION
// function to authenticate a seller using username and password.
// @param {string} username - Seller's username.
// @param {string} password - Seller's password.
//@return {boolean} - True if authentication is successful, false otherwise.
function authenticateSeller(username, password) {
    return sellers.some(
        (seller) => seller.username ===  username && seller.password === password
    );
}

// MAIN FUNCTION
// main function to start the kiosk program.
// prompts the user to choose between SELLER and CUSTOMER.
function main() {
    let running = true; // flag to keep the program running
    while (running) {
        const userType = prompt("Are you a SELLER or CUSTOMER? (Type EXIT to quit)"). toUpperCase();

        if (userType === "SELLER") {
            // A.1: Handle seller authentication 
            const username = prompt("Enter Username:");
            const password = prompt("Enter Password:");

            if (authenticateSeller(username, password)) {
                sellerMenu(); // A.2: Open seller menu if authenticated
            } else {
                console.log("Invalid username or password.");
            }
        } else if (userType === "CUSTOMER") {
            customerMenu(); // B.1: open customer menu
        } else if (userType === "EXIT") {
            console.log("Exiting program...");
            running = false; // end the program
        } else {
            console.log("Invalid choice. Please try again.");
        }
    }
}

// A.2: SELLER MENU 
// Displays the seller menu and handles actions: LOGOUT, ADD, REMOVE ITEMS.
function sellerMenu() {
    let sellerRunning = true;
    while (sellerRunning) {
        const action = prompt("LOGOUT, ADD, REMOVE an item?").toUpperCase();

        if (action === "LOGOUT") { // A.7
            console.log("Logging out...");
            sellerRunning = false; // Exit seller menu

        } else if (action === "ADD") { // A.3
            const category = prompt("Enter category (Pasta, Desserts, Drinks):");
            if (products[category]) {
                addItemsToCategory(category); //Handle adding items to the category
            } else {
                console.log("Invalid category.");
            }

        } else if (action === "REMOVE") { // A.5
            const category = prompt("Enter category (Pasta, Desserts, Drinks):");
            if (products[category]) {
                removeItemsFromCategory(category); // Handle removing items from the category 
            } else {
                console.log("Invalid category.");
            }

        } else {
            console.log("Invalid choice. Please try again.");
        }

    } 
}

// A.3, A.4: ADD ITEMS TO CATEGORY
// handles adding items to a specified category.
// @param {String} category - The category to which the item is being added.

function addItemsToCategory(category) {
    let adding = true;
    while (adding) {
        const name = prompt("Enter item name:");
        const price = parseFloat(prompt("Enter price per item:"));

        products[category].push({ name, price });
        console.log( '${name} added to ${category} with price ${price}.');

        adding = prompt("Continue to ADD? (yes/no)").toLowerCase() === "yes"; // A.4
    }
}

// A.5, A.6: REMOVE ITEMS FROM CATEGORY
// handles removing items from a specified category.
// @param {string} category - The category from which the item is being removed
function removeItemsFromCategory(category) {
    let removing = true;
    while (removing) {
        const name = prompt("Enter item name to remove:");
        const index = products[category].findIndex((item) => item.name === name);

        if (index !== -1) {
            products[category].splice(index, 1);
            console.log('${name} removed from ${category}.');
        } else {
            console.log("Item not found>");
        }
        removing = prompt("Continue to REMOVE? (yes/no)").toLowerCase() === "yes"; // A.6
    }
}

//B.1: CUSTOMER MENU
// Displays the customer menu and hadles actions: ORDER, CART, or CANCEL.
function customerMenu() {
    let customerRunning = true;
    while (customerRunning) {
        const action = prompt("ORDER, CART, OR CANCEL?").toUpperCase();
        
        if (action === "ORDER") { // B.3
            handleOrder();

        } else if (action === "CART") { // B.5
            handleCart();
            
        } else if (action === "CART") { // B.7
            console.log("Returning to main menu...");
            customerRunning = false;

        } else {
            console.log("Invalid choice. Please try again.");
        }
    }
}


 
// B.5: Handle costumer cart
// handles action related to the custumer's cart: PRINT, ADD,REMOVE, CANCEL.
function handleCart() {
    let cartRunning = true;
    while (cartRunning) {
        const action = prompt ("PRINT, ADD, REMOVE, OR CANCEL?").toUpperCase();

        if (action === "PRINT") { // B.8
            printCart();
        } else if (action === "ADD") { //Go back to B.2
            return;
        } else if (action === "REMOVE") { // B.6
            removeFromCart();
        } else if (action === "CANCEL") { // B.7
            cartRunning = false;
        } else {
            console.log("Invalid choice. Please try again.");
        }
    }
}

// B.8: PRINT CART CONTENTS
// prints the contents of the cart in a sorted order.

function printCart() {
    //Sort the cart by total price (ascending)
    const sortedCart = [...cart].sort((a,b) => a.total - b.total);

    console.log("Cart Contents:");
    sortedCart.forEach((item, index) => {
        console.log(
            '${index + 1}. ${item.quantity} x ${item.name} @ ${item.price} each = ${item.total}'
        );
    });

    const totalPrice = sortedCart.reduce((sum, item) => sum + item.total, 0);
    console.log('Total Price: ${totalPrice}');
}

//Start the program
main();