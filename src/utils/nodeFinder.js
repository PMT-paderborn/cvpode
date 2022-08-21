import { keyExists } from "./highliter";

let collections = [];

const iterate = (search, node) => {
  if (node.hasChildren) {
    for (const key in node.children) {
      console.log(node.children[key] instanceof Array);
      const result = iterate(search, node.children[key]);

      if (result !== undefined) {
        collections.push(node.code);
      }
      if (collections.includes(node.code) && node?.parent_id) {
        collections.push(node.parent_id);
      }
    }
  }
  // check is current node code same as code then return it else decrement index by one
  if (keyExists(search, node.code) || keyExists(search, node.description)) return node.code;

  return;
};

const nodeFinder = (key, node) => {
  iterate(key, node);
  return [...new Set(collections)];
};

export default nodeFinder;
