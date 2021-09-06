describe('home', () => {
  it('should render the current time correctly', () => {
    cy.clock(0);
    cy.visit('/');
    for (let i = 0; i < 12; i++) cy.tick(318666);
  });
  });
});
