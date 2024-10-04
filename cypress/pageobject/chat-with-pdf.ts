class ChatWithPDFPage {
  visit() {
    cy.visit("http://localhost:3000/chat-with-pdf");
  }

  uploadReport() {
    cy.get("#report").selectFile("cypress/fixtures/report.pdf");
  }

  uploadRubric() {
    cy.get("#rubric").selectFile("cypress/fixtures/rubric.pdf");
  }

  submitFiles() {
    cy.get("#upload-files").click();
  }

  renderReport() {
    cy.get("#chat-container").should("be.visible");
  }
}

export default ChatWithPDFPage;
