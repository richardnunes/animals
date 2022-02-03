import { render, screen } from "@testing-library/react";
import axios from "axios";
import AnimalInfo from "../components/AnimalInfo";

jest.mock("axios");

describe("when the AnimalInfo component is rendered", () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: {
        name: "test-name",
        image_link: "test-image-link",
        latin_name: "test-latin-name",
        animal_type: "test-animal-type",
        active_time: "test-active-time",
        habitat: "test-habitat",
      },
    });
  });

  it("should contain a title", async () => {
    render(<AnimalInfo />);

    expect(
      await screen.findByRole("heading", { name: "test-name" })
    ).toBeInTheDocument();
  });

  it("should contain an image with the expect alt text and source", async () => {
    render(<AnimalInfo />);

    expect(
      await screen.findByRole("img", { name: "test-name" })
    ).toHaveAttribute("src", "test-image-link");
  });

  it("should contain all 4 bullet points with expect text", async () => {
    render(<AnimalInfo />);

    expect(
      await screen.findByText("Latin Name: test-latin-name")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Animal Type: test-animal-type")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Active Time: test-active-time")
    ).toBeInTheDocument();

    expect(screen.getByText("Habitat: test-habitat")).toBeInTheDocument();

    expect(screen.getAllByRole("listitem")).toHaveLength(4);
  });

  it("should contain a the Like and Next buttons", async () => {
    render(<AnimalInfo />);

    expect(
      await screen.findByRole("button", { name: "like" })
    ).toBeInTheDocument();

    expect(
      await screen.findByRole("button", { name: "next" })
    ).toBeInTheDocument();
  });
});
