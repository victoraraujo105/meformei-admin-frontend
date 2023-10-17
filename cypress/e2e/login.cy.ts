/// <reference types="Cypress" />
import loginSel from "../selectors/login.sel";

describe("Login", () => {
    beforeEach(() => {
        cy.intercept("/auth/signin").as("session");
        cy.clearAllCookies()
        cy.visit("/login");
    });

    const username = Cypress.env("auth0_username")
    const password = Cypress.env("auth0_password")
    

    const url = `${Cypress.env("frontendUrl")}/home`

    it("Successful login as admin", () => {
        cy.get(loginSel.usernameField).type(username);
        cy.get(loginSel.passwordField).type(password, { log: false });
        cy.get(loginSel.signInButton).click();
        
        cy.wait("@session");
        cy.url().should("be.equals", url);
    });

    it("Unsuccessful login: wrong data", () => {
        cy.get(loginSel.usernameField).type("user@gmail.com");
        cy.get(loginSel.passwordField).type("12345");
        cy.get(loginSel.signInButton).click();
        cy.wait("@session");
        cy.get("#password-helper-text").should("have.text", "Usuario não reconhecido!");
    });

    it("Unsuccesful login: not all fields filled in", () => {
        cy.get(loginSel.usernameField).type(username);
        cy.get(loginSel.signInButton).click();
        cy.get("#password-helper-text").should("have.text", "Senha é obrigatória.");
        cy.get(loginSel.passwordField).type(password);
        cy.get(loginSel.signInButton).click();
        cy.wait("@session");
        cy.url().should("be.equals", url);
    });
});