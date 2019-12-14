/* global cy, Cypress */

import { parsePrice } from "../helpers";

describe("Debt", function() {
  it("can visit 'New Debt' form", function() {
    cy.visit("/");

    //navigate to the page
    cy.get('a.label-abs[href="/debt/new/"]').click();

    //check the page is correct
    cy.url().should("include", "/debt/new");
    cy.get(".box__content h1").should("contain", "New Debt");
  });

  it("can add debt", function() {
    const newItem = {
      amount: 100,
      description: "nákup",
      subject: "Albert"
    };

    cy.visit("/debts/");

    cy.get(".payment"); //waits for .payment to load because the next line with jQuery does not
    const itemsCnt = Cypress.$(".payment");

    cy.visit("/debt/new/");

    //set subject
    const inputSubject = cy.get("input[name=subject]");
    inputSubject.type(newItem.subject);
    inputSubject
      .parent()
      .get(".autocomplete__item-btn .button[data-testid=select]")
      .click();

    //set amount
    cy.get("input[name=amount]")
      .focus()
      .type(newItem.amount);

    //set description
    cy.get("textarea[name=description]").type(newItem.description);

    //submit
    cy.get("button[data-testid=submit]").click();

    //check the new item is added
    cy.visit("/debts/");
    cy.get(".payment")
      .its("length")
      .should("be", itemsCnt + 1);
    //cannot save .payment as variable because find mutates the orignal element
    cy.get(".payment")
      .first()
      .find(".payment__title .heading-small")
      .should("contain", newItem.subject);
    cy.get(".payment")
      .first()
      .find(".payment__content .text-gray")
      .should("contain", newItem.description);
    cy.get(".payment")
      .first()
      .find(".text-price")
      .invoke("text")
      .should(value => {
        expect(parsePrice(value)).to.eq(newItem.amount);
      });
  });

  it("can edit debt", function() {
    //select first item
    cy.visit("/debts/");
    cy.get(".payment")
      .first()
      .click();

    //from detail page go to edit
    cy.url().should("include", "/debt/");
    cy.get(".button").click();

    //make sure we are on edit page
    cy.url().should("include", "/edit/");
    cy.get(".box__content h1").should("contain", "Edit debt");

    cy.get("input[name=amount]")
      .invoke("val")
      .then(val => {
        //edit value
        const newValue = parseInt(val) + 50;
        cy.get("input[name=amount]")
          .focus()
          .type(newValue);
        cy.get("button[data-testid=edit]").click();

        //check the detail updated
        cy.get(".text-price")
          .invoke("text")
          .should(value => {
            expect(parsePrice(value)).to.eq(newValue);
          });
      });
  });
});
