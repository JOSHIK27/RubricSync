describe("Sign in button", () => {
  it("Sign in button should redirect to sign in page", () => {
    cy.visit("http://localhost:3000");
    cy.get(".sign-in-btn").click();
    cy.url().should("eq", "http://localhost:3000/sign-in");
  });
});
