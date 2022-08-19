import styles from "./ResultsList.module.css";
import { TreeView, TreeItem } from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/Remove";
import ChevronRightIcon from "@mui/icons-material/Add";
import EmptyReult from "./EmptyReult";
import LabelTree from "./LabelTree";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import highlighter from "../../utils/highliter";
import nodeFinder from "../../utils/nodeFinder";

const ResultsList = ({ data, handleCachedItem, caches, searchKey }) => {
  const [expands, setExpands] = useState([]);

  useEffect(() => {
    if (data[0]) setExpands(nodeFinder(searchKey, data[0]));
  }, [data]);

  const renderTree = (node) => {
    return (
      <TreeItem
        className={styles.treeItem}
        key={node.code}
        nodeId={node.code}
        label={<LabelTree item={node} caches={caches} handleCachedItem={handleCachedItem} searchKey={searchKey}/>}
        sx={{ flexGrow: 1, padding: 1 }}
      >
        {node.hasChildren ? Object.values(node.children).map((child) => renderTree(child)) : null}
      </TreeItem>
    );
  };

  const handleToggle = (event, nodeIds) => {
    setExpands(nodeIds);
  };

  if (data.length == 0) return <EmptyReult />;

  return (
    <div className={styles.root}>
      <Typography fontSize={24} color="#9b9b9b">
        Alle Abteilungen
      </Typography>
      <TreeView
        sx={{ width: "100%", border: "1px solid #d5d5d5" }}
        aria-label="controlled"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        onNodeToggle={handleToggle}
        expanded={expands}
      >
        {data && data.map((item) => renderTree(item))}
      </TreeView>
    </div>
  );
};

export default ResultsList;
