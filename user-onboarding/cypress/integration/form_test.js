describe("Testing form inputs", function () {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });
  it("adding text to inputs and submitting the form", () => {
    //test for name
    cy.get("[data-cy=name]")
      .type("Tony Sorensen")
      .should("have.value", "Tony Sorensen");
    cy.get("[data-cy=email]")
      .type("test@email.com")
      .should("have.value", "test@email.com");
    cy.get("[data-cy=password]")
      .type("password")
      .should("have.value", "password");
    //Used this test to make sure the submit button would not activate unless a role was selected.
    // cy.get('[data-cy=role]').select('Please select your role').should('have.value', 'Please select your role');
    cy.get("[data-cy=role]")
      .select("Front-End Developer")
      .should("have.value", "Front-End Developer");
    cy.get("[data-cy=terms]").check().should("be.checked");
    // test for submit button
    cy.get("[data-cy=submit]").click();
  });
});
