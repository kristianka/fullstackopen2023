
describe("Blog app", function () {
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

    it("front page requires to login", function () {
        cy.contains("Log in to application");
        cy.get("#loginUsername");
        cy.get("#loginPassword");
        cy.get("html").should("not.contain", "Logged in as");
    });

    it("login fails with wrong password", function () {
        cy.get("#loginUsername").type("kristian");
        cy.get("#loginPassword").type("kristian");
        cy.contains("login").click();

        cy.contains("Wrong credentials");
        cy.get("html").should("not.contain", "Kristian logged in");
    });

    it("user can login", function () {
        cy.get("#loginUsername").type("kristian");
        cy.get("#loginPassword").type("kr15t1@n");
        cy.contains("login").click();

        cy.contains("Kristian logged in");
    });

    describe("when logged in", function () {
        beforeEach(function () {
            cy.get("#loginUsername").type("kristian");
            cy.get("#loginPassword").type("kr15t1@n");
            cy.contains("login").click();
        });

        it("a new blog can be created", function () {
            cy.contains("Create a blog").click();
            cy.get("#titleInput").type("Test title");
            cy.get("#authorInput").type("Test author");
            cy.get("#urlInput").type("test.com");

            cy.get("#submitNewBlog").click();
            cy.contains("Test title by Test author");
        });

        it("a blog can be liked", function () {
            cy.contains("Create a blog").click();
            cy.get("#titleInput").type("Test title");
            cy.get("#authorInput").type("Test author");
            cy.get("#urlInput").type("test.com");

            cy.get("#submitNewBlog").click();
            cy.contains("Test title by Test author");

            cy.contains("Show more").click();
            cy.contains("Likes: 0");
            cy.contains("Like +1").click();
            cy.contains("Likes: 1");
        });

        describe("there's another user and blog", function () {
            beforeEach(function () {
                cy.contains("Create a blog").click();
                cy.get("#titleInput").type("Test title");
                cy.get("#authorInput").type("Test author");
                cy.get("#urlInput").type("test.com");

                cy.get("#submitNewBlog").click();
            });
            it("a blog can be deleted", function () {
                cy.contains("Test title by Test author");
                cy.contains("Show more").click();
                cy.contains("Delete").click();
                cy.get("html").should("not.contain", "Test title by Test author");
            });

            it("only blog creator sees delete button", function () {
                const user = {
                    name: "Eren",
                    username: "eren",
                    password: "er€n"
                };
                cy.request("POST", "http://localhost:3001/api/users/", user);
                cy.contains("Logout").click();

                cy.get("#loginUsername").type("eren");
                cy.get("#loginPassword").type("er€n");
                cy.contains("login").click();

                cy.contains("Show more").click();
                cy.get("html").should("not.contain", "Delete");
            });
        });

        describe("there are multiple blogs with different amount of likes", function () {
            beforeEach(function () {
                const blogs = [
                    { title: "Test title 1 like", likes: 1 },
                    { title: "Test title 2 likes", likes: 2 },
                    { title: "Test title 3 likes", likes: 3 }
                ];
                // loop through the array and create a blog for each item
                blogs.forEach(blog => {
                    cy.contains("Create a blog").click();
                    cy.get("#titleInput").type(blog.title);
                    cy.get("#authorInput").type("Test author");
                    cy.get("#urlInput").type("test.com");
                    cy.get("#submitNewBlog").click();
                    cy.contains("Show more").click();
                    // click the like button as many times as the blog.likes value
                    for (let i = 0; i < blog.likes; i++) {
                        cy.get(".likeButton").eq(blogs.indexOf(blog)).click();
                    }
                });
                cy.reload();
            });
            it("sorts blogs by likes descending", function () {
                cy.get(".blog").eq(0).should("contain", "Test title 3 likes");
                cy.get(".blog").eq(1).should("contain", "Test title 2 likes");
                cy.get(".blog").eq(2).should("contain", "Test title 1 like");
            });
        });
    });
});