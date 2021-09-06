describe('home', () => {
  it('should render the current time correctly', () => {
    cy.clock(0);
    cy.visit('/');
    for (let i = 0; i < 12; i++) cy.tick(318666);
  });

  it('should render the elapsed time correctly', () => {
    cy.clock(0);
    cy.visit('/');
    cy.get('svg > g').click();
    for (let i = 0; i < 12; i++) cy.tick(5214);
    cy.get('svg > g').click();
  });
});
