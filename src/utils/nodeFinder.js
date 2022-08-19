import { keyExists } from "./highliter";

let index = 0;
let collections = [];

const iterate = (search, node) => {
  // if node hase children increment index by one and go throught it
  if (node.children) {
    for (let key in node.children) {
      collections[index++] = node.code;
      const result = iterate(search, node.children[key]);

      // if result is null decrement index by one and
      // take the current index away from collection
      if (parseInt(key) === node.children.length - 1 && !!result) {
        collections.splice(index--, 1);
      }
    }
  }
  // check is current node code same as code then return it else decrement index by one
  if (keyExists(search, node.code)) return node.code;

  return;
};

const nodeFinder = (key, node) => {
  iterate(key, node);
  return [...new Set(collections)];
};

export default nodeFinder;
