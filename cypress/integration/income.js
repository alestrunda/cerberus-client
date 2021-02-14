/* global cy */

import { createPayment, parsePrice } from "../helpers";

describe("Income", function () {
  it("can visit 'New Income' form", function () {
    cy.visit("/");

    //navigate to the page
    cy.get('a.label-abs[href="/income/new/"]').click();

    //check the page is correct
    cy.url().should("include", "/income/new");
    cy.get(".box__content h1").should("contain", "New Income");
  });

  it("can add income", function () {
    //create a new income
    cy.visit("/income/new/");
    const newIncome = {
      amount: 150,
      description: "cool gig",
      subject: "John Smith"
    };
    createPayment(newIncome);

    cy.visit("/incomes/");
    //cannot save .payment as variable because find mutates the orignal element
    cy.get(".payment")
      .first()
      .find(".payment__title .heading-small")
      .should("contain", newIncome.subject);
    cy.get(".payment")
      .first()
      .find(".payment__content .text-gray")
      .should("contain", newIncome.description);
    cy.get(".payment")
      .first()
      .find(".text-price")
      .invoke("text")
      .should((value) => {
        expect(parsePrice(value)).to.eq(newIncome.amount);
      });
  });

  it("can edit income", function () {
    //create income
    const income = {
      amount: 200,
      description: "working out",
      subject: "My Gym"
    };
    cy.visit("/income/new/");
    createPayment(income);

    //go to payment detail page
    cy.visit("/incomes/");
    cy.get(".payment").first().click();

    //from detail page go to edit
    cy.url().should("include", "/income/");
    cy.get(".button").click();

    //make sure we are on edit page
    cy.url().should("include", "/edit/");
    cy.get(".box__content h1").should("contain", "Edit Income");

    //edit the income
    const editedIncome = {
      description: `Edited working out`,
      value: 65
    };
    cy.get("input[name=amount]").type(editedIncome.value);
    cy.get("textarea[name=description]").clear().type(editedIncome.description);
    cy.get("button[data-testid=edit]").click();

    //check the result
    cy.get(".payment-single__description").should("contain", editedIncome.description);
    cy.get(".payment-single__price")
      .invoke("text")
      .should((value) => {
        expect(parsePrice(value)).to.eq(editedIncome.value);
      });
  });

  it("can delete income", function () {
    //select first item
    cy.visit("/incomes/");
    cy.get(".payment").first().click();

    //from detail page go to edit
    cy.url().should("include", "/income/");
    cy.get(".button").click();

    //make sure we are on edit page
    cy.url().should("include", "/edit/");
    cy.get(".box__content h1").should("contain", "Income");

    cy.get("button[data-testid=remove]").click();
    cy.get("button[data-testid=popup-confirm]").click();
  });
});
