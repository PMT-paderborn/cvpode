import { Box, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchInput from "../components/SearchInput/SearchInput";

import { searchCpv, getCpv } from "../services/cpvService";

const Search = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [cpvs, setCpvs] = useState([]);

  const handleSearch = async () => {
    if (searchKey.length == 0) return;

    setLoading(true);
    await searchCpv(searchKey).then(({ data }) => {
      setLoading(false);
      setSearchResults(data);
      setError(data?.error);
    });
  };

  const handleGetter = async (id) => {
    setLoading(true);
    setSearchResults([]);
    await getCpv(id).then(({ data }) => {
      setLoading(false);
      setCpvs(data);
      setError(data?.error);
    });
  };

  useEffect(() => {
    handleSearch();
  }, [searchKey]);

  return (
    <div>
      <SearchInput
        searchKey={searchKey}
        setSearchKey={setSearchKey}
        handleSearch={handleSearch}
        searchItems={searchResults}
        errorMessage={error}
        getItem={handleGetter}
      />
      
      {loading && (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 20 }}>
          <CircularProgress />
        </Box>
      )}
    </div>
  );
};

export default Search;
