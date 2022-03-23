import { render, screen } from "@testing-library/react";
import InfoTile from "../components/InfoTile";

const infoTileMock = {
  name: "test-name",
  image_link: "test-image-link",
  latin_name: "test-latin-name",
  animal_type: "test-animal-type",
  active_time: "test-active-time",
  habitat: "test-habitat",
};

const renderComponent = () => render(<InfoTile {...infoTileMock} />);

describe("given the InfoTile component is rendered", () => {
  it("then should contain a title", () => {
    renderComponent();

    expect(
      screen.getByRole("heading", { name: "test-name" })
    ).toBeInTheDocument();
  });

  it("then should contain an image with the expect alt text and source", () => {
    renderComponent();

    expect(screen.getByRole("img", { name: "test-name" })).toHaveAttribute(
      "src",
      "test-image-link"
    );
  });

  it("then should contain all 4 bullet points with expect text", () => {
    renderComponent();

    expect(screen.getByText("Latin Name: test-latin-name")).toBeInTheDocument();
    expect(
      screen.getByText("Animal Type: test-animal-type")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Active Time: test-active-time")
    ).toBeInTheDocument();
    expect(screen.getByText("Habitat: test-habitat")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(4);
  });
});
