import axios from "axios";
import Attribute from "./Attribute.js";
import Product from "./Product.js";
import Label from "./Label.js";
import Category from "./Category.js";

const labelsDict = {};
const attributesDict = {};
const catDict = {};

const getAllProducts = async () => {
  const allProducts = [];
  const response = await axios.get(
    "https://backend-assignment.bylith.com/index.php"
  );
  const data = await response.data;

  attributesDict = createAttributeDict(data);

  data.attributes.forEach((attribute) => {
    const currentAttribute = attribute.title;
    attribute.labels.forEach((label) => {
      labelsDict[label.id] = [currentAttribute, label.title];
    });
  });

  data.products.forEach(({ id, title, categories, price, labels }) => {
    const attributes = {};
    labels.forEach((label) => {
      const [currentAttribute, currentLabel] = labelsDict[label];
      if (currentAttribute in attributes) {
        attributes[currentAttribute].push(currentLabel);
      } else {
        attributes[currentAttribute] = [currentLabel];
      }
    });

    categories.forEach((cat, i) => {
      //main category
      if (i === 0) {
        if (cat.title in catDict) {
        } else {
          const catAttributes = createAttributes(attributes);
          catDict[cat.title] = new Category(cat.title, catAttributes);
        }
      }
    });

    allProducts.push(new Product(id, title, categories, price, attributes));
  });

  return allProducts;
};

const getAllCategories = async () => {
  const allCategories = {};
  const response = await axios.get(
    '"https://backend-assignment.bylith.com/index.php"'
  );
  const data = await response.data;

  const attDict = {};

  listOfProducts.forEach((product) => {
    product.attributes.k;

    product.categories.forEach((category) => {
      const { title } = category;
      if (title in allCategories) {
      }
    });
  });
};

const createAttributeDict = async () => {
  const attDict = {};
  const response = await axios.get(
    "https://backend-assignment.bylith.com/index.php"
  );
  const data = await response.data;
  data.attributes.forEach((att) => {
    const { title } = att;
    const labelsArr = [];

    attDict[title] = {};

    att.labels.forEach((label) => {
      attDict[title][label.id] = new Label(label.title);
    });

    attDict[title]["counter"] = 0;
  });

  return attDict;
};

const createAttributes = async (attDict, attributes) => {
  const res = {};

  for (const [key, value] of Object.entries(attributes)) {
    res[key] = attDict[key];
  }

  return res;
};

const attributeDi = await createAttributeDict();

console.log(attributeDi);

// {
//     "id": 12637,
//     "title": "Suspendisse at ex laoreet, tempus dolor sed, egestas massa",
//     "categories": [
//     {
//     "id": 5878,
//     "title": "Jeans"
//     },
//     {
//     "id": 2266,
//     "title": "Winter sale"
//     },
//     {
//     "id": 8758,
//     "title": "Summer sale"
//     },
//     {
//     "id": 6045,
//     "title": "Today Deals"
//     }
//     ],
//     "price": 902,
//     "labels": [
//     28308,
//     12950,
//     21949
//     ]
