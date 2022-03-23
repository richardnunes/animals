# A possible solution would be:

```js
import axios from "axios";
import {
    fireEvent,
    render,
    screen,
    waitFor,
    within,
} from "@testing-library/react";
import App from "../App";

jest.mock("axios");

const mockData = {
    data: {
        id: "0",
        name: "The animal's name",
        image_link: "//image-url",
        latin_name: "An original latin name",
    },
};

describe("given the App is rendered", () => {
    beforeEach(() => {
        axios.get.mockResolvedValue(mockData);
    });

    const renderComponent = () => render(<App />);

    it("should render the animal's latin name", async () => {
        renderComponent();

        await waitFor(() => {
            expect(
                screen.getAllByRole("listitem", {
                    text: mockData.data.latin_name,
                })[0]
            ).toBeInTheDocument();
        });
    });

    describe("when the Next button is clicked", () => {
        it("should render another animal's latin name", async () => {
            const newMockData = {
                data: {
                    latin_name: "Another original latin name",
                },
            };

            renderComponent();

            axios.get.mockResolvedValue(newMockData);

            fireEvent.click(screen.getAllByRole("button", { name: "next" })[0]);

            await waitFor(() => {
                expect(
                    screen.getAllByRole("listitem", {
                        text: newMockData.data.latin_name,
                    })[0]
                ).toBeInTheDocument();
            });
        });
    });

    describe("when the Like button is clicked", () => {
        it("should render the liked animal's picture in the saved list", async () => {
            renderComponent();

            await waitFor(() => {
                expect(
                    screen.getAllByRole("listitem", {
                        text: mockData.data.latin_name,
                    })[0]
                ).toBeInTheDocument();
            });

            fireEvent.click(screen.getAllByRole("button", { name: "like" })[0]);

            const likedAnimals = screen.getByRole("list", {
                name: "Animals I Like",
            });

            expect(
                within(likedAnimals).getByRole("img", {
                    name: "The animal's name",
                })
            ).toBeInTheDocument();
        });
    });
});
```

#### [5. Best practices](../5.best-practices/README.md)
