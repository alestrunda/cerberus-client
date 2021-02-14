/* global cy */

import { createPayment, parsePrice } from "../helpers";

describe("Debt", function () {
  it("can visit 'New Debt' form", function () {
    cy.visit("/");

    //navigate to the page
    cy.get('a.label-abs[href="/debt/new/"]').click();

    //check the page is correct
    cy.url().should("include", "/debt/new");
    cy.get(".box__content h1").should("contain", "New Debt");
  });

  it("can add debt", function () {
    //create a new debt
    cy.visit("/debt/new/");
    const newDebt = {
      amount: 100,
      description: "shopping",
      subject: "Some shop"
    };
    createPayment(newDebt);

    cy.visit("/debts/");
    //we cannot save .payment as variable because find mutates the orignal element
    cy.get(".payment")
      .first()
      .find(".payment__title .heading-small")
      .should("contain", newDebt.subject);
    cy.get(".payment")
      .first()
      .find(".payment__content .text-gray")
      .should("contain", newDebt.description);
    cy.get(".payment")
      .first()
      .find(".text-price")
      .invoke("text")
      .should((value) => {
        expect(parsePrice(value)).to.eq(newDebt.amount);
      });
  });

  it("can edit debt", function () {
    //create debt
    const debt = {
      amount: 100,
      description: "shopping",
      subject: "Some shop"
    };
    cy.visit("/debt/new/");
    createPayment(debt);

    //go to payment detail page
    cy.visit("/debts/");
    cy.get(".payment").first().click();

    //from detail page go to edit
    cy.url().should("include", "/debt/");
    cy.get(".button").click();

    //make sure we are on edit page
    cy.url().should("include", "/edit/");
    cy.get(".box__content h1").should("contain", "Edit Debt");

    //edit the debt
    const editedDebt = {
      description: `Edited shopping`,
      value: 50
    };
    cy.get("input[name=amount]").type(editedDebt.value);
    cy.get("textarea[name=description]").clear().type(editedDebt.description);
    cy.get("button[data-testid=edit]").click();

    //check the result
    cy.get(".payment-single__description").should("contain", editedDebt.description);
    cy.get(".payment-single__price")
      .invoke("text")
      .should((value) => {
        expect(parsePrice(value)).to.eq(editedDebt.value);
      });
  });

  it("can delete debt", function () {
    //select first item
    cy.visit("/debts/");
    cy.get(".payment").first().click();

    //from detail page go to edit
    cy.url().should("include", "/debt/");
    cy.get(".button").click();

    //make sure we are on edit page
    cy.url().should("include", "/edit/");
    cy.get(".box__content h1").should("contain", "Edit Debt");

    cy.get("button[data-testid=remove]").click();
    cy.get("button[data-testid=popup-confirm]").click();
  });
});
