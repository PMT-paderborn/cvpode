import { Box, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";

import SearchInput from "../components/SearchInput/SearchInput";
import ResultsList from "../components/ResultsList/ResultsList";

import { searchCpv, getCpv } from "../services/cpvService";
import { getCached, getAllCache, storeCache, removeCache } from "../services/cacheService";

const Search = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [cpvs, setCpvs] = useState([]);
  const [caches, setCaches] = useState(getAllCache());

  const handleSearch = async () => {
    if (searchKey.length == 0) return;

    setLoading(true);
    setCpvs([]);
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

  const handleCachedItem = (item) => {
    if (!!getCached(item.code)) {
      removeCache(item.code);
      setCaches(getAllCache());
      return false;
    }
    const data = {
      code: item.code,
      description: item.description,
    };
    storeCache(data);
    setCaches(getAllCache());
    return true;
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
        caches={caches}
        handleCachedItem={handleCachedItem}
      />
      <ResultsList data={cpvs} handleCachedItem={handleCachedItem} />
      {loading && (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 20 }}>
          <CircularProgress />
        </Box>
      )}
    </div>
  );
};

export default Search;