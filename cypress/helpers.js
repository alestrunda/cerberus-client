/* global cy */

export const parsePrice = (str) => parseFloat(str.replace(/ /g, ""));

export const createPayment = (payment) => {
  //set subject
  if (payment.subject) {
    const inputSubject = cy.get("input[name=subject]");
    inputSubject.type(payment.subject);
    inputSubject
      .parent()
      .get(
        //selects one base on whether the subject exists or not
        ".autocomplete--subjects .button[data-testid=new], .autocomplete--subjects .button[data-testid=select]"
      )
      .click();
  }

  //set amount
  if (payment.amount) {
    cy.get("input[name=amount]").type(payment.amount);
  }

  //set description
  if (payment.description) {
    cy.get("textarea[name=description]").type(payment.description);
  }

  //submit
  cy.get("button[data-testid=submit]").click();
};
