import styles from "./ResultsList.module.css";
import { TreeView, TreeItem } from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import EmptyReult from "./EmptyReult";
import LabelTree from "./LabelTree";

const ResultsList = ({ data, handleCachedItem }) => {
  if (data.length == 0) return <EmptyReult />;

  const renderTree = (node) => {
    return (
      <TreeItem
        className={styles.treeItem}
        key={node.code}
        nodeId={node.code}
        label={<LabelTree item={node} handleCachedItem={handleCachedItem} />}
        sx={{ flexGrow: 1, padding: 1 }}
      >
        {node.hasChildren ? Object.values(node.children).map((child) => renderTree(child)) : null}
      </TreeItem>
    );
  };

  return (
    <div className={styles.root}>
      <TreeView
        sx={{ width: "100%" }}
        aria-label="controlled"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {data && data.map((item) => renderTree(item))}
      </TreeView>
    </div>
  );
};

export default ResultsList;
