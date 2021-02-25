describe("Planets App", () => {
  it("Checking Title", () => {
    cy.visit("/");
    cy.get(".planet").contains("Planets");
  });
  it("Checking Results", () => {
    cy.visit("/");
    cy.get(".planets-table").contains("view");
  });
  it("Checking Sorting all columns", () => {
    cy.visit("/");
    cy.get(".planets-table").contains("view");
    cy.get(".mat-sort-header-content").contains("Name").first().click();
    cy.get(".mat-sort-header-content").contains("Climate").first().click();
    cy.get(".mat-sort-header-content")
      .contains("Orbital Period")
      .first()
      .click();
    cy.get(".mat-sort-header-content").contains("Diameter").first().click();
    cy.get(".mat-sort-header-content").contains("Gravity").first().click();
    cy.get(".mat-sort-header-content").contains("Created").first().click();
    cy.get(".mat-sort-header-content").contains("Population").first().click();
    cy.get(".mat-sort-header-content").contains("Terrain").first().click();
    cy.get(".mat-sort-header-content")
      .contains("Surface Water")
      .first()
      .click();
  });
  it("Checking Search Bar with no results", () => {
    cy.visit("/");
    cy.get(".planets-table").contains("view");
    cy.get("input").type("this planet does not exists");
    cy.get(".planets-table").contains("No data matching the filter applied");
  });
});
