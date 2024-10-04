describe("PDF Functionality", () => {
  it("Upload PDF", () => {
    cy.intercept("POST", "/api/feedback").as("feedbackRequest");
    cy.visit("localhost:3000");
    cy.get("#sync-btn").click();
    cy.get("#report").selectFile("cypress/fixtures/report.pdf");
    cy.get("#rubric").selectFile("cypress/fixtures/rubric.pdf");
    cy.get("#generate-btn").click();
    cy.wait("@feedbackRequest").its("response.statusCode").should("eq", 200);
  });
});
