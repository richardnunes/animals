import { fireEvent, render, screen } from "@testing-library/react";
import SavedList from "../components/SavedList";
import { LikesContext } from "../contexts/Likes";

describe("given the SavedList component is rendered", () => {
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
    removeItem: jest.fn(),
  };

  const renderListComponent = (likes = {}) => {
    likeContext.likes = likes;

    return render(
      <LikesContext.Provider value={likeContext}>
        <SavedList />
      </LikesContext.Provider>
    );
  };

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

    describe("and the remove button is clicked on an item", () => {
      it("then should call the removeItem function", () => {
        renderListComponent(mockLikesWithItems);

        fireEvent.click(screen.getAllByRole("button", { name: "Remove" })[0]);

        expect(likeContext.removeItem).toHaveBeenCalledWith(
          mockLikesWithItems["one"]
        );
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
