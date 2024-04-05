describe('Cart Operations', () => {
  before(() => {
    // Log in to the website using valid credentials before each test
    cy.visit('https://www.saucedemo.com/')  // Update URL if needed
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
  })

  // Existing test cases for adding items to cart and proceeding to checkout

  it('should verify user information on Checkout: Your Information page', () => {
    // Assuming user information is pre-filled on the checkout page after login
    cy.contains('First Name: Your first name').should('be.visible')
    cy.contains('Last Name: Your last name').should('be.visible')  // Verify name
    cy.contains('Postal Code: your postal code').should('be.visible')  // Verify email
  })

  it('should add items to the cart', () => {
    // Use custom command to add items to the cart
    cy.addToCart('item_name_1', 1)  // Add 1 item of 'item_name_1' to cart
    cy.addToCart('item_name_2', 2)  // Add 2 items of 'item_name_2' to cart

    // Verify items are added to the cart
    cy.get('[data-test="shopping-cart-link"]').click()  // Click on cart icon
    cy.contains('Shopping Cart').should('be.visible')  // Verify cart page is loaded
    cy.contains('item_name_1').should('be.visible')  // Verify item 1 in cart
    cy.contains('item_name_2').should('be.visible')  // Verify item 2 in cart
    cy.contains('3').should('be.visible')  // Verify cart icon updates with correct item count
  })

  it('should proceed to checkout and verify items', () => {
    cy.get('[data-test="shopping-cart-link"]').click()  // Click on cart icon
    cy.contains('Proceed to Checkout').click()  // Click on checkout button
    cy.contains('Checkout: Your Information').should('be.visible')  // Verify on checkout page
    cy.contains('item_name_1').should('be.visible')  // Verify item 1 in checkout
    cy.contains('item_name_2').should('be.visible')  // Verify item 2 in checkout
  })

  it('should make the checkout and proceed to Checkout: Overview', () => {
    // Fill in required information on Checkout: Your Information page
    cy.get('[data-test="firstName"]').type('standard_user')
    cy.get('[data-test="lastName"]').type('secret_sauce')
    cy.get('[data-test="postalCode"]').type('31054')
    cy.get('[data-test="continue"]').click()  // Assuming continue button proceeds to Overview page
  
    // Verify navigation to Checkout: Overview page
    cy.contains('Checkout: Overview').should('be.visible')
    // Add assertions for required elements on Overview page
  })

  it('should verify total price with tax on Checkout: Overview page', () => {
    // Assuming total price with tax is displayed on the Checkout: Overview page
    const totalPrice = calculateTotalPrice(); // Implement a function to calculate total price with tax
    cy.contains('Total:').next().should('contain.text', totalPrice)
    // Add assertions for other elements if applicable
  })
  
  function calculateTotalPrice() {
    // Implement logic to calculate total price with tax based on items in cart
    // For example:
    const item1Price = 10;
    const item2Price = 15;
    const taxRate = 0.1;
    const totalPrice = (item1Price + item2Price) * (1 + taxRate);
    return totalPrice.toFixed(2); // Assuming total price is formatted with 2 decimal places
  }

  it('should submit checkout and verify Checkout: Complete! page', () => {
    cy.get('[data-test="finish"]').click()  // Click on finish/submit button
    cy.contains('Checkout: Complete!').should('be.visible')
    cy.contains('Your order has been successfully placed.').should('be.visible')
    // Add assertions for order confirmation message and other elements if applicable
  })

  it('should logout from the website', () => {
    // Assuming logout functionality is available on the main page
    cy.get('[data-test="logout-sidebar-link"]').click()  // Click on logout button
  })

  it('should add items to the cart', () => {
    // Use custom command to add items to the cart
    cy.addToCart('item_name_1', 1)  // Add 1 item of 'item_name_1' to cart
    cy.addToCart('item_name_2', 2)  // Add 2 items of 'item_name_2' to cart
  
    // Verify items are added to the cart
    cy.get('[data-testid="cart-icon"]').click()  // Click on cart icon
    cy.contains('Shopping Cart').should('be.visible')  // Verify cart page is loaded
    cy.contains('item_name_1').should('be.visible')  // Verify item 1 in cart
    cy.contains('item_name_2').should('be.visible')  // Verify item 2 in cart
    cy.contains('3').should('be.visible')  // Verify cart icon updates with correct item count
  })
})