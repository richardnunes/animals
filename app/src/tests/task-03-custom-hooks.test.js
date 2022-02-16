import axios from "axios";
import { waitFor,  } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import useFetchNext from "../hooks/useFetchNext";

describe("given useFetchNext hook", () => {
  let axiosGetMock;
  let consoleMock;
  const mockData = {
    data: { test: "test" },
  };

  beforeEach(() => {
    axiosGetMock = jest.spyOn(axios, "get").mockResolvedValue(mockData);
    consoleMock = jest.spyOn(console, "error").mockResolvedValue(jest.fn());
  });

  it("should fetch data from provided URL", async () => {
    const url = "https://test-api.com/animals";
    const { result } = renderHook(() => useFetchNext(url));

    expect(axiosGetMock).toHaveBeenCalledTimes(1);
    expect(axiosGetMock).toHaveBeenCalledWith(url);
    await waitFor(() => expect(result.current.response).toEqual(mockData.data));
    expect(result.current.isError).toBe(false);
  });

  describe("when the fetchNext function is called", () => {
    it("should re-fetch data from provided URL", async () => {
      const url = "https://test-api.com/animals";
      const { result } = renderHook(() => useFetchNext(url));
      result.current.fetchNext();
      expect(axiosGetMock).toHaveBeenCalledTimes(2);
      expect(axiosGetMock).toHaveBeenCalledWith(url);
      await waitFor(() =>
        expect(result.current.response).toEqual(mockData.data)
      );
      expect(result.current.isError).toBe(false);
    });
  });

  describe("when the API returns an error", () => {
    beforeEach(() => {
      axiosGetMock = jest
        .spyOn(axios, "get")
        .mockRejectedValue(new Error("An API error occurred"));
    });

    it("should handle error properly", async () => {
      const url = "https://test-api.com/animals";
      const { result } = renderHook(() => useFetchNext(url));

      expect(axiosGetMock).toHaveBeenCalledTimes(1);
      expect(axiosGetMock).toHaveBeenCalledWith(url);
      await waitFor(() => expect(result.current.isError).toBe(true));
      expect(consoleMock).toHaveBeenCalledTimes(1);
      expect(consoleMock).toHaveBeenCalledWith(
        new Error("An API error occurred")
      );
    });
  });
});
