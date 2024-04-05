describe('template spec', () => {
  it('should be accessible and load without errors', () => {
    cy.visit('https://www.saucedemo.com/')
  })
  
  it('should allow login with valid credentials', () => {
    cy.visit('https://www.saucedemo.com/')  // Update URL if needed
    cy.get('[data-test="username"]').type('standard_user') // Using accepted username
    cy.get('[data-test="password"]').type('secret_sauce') // Using common password
    cy.get('[data-test="login-button"]').click()
    cy.addToCart()
  })

  it('should show error message with invalid credentials', () => {
    cy.visit('https://www.saucedemo.com/')  // Update URL if needed
    cy.get('[data-test="username"]').type('133') // Using invalid username
    cy.get('[data-test="password"]').type('4') // Using invalid password
    cy.get('[data-test="login-button"]').click()
    //cy.get('.error-message').should('be.visible')
    // Add assertions for error message visibility
  })
})