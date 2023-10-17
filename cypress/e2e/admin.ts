import adminSel from "../selectors/admin.sel";
import loginSel from "../selectors/login.sel";

describe("Admin", () => {
    before(() => {
        cy.visit("/auth/login");
        const username = Cypress.env("auth0_username")
        const password = Cypress.env("auth0_password")

        
        cy.get(loginSel.usernameField).clear().type(username);
        cy.get(loginSel.passwordField).clear().type(password);
        cy.get(loginSel.signInButton).click();
    });

    const url = `${Cypress.env("frontendUrl")}/home`

    it("Admin: create a new university", () => {
        cy.visit("/universidades");
        cy.get(".MuiButtonBase-root").click();
        cy.get(adminSel.universityName).type("Universidade tal");
        cy.get(adminSel.universityAbv).type("UFT");
        cy.get(adminSel.universityCity).type("Fortaleza");
        cy.get(adminSel.universityState).type("Ceará");

        cy.get("#addUniversity-submit").click();
        cy.wait(3000);
        cy.get(adminSel.firstProductTitle).should("have.text", "MacBook Pro");
    });

    it("Admin: edit a product", () => {
        cy.visit("/dashboard");
        cy.get("#editProductButton").eq(0).click();
        cy.get(adminSel.productNameField).clear().type("Headphones");
        cy.get(adminSel.productDescriptionField).clear().type("This is a pair of headphones");
        cy.get(adminSel.productPriceField).clear().type("100");
        cy.get(adminSel.productQuantityField).clear().type("10");
        cy.get(adminSel.productCategoryField).clear().type("Electronics");
        cy.get(adminSel.productImageField).click();
        cy.get(adminSel.productImageField).click().selectFile("cypress/fixtures/products/headphones.jpeg");
        cy.get("#submitProductForm").click();
        cy.wait(3000);
        cy.get(adminSel.firstProductTitle).should("contain.text", "Headphones");
    });

    it("Admin: delete a product", () => {
        cy.visit("/dashboard");
        cy.get("#deleteProductButton").eq(0).click();
        cy.get(adminSel.firstProductTitle).should("satisfy", ($el) => {
            return $el.text() !== "Headphones";
        });
    });
});