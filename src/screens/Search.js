import { Box, CircularProgress } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";

import SearchInput from "../components/SearchInput/SearchInput";
import ResultsList from "../components/ResultsList/ResultsList";

import { searchCpv, getCpv } from "../services/cpvService";
import { getCached, getAllCache, storeCache, removeCache } from "../services/cacheService";

const Search = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [selected, seSelected] = useState(null);
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

  const handleGetter = async (node) => {
    seSelected(node);
    setLoading(true);
    setSearchResults([]);
    await getCpv(node.code).then(({ data }) => {
      setLoading(false);
      setCpvs(data);
      setError(data?.error);
    });
  };

  const handleSearchClick = async () => {
    if (searchKey.length <= 2) return;

    setLoading(true);
    setSearchResults([]);
    await getCpv(searchKey).then(({ data }) => {
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
    seSelected(null);
    handleSearch(searchKey);
  }, [searchKey]);

  return (
    <>
      <SearchInput
        searchKey={searchKey}
        setSearchKey={setSearchKey}
        searchItems={searchResults}
        handleSearchClick={handleSearchClick}
        errorMessage={error}
        getItem={handleGetter}
        caches={caches}
        handleCachedItem={handleCachedItem}
      />
      <ResultsList
        data={cpvs}
        handleCachedItem={handleCachedItem}
        caches={caches}
        searchKey={searchKey}
        selected={selected}
      />
      {loading && (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 20 }}>
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

export default Search;
