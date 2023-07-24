
describe("Note app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "Kristian",
      username: "kristian",
      password: "kr15t1@n"
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);
    cy.visit("");
  });

  it("front page can be opened", function () {
    cy.contains("Notes");
    cy.contains("High priority notes");
    cy.contains("Low priority notes");
  });

  it("login fails with wrong password", function () {
    cy.contains("Login").click();
    cy.get("#username").type("kristian");
    cy.get("#password").type("kristian");
    cy.get("#submitLogin").click();

    cy.contains("Wrong credentials");
    cy.get("html").should("not.contain", "Logged in as Kristian");
  });

  it("user can login", function () {
    cy.contains("Login").click();
    cy.get("#username").type("kristian");
    cy.get("#password").type("kr15t1@n");
    cy.get("#submitLogin").click();

    cy.contains("Logged in as Kristian");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.contains("Login").click();
      cy.get("#username").type("kristian");
      cy.get("#password").type("kr15t1@n");
      cy.get("#submitLogin").click();
    });

    it("a new note with low priority can be created", function () {
      cy.contains("Create a note").click();
      cy.get("#newNoteName").type("A low priority note created by Cypress");
      cy.get("#newNoteImportance").select("Low");
      cy.get("#submitNewNote").click();
      cy.contains("A low priority note created by Cypress");
    });

    it("a new note with high priority can be created", function () {
      cy.contains("Create a note").click();
      cy.get("#newNoteName").type("A high priority note created by Cypress");
      cy.get("#newNoteImportance").select("High");
      cy.get("#submitNewNote").click();
      cy.contains("A high priority note created by Cypress");
    });

    describe("there's another user and note", function () {
      beforeEach(function () {
        cy.contains("Create a note").click();
        cy.get("#newNoteName").type("Testing note deletion");
        cy.get("#newNoteImportance").select("High");
        cy.get("#submitNewNote").click();
      });

      it("a note can be deleted", function () {
        cy.contains("Testing note deletion");
        cy.contains("Delete").click();
        cy.get("html").should("not.contain", "Testing note deletion");
      });

      it("only note creator sees delete button", function () {
        const user = {
          name: "Eren",
          username: "eren",
          password: "er€n"
        };
        cy.request("POST", "http://localhost:3001/api/users/", user);
        cy.contains("Logout").click();

        cy.contains("Login").click();
        cy.get("#username").type("eren");
        cy.get("#password").type("er€n");
        cy.get("#submitLogin").click();

        cy.get("html").should("not.contain", "Delete");
      });
    });
  });

});