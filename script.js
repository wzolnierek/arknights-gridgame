const gridButtons = document.querySelectorAll(".grid .box");
const searchBar = document.getElementById("search-bar");

const operatorsArr = await fetch("operators.json").then((res) => res.json());

function getUniqueItems(property) {
    const itemsArr = [...new Set(operatorsArr.flatMap((op) => op[property]))];
    return itemsArr.filter((item) => item !== null);
}

// {
//     "id": "module:y",
//     "type": "module",
//     "match": "all",
//     "conditions": [
//         {
//             "field": "modules",
//             "comparison": "includes",
//             "value": "Y"
//         }
//     ],
//     "label": "Has a Y Module"
// }

switch (comparison.comparison) {
    case "includes":
}
