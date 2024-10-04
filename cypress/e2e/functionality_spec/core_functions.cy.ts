import ChatWithPDFPage from "../../pageobject/chat-with-pdf";

describe("Core Functions", () => {
  it("Upload Files", () => {
    cy.intercept("POST", "/api/feedback").as("feedbackRequest");
    cy.visit("localhost:3000");
    cy.get("#sync-btn").click();
    cy.get("#report").selectFile("cypress/fixtures/report.pdf");
    cy.get("#rubric").selectFile("cypress/fixtures/rubric.pdf");
    cy.get("#generate-btn").click();
    cy.wait("@feedbackRequest").its("response.statusCode").should("eq", 200);
  });

  it("Render Report", () => {
    const chatWithPDFPage = new ChatWithPDFPage();
    chatWithPDFPage.visit();
    chatWithPDFPage.uploadReport();
    chatWithPDFPage.uploadRubric();
    chatWithPDFPage.submitFiles();
    chatWithPDFPage.renderReport();
  });
});
