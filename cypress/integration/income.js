/* global cy */

import { parsePrice } from "../helpers";

describe("Income", function() {
  it("can visit 'New Income' form", function() {
    cy.visit("/");

    //navigate to the page
    cy.get('a.label-abs[href="/income/new/"]').click();

    //check the page is correct
    cy.url().should("include", "/income/new");
    cy.get(".box__content h1").should("contain", "New Income");
  });

  it("can add income", function() {
    const newItem = {
      amount: 150,
      description: "platba za práci",
      subject: "John Doe"
    };

    cy.visit("/incomes/");

    cy.visit("/income/new/");

    //set subject
    const inputSubject = cy.get("input[name=subject]");
    inputSubject.type(newItem.subject);
    inputSubject
      .parent()
      .get(
        //selects one base on whether the subject exists or not
        ".autocomplete--subjects .button[data-testid=new], .autocomplete--subjects .button[data-testid=select]"
      )
      .click();

    //set amount
    cy.get("input[name=amount]")
      .focus()
      .type(newItem.amount);

    //set description
    cy.get("textarea[name=description]").type(newItem.description);

    //submit
    cy.get("button[data-testid=submit]").click();

    cy.visit("/incomes/");
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

  it("can edit income", function() {
    //select first item
    cy.visit("/incomes/");
    cy.get(".payment")
      .first()
      .click();

    //from detail page go to edit
    cy.url().should("include", "/income/");
    cy.get(".button").click();

    //make sure we are on edit page
    cy.url().should("include", "/edit/");
    cy.get(".box__content h1").should("contain", "Edit income");

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

  it("can delete income", function() {
    //select first item
    cy.visit("/incomes/");
    cy.get(".payment")
      .first()
      .click();

    //from detail page go to edit
    cy.url().should("include", "/income/");
    cy.get(".button").click();

    //make sure we are on edit page
    cy.url().should("include", "/edit/");
    cy.get(".box__content h1").should("contain", "Edit income");

    cy.get("button[data-testid=remove]").click();
  });
});
