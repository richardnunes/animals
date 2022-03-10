import { fireEvent, render, screen } from "@testing-library/react";
import SavedList from "../components/SavedList";
import { LikesContext } from "../contexts/Likes";

const mockLikesWithItems = {
  one: {
    name: "test-name-1",
    image_link: "test-image-link",
  },
  two: {
    name: "test-name-2",
    image_link: "test-image-link",
  },
};
const likeContext = {
  likes: {},
  likeItem: jest.fn(),
  removeItems: jest.fn(),
};

const renderListComponent = (likes = {}) => {
  likeContext.likes = likes;

  return render(
    <LikesContext.Provider value={likeContext}>
      <SavedList />
    </LikesContext.Provider>
  );
};

describe("given the SavedList component is rendered", () => {
  describe("when multiple liked items exist", () => {
    it("then should contain a heading", () => {
      renderListComponent(mockLikesWithItems);

      expect(
        screen.getByRole("heading", { name: "Animals I Like" })
      ).toBeInTheDocument();
    });

    it("then should contain multiple items with images", () => {
      renderListComponent(mockLikesWithItems);

      expect(
        screen.getByRole("img", { name: "test-name-1" })
      ).toBeInTheDocument();

      expect(
        screen.getByRole("img", { name: "test-name-2" })
      ).toBeInTheDocument();

      expect(screen.getAllByRole("img")).toHaveLength(2);
    });

    it("should contain checkboxes for each item", () => {
      renderListComponent(mockLikesWithItems);

      expect(screen.getAllByRole("checkbox")).toHaveLength(2);
    });

    describe("and none have been checked", () => {
      it("then the remove button should be disabled", () => {
        renderListComponent(mockLikesWithItems);

        expect(screen.getByRole("button", { name: "Remove" })).toBeDisabled();
      });
    });

    describe("and the a checkbox for an item is selected", () => {
      describe("and the remove button is clicked", () => {
        it("then should call the removeItems function", () => {
          renderListComponent(mockLikesWithItems);

          fireEvent.click(
            screen.getAllByRole("checkbox", {
              name: "Select test-name-1 to be removed",
            })[0]
          );

          fireEvent.click(screen.getByRole("button", { name: "Remove" }));

          expect(likeContext.removeItems).toHaveBeenCalledWith(["one"]);
        });
      });
    });
  });

  describe("when no liked items are stored", () => {
    it("then should not contain a heading", () => {
      renderListComponent();

      expect(
        screen.queryByRole("heading", { name: "Animals I Like" })
      ).not.toBeInTheDocument();
    });

    it("then should not contain items", () => {
      renderListComponent();

      expect(screen.queryByRole("img")).not.toBeInTheDocument();
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });
  });
});
