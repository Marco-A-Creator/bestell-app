function getCategoryTemplate(categoryData) {
    return `
        <div class="menu_categories">
            <div class="banner">
                <div class="banner_background"></div>
                <div class="banner_content">
                    <img src="${categoryData.icon}" alt="${categoryData.name}">
                    <h3>${categoryData.formattedName}</h3>
                </div>
            </div>
            <div class="menu_category">
                <div class="cards_category">
                    ${categoryData.dishesHtml}
                </div>
            </div>
        </div>
    `;
}

function getDishCardTemplate(dishData) {
    return `
        <div class="menu_card">
            <div class="menu_card_image_container">
                <img class="menu_card_image" src="${dishData.image}" alt="${dishData.dishname}">
            </div>
            <div class="menu_card_infos">
                <div class="menu_card_name_ingredients">
                    <h4>${dishData.dishname}</h4>
                    <p>${dishData.ingredients}</p>
                </div>
                <div class="menu_card_price_addbutton">
                    <h4>${dishData.formattedPrice}€</h4>
                    <button onclick="addToBasket('${dishData.id}')" class="${dishData.buttonClass}"> ${dishData.buttonText}</button>
                </div>
            </div>
        </div>
    `;
}

function getEmptyBasketTemplate() {
    return `
        <div class="empty_basket">
            <h5>Warenkorb</h5>
            <div class="empty_basket_text">
                <p>Noch nichts ausgewählt</p>
                <p>Suche dir zuerst etwas leckeres aus!</p>
            </div>
            <img src="./assets/icons/icon_shopping_cart_white_big.webp" alt="Einkaufswagen Icon">
        </div>
    `;
}

function getBasketDishesTemplate(basketData) {
    return `
        <h5>Warenkorb</h5>
        <div class="basket_added_dishes">
            ${basketData.dishesHtml}            
        </div>
        <div class="basket_calculator_section">
            ${basketData.calculationHtml}
        </div>
    `;
}

function getBasketDishCardTemplate(basketDishData) {
    return `
        <div class="basket_dish_card">
            <div class="dish_card_top">
                <h6>${basketDishData.amount}x ${basketDishData.dishname}</h6>
                <button id="deleteButton${basketDishData.id}" onclick="deleteDishFromBasket('${basketDishData.id}')" class="${basketDishData.deleteButtonClass}">
                    <img src="./assets/icons/icon_delete_black.webp" alt="Löschen Icon">
                </button>
            </div>
            <div class="dish_card_bottom">
                <div class="dish_card_bottom_left">
                    ${basketDishData.removeButtonHtml}
                    <h6>${basketDishData.amount}</h6>
                    <button onclick="addToBasket('${basketDishData.id}')" class="basket_button">
                        <p>+</p>
                    </button>
                </div>
                <h6>${basketDishData.formattedTotal}€</h6>
            </div>
        </div>
    `;
}

function getBasketRemoveButtonTemplate(removeButtonData) {
    return `
        <button onclick="removeDishFromBasket('${removeButtonData.id}')" class="basket_button">
            ${removeButtonData.contentHtml}
        </button>
    `;
}

function getBasketCalculationTemplate(calculationData) {
    return `
        <div class="basket_calculator_section">
            <div class="basket_calculator">
                <div class="basket_summary">
                    <div class="basket_summary_content">
                        <p>Summe</p>
                        <p>${calculationData.subtotal}€</p>
                    </div>
                    <div class="basket_summary_content">
                        <p>Lieferkosten</p>
                        <p>${calculationData.deliveryCosts}€</p>
                    </div>
                </div>
                <div class="basket_seperator"></div>
                <div class="basket_total">
                    <p>Gesamt</p>
                    <p>${calculationData.total}€</p>
                </div>
            </div>
            <button onclick="openDialog('orderedDialog')" class="confirm_order_button">
                <h5>Bestellen <span>(${calculationData.total}€)</span></h5>
            </button>
        </div>
    `;
}

function getMobileBasketDishesTemplate(basketData) {
    return `
        <h5>Warenkorb</h5>
        <div class="mobile_basket_added_dishes">
            ${basketData.dishesHtml}
        </div>
        <div class="mobile_basket_calculator_section">
            ${basketData.calculationHtml}
        </div>
    `;
}

function getMobileBasketDishCardTemplate(basketDishData) {
    return `
        <div class="basket_dish_card mobile_basket_dish_card">
            <div class="mobile_dish_card_top">
                <h6>${basketDishData.amount}x ${basketDishData.dishname}</h6>
                <button id="mobileDeleteButton${basketDishData.id}" onclick="deleteDishFromBasket('${basketDishData.id}')" class="${basketDishData.deleteButtonClass}">
                    <img src="./assets/icons/icon_delete_black.webp" alt="Löschen Icon">
                </button>
            </div>
            <div class="mobile_dish_card_bottom">
                <div class="dish_card_bottom_left">
                    ${basketDishData.removeButtonHtml}
                    <h6>${basketDishData.amount}</h6>
                    <button onclick="addToBasket('${basketDishData.id}')" class="basket_button">
                        <p>+</p>
                    </button>
                </div>
                <h6>${basketDishData.formattedTotal}€</h6>
            </div>
        </div>
    `;
}

function getMobileBasketCalculationTemplate(calculationData) {
    return `
        <div class="basket_calculator">
            <div class="basket_summary">
                <div class="basket_summary_content">
                    <p>Summe</p>
                    <p>${calculationData.subtotal}€</p>
                </div>
                <div class="basket_summary_content">
                    <p>Lieferkosten</p>
                    <p>${calculationData.deliveryCosts}€</p>
                </div>
            </div>
            <div class="basket_seperator"></div>
            <div class="basket_total">
                <p>Gesamt</p>
                <p>${calculationData.total}€</p>
            </div>
        </div>
        <button onclick="openDialog('orderedDialog')" class="mobile_confirm_order_button">
            <h5>Bestellen <span>(${calculationData.total}€)</span></h5>
        </button>
    `;
}