import axios from "axios";
import { useState, useEffect } from "react";

const useFetchNext = () => {
  const [isError, setError] = useState(false);
  const [response, setResponse] = useState([]);

  const fetchNext = async () => {
    setError(false);
    try {
      const res = await axios.get(
        "https://zoo-animal-api.herokuapp.com/animals/rand"
      );

      setResponse(res.data);
    } catch (error) {
      setError(true);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNext();
  }, []);

  return { isError, response, fetchNext };
};

export default useFetchNext;
