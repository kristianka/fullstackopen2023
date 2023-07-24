import { afterEach, describe, it, expect } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import Note from "./Note";
import matchers from "@testing-library/jest-dom/matchers";

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);


describe("Note component", () => {
    it("renders content", () => {
        const note = {
            content: "Component testing is done with react-testing-library",
            important: true
        };

        render(<Note content={note.content} />);

        const element = screen.getByText("Component testing is done with react-testing-library");
        screen.debug(element);

        expect(element).toBeDefined();
    });
});

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
    cleanup();
});

