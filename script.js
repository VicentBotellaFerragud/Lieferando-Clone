//Global variables:
let basketProducts = [];
let basketPrices = [];
let basketAmounts = [];

let totalAmount = document.getElementById('total-amount');
let totalPurchase = document.getElementById('total-purchase');
let totalPurchaseWithDeliveryCosts = document.getElementById('total-purchase-plus-delivery-costs');

let deliveryCostsRow = document.getElementById('delivery-costs-row');
let deliveryCostsInfo = document.getElementById('delivery-costs-info');
let basketStatusInfo = document.getElementById('basket-status-info');

/**
 * This function can be called when the user clicks on any product on the website or when he/she clicks on the "+" button of any product 
 * that is already in the basket. If it is called because the user has clicked on any product on the website, the function adds that product, 
 * its price and its quantity to the basketProducts, basketPrices and basketAmounts arrays respectively. If, on the contrary, it is 
 * called because the user has clicked on the "+" button of any product that is already in the basket, the function just increases by 1 the 
 * quantity of that product. In both cases the function ends up calling the updatePrice and calculateTotal functions.
 * @param {string} productName - This is the passed-in product name (the product name added to the basketProducts array).
 * @param {number} productPrice - This is the passed-in product price (the product price added to the basketPrices array).
 * @param {number} productAmount - This is the passed-in product amount (the product quantity added to the basketAmounts array).
 */
function addProductToBasket(productName, productPrice, productAmount) {

    let index = basketProducts.indexOf(productName);

    //If the added product (the passed-in product name) is not yet in the basketProducts array...
    if (index == -1) {

        //Its name, price and quantity are added to the three arrays respectively.
        basketProducts.push(productName);
        basketPrices.push(productPrice);
        basketAmounts.push(productAmount);

    //If the added product (the passed-in product name) is already in the basketProducts array...
    } else {

        //Its quantity is increased by 1 (this way it is not necessary to add a new product with the same name).
        basketAmounts[index]++;

    }

    updatePrice(productName);
    calculateTotal();

}

/**
 * This function, called when the user clicks on the "-" button of any product that is already in the basket, reduces the quantity of that 
 * product by 1. It then calls the updatePrice and calculateTotal functions.
 * @param {string} productName - This is the passed-in product name (the product whose quantity is reduced by 1).
 */
function removeProductFromBasketOnce(productName) {

    let index = basketProducts.indexOf(productName);

    //If the product that corresponds to the "-" button that the user has clicked on (the passed-in product name) is no longer in the 
    //basketProducts array...
    if (index == -1) {

        //The function stops, otherwise the quantity of another product would be reduced by 1.
        return;

    //If the product that corresponds to the "-" button that the user has clicked on (the passed-in product name) is in the basketProducts 
    //array...
    } else {

        //And its quantity is greater than 1...
        if (basketAmounts[index] > 1) {

            //Its quantity is reduced by 1.
            basketAmounts[index]--;

        //And its quantity is 0 or 1...
        } else {

            //Its name, price and amount are removed from the basketProducts, basketPrices and basketAmounts arrays respectively.
            basketProducts.splice(index, 1);
            basketPrices.splice(index, 1);
            basketAmounts.splice(index, 1);

        }

    }

    updatePrice(productName);
    calculateTotal();

}

/**
 * This function, called when the user clicks on the "remove" button of any product that is already in the basket, removes the clicked 
 * product, its price and its quantity from the basketProducts, basketPrices and basketAmounts arrays respectively. It then calls the 
 * updatePrice and calculateTotal functions.
 * @param {string} productName - This is the passed-in product name (the product whose name, price and quantity are removed from the 3 
 * arrays respectively).
 */
function removeProductFromBasket(productName) {

    let index = basketProducts.indexOf(productName);

    basketProducts.splice(index, 1);
    basketPrices.splice(index, 1);
    basketAmounts.splice(index, 1);

    updatePrice(productName);
    calculateTotal();

}

/**
 * This function, called whenever the function addProductToBasket, removeProductFromBasketOnce or removeProductFromBasket is called, 
 * calculates the total number of products in the order and the final price of it. To do this, it iterates through the basketAmounts array 
 * (although it could iterate through any of the other two arrays as well, since the length of all three is the same) and adds up all the 
 * quantities and prices entered by the user. It is important to highlight that, when adding up all the prices of the basketPrices array, 
 * the function multiplies each element of this array by its corresponding quantity (that is, by the element with the same index of (in?)
 * the basketAmounts array). Finally, the function calls the checkTotalPrice and the checkBasketStatus functions.
 */
function calculateTotal() {

    let sumOfAmounts = 0;
    let sumOfPrices = 0;

    for (let i = 0; i < basketAmounts.length; i++) {

        const firstElement = basketAmounts[i];
        const secondElement = basketPrices[i];

        sumOfAmounts += firstElement;
        sumOfPrices += firstElement * secondElement;

    }

    totalAmount.innerHTML = sumOfAmounts;
    totalPurchase.innerHTML = sumOfPrices;
    totalPurchaseWithDeliveryCosts.innerHTML = sumOfPrices + 5;

    checkTotalPrice(sumOfPrices);
    checkBasketStatus(sumOfPrices);

}

/**
 * This function, called whenever the calculateTotal function is called, checks if the varibale "sumOfPrices" (belonging to the 
 * calculateTotal function) is equal or greater than 50. Depending on this, the function displays the "deliveryCostsRow" and the 
 * "deliveryCostsInfo" elements or not.
 * @param {number} condition - This is the passed-in condition (in this case, the variable "sumOfPrices").
 */
function checkTotalPrice(condition) {

    //If "sumOfPrices" (the passed-in condition) is less than 50...
    if (condition < 50) {

        //Both the message telling the user that the minimum order to avoid delivery costs must be 50 euros and the "deliveryCostsRow" 
        //element in the total section are displayed in the basket.
        deliveryCostsRow.classList.remove('d-none');
        deliveryCostsInfo.classList.remove('d-none');

    //If "sumOfPrices" (the passed-in condition) is equal or greater than 50...
    } else {

        //Both the message telling the user that the minimum order to avoid delivery costs must be 50 euros and the "deliveryCostsRow"  
        //element in the total section are removed from the basket.
        deliveryCostsRow.classList.add('d-none');
        deliveryCostsInfo.classList.add('d-none');

    }
}

/**
 * This function, called whenever the calculateTotal function is called, checks if there are any products left in the basket.
 * To do this, it checks if the varibale "sumOfPrices" (belonging to the calculateTotal function) is equal to 0. If so, the 
 * "basketStatusInfo" element (which tells the user that the basket is empty) is displayed. If not, the "basketStatusInfo" element is
 * removed.
 * @param {number} condition - This is the passed-in condition (in this case, the variable "sumOfPrices").
 */
function checkBasketStatus(condition) {

    //If "sumOfPrices" (the passed-in condition) equals to 0...
    if (condition == 0) {

        //The message telling the user that his/her basket is empty is displayed.
        basketStatusInfo.classList.remove('d-none');

    //If "sumOfPrices" (the passed-in condition) is more than 0...
    } else {

        //The message telling the user that his/her basket is empty is removed.
        basketStatusInfo.classList.add('d-none');

    }

}

/**
 * This function, called whenever the function addProductToBasket, removeProductFromBasketOnce or removeProductFromBasket is called, 
 * updates in the basket the quantity and price of the passed-in product name.
 * @param {string} productName - This is the passed-in product name (the product whose quantity and price are updated in the basket).
 */
function updatePrice(productName) {

    let index = basketProducts.indexOf(productName);
    let total = document.getElementById('total');
    let productRow = document.getElementById(`${productName}-row`);

    //If the product selected by the user (the passed-in product name) is no longer in the basketProducts array...
    if (index == -1) {

        //And there is no other element in the basketProducts array...
        if (basketProducts.length == 0) {

            //Both the "productRow" element and the total section are removed from the basket.
            productRow.classList.add('d-none');
            total.classList.add('d-none');

        } else {

            //If, on the contrary, the basketProducts array is not completely empty, only the "productRow" element corresponding to the
            //product selected by the user (the passed-in product name) is removed.
            productRow.classList.add('d-none');

        }

    //If the product selected by the user (the passed-in product name) is already in the basketProducts array...
    } else {

        let amount = basketAmounts[index];
        let result = basketPrices[index] * amount;

        let productTotalAmount = document.getElementById(`total-amount-${productName}`);
        let productTotalPrice = document.getElementById(`total-price-${productName}`);

        //Both the quantity and the price of the product are updated in the basket.
        productTotalAmount.innerHTML = amount;
        productTotalPrice.innerHTML = result;

    }

}

/**
 * This function, called when the user clicks on any of the products, shows in the basket both the product on which the user has 
 * clicked and the total of the order.
 * @param {string} productName - This is the passed-in product name (the product that is displayed in the basket).
 */
function showBasket(productName) {

    let row = document.getElementById(`${productName}-row`);
    let total = document.getElementById('total');

    row.classList.remove('d-none');
    total.classList.remove('d-none');

}

/**
 * This function, called when the user clicks on the "checkout" button, alerts the user that his/her order has been successfully completed.
 */
function orderPlaced() {

    alert('Your order has been placed successfully. Click on "ok" to continue ordering.');

}

/**
 * This function, called when the user clicks on the hamburger menu (only displayed on devices whose screen size does not exceed 1000px), 
 * gives and removes the CSS class "d-none" (which causes an element not to be displayed on the website) from the basket.
 */
function displayBasketOnSmartPhones() {

    let basket = document.getElementById('basket');

    basket.classList.toggle('d-none');

}