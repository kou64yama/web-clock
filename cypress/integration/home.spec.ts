describe('home', () => {
  it('should render correctly', () => {
    cy.clock(0);
    cy.visit('/');
  });
});
