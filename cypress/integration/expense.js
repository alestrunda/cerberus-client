/* global cy */

import { createPayment, parsePrice } from "../helpers";

describe("Expense", function () {
  it("can visit 'New Expense' form", function () {
    cy.visit("/");

    //navigate to the page
    cy.get('a.label-abs[href="/expense/new/"]').click();

    //check the page is correct
    cy.url().should("include", "/expense/new");
    cy.get(".box__content h1").should("contain", "New Expense");
  });

  it("can add expense", function () {
    //create a new expense
    cy.visit("/expense/new/");
    const newPayment = {
      amount: 12345,
      description: "some stuff",
      subject: "Jane Doe"
    };
    createPayment(newPayment);

    cy.visit("/expenses/");
    //we cannot save .payment as variable because find mutates the orignal element
    cy.get(".payment")
      .first()
      .find(".payment__title .heading-small")
      .should("contain", newPayment.subject);
    cy.get(".payment")
      .first()
      .find(".payment__content .text-gray")
      .should("contain", newPayment.description);
    cy.get(".payment")
      .first()
      .find(".text-price")
      .invoke("text")
      .should((value) => {
        expect(parsePrice(value)).to.eq(newPayment.amount);
      });
  });

  it("can edit expense", function () {
    //create expense
    const expense = {
      amount: 100,
      description: "shopping",
      subject: "Some shop"
    };
    cy.visit("/expense/new/");
    createPayment(expense);

    //go to payment detail page
    cy.visit("/expenses/");
    cy.get(".payment").first().click();

    //from detail page go to edit
    cy.url().should("include", "/expense/");
    cy.get(".button").click();

    //edit the expense
    const editedExpense = {
      description: `Some title`,
      value: 12345
    };
    cy.get("input[name=amount]").type(editedExpense.value);
    cy.get("textarea[name=description]").clear().type(editedExpense.description);
    cy.get("button[data-testid=edit]").click();

    //check the result
    cy.get(".payment-single__description").should("contain", editedExpense.description);
    cy.get(".payment-single__price")
      .invoke("text")
      .should((value) => {
        expect(parsePrice(value)).to.eq(editedExpense.value);
      });
  });

  it("can delete expense", function () {
    //select first item
    cy.visit("/expenses/");
    cy.get(".payment").first().click();

    //from detail page go to edit
    cy.url().should("include", "/expense/");
    cy.get(".button").click();

    //make sure we are on edit page
    cy.url().should("include", "/edit/");
    cy.get(".box__content h1").should("contain", "Edit Expense");

    cy.get("button[data-testid=remove]").click();
    cy.get("button[data-testid=popup-confirm]").click();
  });
});
