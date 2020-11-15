describe("home", () => {
  it("renders correctly", () => {
    cy.visit("/");
    cy.get("svg").should("exist");
  });
});
