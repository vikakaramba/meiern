context("login", () => {
  beforeEach(() => cy.visit("localhost:4200"));
  it("should load", () => {
    cy.get(".highlight-card > span").should(
      "have.text",
      "client app is running!"
    );
  });
});
