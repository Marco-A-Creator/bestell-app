const menu = document.getElementById("menuSectionDishes");
const basketContent = document.getElementById("basketContent");
const mobileBasketContent = document.getElementById("mobileBasketContent");
const deliveryCosts = 4.99;

let basket = [];

function openApp() {
    renderMenu();
    renderCart();
}

function renderMenu() {
    menu.innerHTML = buildMenuHtml();
}

function buildMenuHtml() {
    let menuHtml = "";
    let categories = getCategories();

    for (let categoryIndex = 0; categoryIndex < categories.length; categoryIndex++) {
        let category = categories[categoryIndex];
        let categoryData = getCategoryData(category);

        menuHtml += getCategoryTemplate(categoryData);
    }
    return menuHtml;
}

function getCategoryData(category) {
    return {
        name: category,
        icon: getCategoryIcon(category),
        formattedName: formatCategory(category),
        dishesHtml: buildDishesHtmlByCategory(category)
    };
}

function buildDishesHtmlByCategory(category) {
    let dishesHtml = "";
    let dishes = getDishesByCategory(category);

    for (let dishIndex = 0; dishIndex < dishes.length; dishIndex++) {
        let dishData = getDishCardData(dishes[dishIndex]);

        dishesHtml += getDishCardTemplate(dishData);
    }
    return dishesHtml;
}

function getDishesByCategory(category) {
    let dishes = [];

    for (let dishIndex = 0; dishIndex < default_dishes.length; dishIndex++) {
        let dish = default_dishes[dishIndex];

        if (dish.category === category) {
            dishes.push(dish);
        }
    }
    return dishes;
}

function getDishCardData(dish) {
    let basketAmount = getBasketAmount(dish.id);

    return {
        id: dish.id,
        image: dish.image,
        dishname: dish.dishname,
        ingredients: dish.ingredients,
        formattedPrice: formatPrice(dish.price),
        buttonText: getDishButtonText(basketAmount),
        buttonClass: getDishButtonClass(basketAmount)
    };
}

function getDishButtonText(basketAmount) {
    if (basketAmount > 0) {
        return `${basketAmount} Hinzugefügt`;
    }
    return "Hinzufügen";
}

function getDishButtonClass(basketAmount) {
    if (basketAmount > 0) {
        return "add_to_cart_button added_to_cart_button";
    }
    return "add_to_cart_button";
}

function renderCart() {
    basketContent.innerHTML = buildBasketHtml(false);
    mobileBasketContent.innerHTML = buildBasketHtml(true);

    renderMobileCartButton();
}

function buildBasketHtml(isMobile) {
    if (basket.length === 0) {
        return getEmptyBasketTemplate();
    }
    let basketData = getBasketTemplateData(isMobile);

    if (isMobile) {
        return getMobileBasketDishesTemplate(basketData);
    }
    return getBasketDishesTemplate(basketData);
}

function getBasketTemplateData(isMobile) {
    return {
        dishesHtml: buildBasketDishesHtml(isMobile),
        calculationHtml: buildBasketCalculationHtml(isMobile)
    };
}

function buildBasketDishesHtml(isMobile) {
    let basketDishesHtml = "";

    for (let basketIndex = 0; basketIndex < basket.length; basketIndex++) {
        let basketDishData = getBasketDishData(basket[basketIndex]);

        if (isMobile) {
            basketDishesHtml += getMobileBasketDishCardTemplate(basketDishData);
        } else {
            basketDishesHtml += getBasketDishCardTemplate(basketDishData);
        }
    }
    return basketDishesHtml;
}

function getBasketDishData(basketDish) {
    let dish = getDishById(basketDish.id);
    let dishTotal = dish.price * basketDish.amount;

    return {
        id: dish.id,
        amount: basketDish.amount,
        dishname: dish.dishname,
        formattedTotal: formatPrice(dishTotal),
        deleteButtonClass: getDeleteButtonClass(basketDish.amount),
        removeButtonHtml: buildRemoveButtonHtml(basketDish)
    };
}

function getDeleteButtonClass(amount) {
    if (amount > 1) {
        return "basket_button";
    }
    return "basket_button hide_element";
}

function buildRemoveButtonHtml(basketDish) {
    let removeButtonData = {
        id: basketDish.id,
        contentHtml: getRemoveButtonContentHtml(basketDish.amount)
    };

    return getBasketRemoveButtonTemplate(removeButtonData);
}

function getRemoveButtonContentHtml(amount) {
    if (amount > 1) {
        return "<p>-</p>";
    }
    return '<img src="./assets/icons/icon_delete_black.webp" alt="Löschen Icon">';
}

function buildBasketCalculationHtml(isMobile) {
    let calculationData = getCalculationData();

    if (isMobile) {
        return getMobileBasketCalculationTemplate(calculationData);
    }
    return getBasketCalculationTemplate(calculationData);
}

function getCalculationData() {
    let subtotal = getSubtotal();
    let total = subtotal + deliveryCosts;

    return {
        subtotal: formatPrice(subtotal),
        deliveryCosts: formatPrice(deliveryCosts),
        total: formatPrice(total)
    };
}

function renderMobileCartButton() {
    const mobileCartImage = document.getElementById("mobileCartImage");
    const mobileCartCounter = document.getElementById("mobileCartCounter");
    let totalAmount = getTotalBasketAmount();

    if (totalAmount > 0) {
        mobileCartImage.src = "./assets/icons/icon_shopping_cart_orange.webp";
        mobileCartCounter.innerHTML = totalAmount;
        mobileCartCounter.classList.remove("hide_element");
    } else {
        mobileCartImage.src = "./assets/icons/icon_shopping_cart_white.webp";
        mobileCartCounter.classList.add("hide_element");
    }
}

function getTotalBasketAmount() {
    let totalAmount = 0;

    for (let basketIndex = 0; basketIndex < basket.length; basketIndex++) {
        totalAmount += basket[basketIndex].amount;
    }
    return totalAmount;
}

function getCategories() {
    let categories = [];

    for (let dishIndex = 0; dishIndex < default_dishes.length; dishIndex++) {
        let category = default_dishes[dishIndex].category;

        if (!categories.includes(category)) {
            categories.push(category);
        }
    }
    return categories;
}

function getCategoryIcon(category) {
    if (category === "Burger & Sandwiches") {
        return "./assets/icons/icon_category_burger.webp";
    } else if (category === "Pizzen (30cm)") {
        return "./assets/icons/icon_category_pizza.webp";
    } else if (category === "Salate") {
        return "./assets/icons/icon_category_salad.webp";
    }
}

function formatCategory(category) {
    if (category === "Burger & Sandwiches") {
        return 'Burger <span>& Sandwiches</span>';
    }
    return category;
}

function getDishById(dishId) {
    for (let dishIndex = 0; dishIndex < default_dishes.length; dishIndex++) {
        let dish = default_dishes[dishIndex];

        if (dish.id === dishId) {
            return dish;
        }
    }
}

function formatPrice(price) {
    return price.toFixed(2).replace(".", ",");
}

function addToBasket(dishId) {
    let basketItem = basket.find(item => item.id === dishId);

    if (basketItem) {
        basketItem.amount++;
    } else {
        basket.push({
            id: dishId,
            amount: 1
        });
    }
    renderMenu();
    renderCart();
}

function removeDishFromBasket(dishId) {
    let basketItem = basket.find(item => item.id === dishId);

    if (basketItem.amount > 1) {
        basketItem.amount--;
    } else {
        let basketItemIndex = basket.indexOf(basketItem);
        basket.splice(basketItemIndex, 1);
    }
    renderMenu();
    renderCart();
}

function deleteDishFromBasket(dishId) {
    let basketItem = basket.find(item => item.id === dishId);
    let basketItemIndex = basket.indexOf(basketItem);

    basket.splice(basketItemIndex, 1);
    renderMenu();
    renderCart();
}

function getBasketAmount(dishId) {
    let basketItem = basket.find(item => item.id === dishId);

    if (basketItem) {
        return basketItem.amount;
    } else {
        return 0;
    }
}

function getSubtotal() {
    let subtotal = 0;

    for (let basketIndex = 0; basketIndex < basket.length; basketIndex++) {
        let basketItem = basket[basketIndex];
        let dish = getDishById(basketItem.id);
        subtotal += dish.price * basketItem.amount;
    }
    return subtotal;
}

function emptyBasket() {
    basket = [];
    renderMenu();
    renderCart();
}

window.onresize = handleResize;

function handleResize() {
    if (window.innerWidth > 1028) {
        closeDialog('mobileBasket');
    }
}