import { afterEach, describe, it, expect, vi } from "vitest";
import { render, screen, cleanup, } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import matchers from "@testing-library/jest-dom/matchers";

// extends Vitest"s expect method with methods from react-testing-library
expect.extend(matchers);

describe("Blog component", () => {
    it("renders title and author without pressing", async () => {
        const blog = {
            author: "Test author",
            title: "Test title",
            url: "test.com",
            likes: 12,
            user: {
                name: "tester user"
            }
        };

        render(<Blog blog={blog} />);
        // screen.debug(container);
        expect(await screen.findByText(`${blog.title} by ${blog.author}`)).toBeInTheDocument();
    });

    it("renders title, author, url and likes after pressing", async () => {
        const blog = {
            author: "Test author",
            title: "Test title",
            url: "test.com",
            likes: 12,
            user: {
                name: "tester user"
            }
        };

        const { container } = await render(<Blog blog={blog} />);
        const showMoreButton = await screen.getByText("Show more");
        await userEvent.click(showMoreButton);
        // screen.debug(container);

        expect(await screen.findByText(`${blog.title} by ${blog.author}`)).toBeInTheDocument();

        expect(await screen.findByText(`Link: ${blog.url}`)).toBeInTheDocument();
        expect(await screen.findByText(`Likes: ${blog.likes}`)).toBeInTheDocument();
        expect(await screen.findByText(`Added by: ${blog.user.name}`)).toBeInTheDocument();
    });

    it("adds two likes to blog via like button", async () => {
        const blog = {
            author: "Test author",
            title: "Test title",
            url: "test.com",
            likes: 12,
            user: {
                name: "tester user"
            }
        };

        const mockHandler = vi.fn();
        const { container } = await render(<Blog blog={blog} likeBlog={mockHandler} />);

        const showMoreButton = await screen.getByText("Show more");
        await userEvent.click(showMoreButton);

        const likeButton = await screen.getByTestId("addLike");
        await userEvent.click(likeButton);
        await userEvent.click(likeButton);

        screen.debug(container);
        expect(await screen.findByText(`Likes: ${blog.likes + 2}`)).toBeInTheDocument();
    });

    it("<BlogForm /> updates parent state and calls onSubmit (addBlog)", async () => {
        const createBlogMock = vi.fn();
        const user = userEvent.setup();

        render(<BlogForm createBlog={createBlogMock} />);

        const titleInput = screen.getByRole("titleInput");
        const authorInput = screen.getByRole("authorInput");
        const urlInput = screen.getByRole("urlInput");
        const sendButton = screen.getByText("Add");

        await user.type(titleInput, "Test title");
        await user.type(authorInput, "Test author");
        await user.type(urlInput, "https://test.com");

        await user.click(sendButton);

        expect(createBlogMock.mock.calls).toHaveLength(1);
        expect(createBlogMock.mock.calls[0][0]).toEqual({
            title: "Test title",
            author: "Test author",
            url: "https://test.com",
        });
    });
});

// runs a cleanup after each test case
afterEach(() => {
    cleanup();
});

