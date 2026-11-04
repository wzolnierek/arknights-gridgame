import { operatorsArr } from "./data.js";
import { countAnswers } from "./matcher.js";

function getUniqueItems(property) {
    const itemsArr = [...new Set(operatorsArr.flatMap((op) => op[property]))];
    return itemsArr.filter((item) => item !== null);
}

const categoriesToGen = [
    "profession",
    "subProfessionId",
    "position",
    "tagList",
    "modules",
    "debuffs",
    "nationId",
    "groupId",
    "teamId",
    "gender",
    "race",
    "infection_status",
    "placeOfBirth",
];
const fieldTypesTable = { groupId: "faction", teamId: "faction" };
const labelTable = { RANGED: "Ranged", MELEE: "Melee" };
const MIN_ANSWERS = 6;

function generateCategories() {
    const categoriesJson = [];
    const smallCat = [];

    categoriesToGen.forEach((cat) => {
        const comp = Array.isArray(operatorsArr[0][cat]) ? "includes" : "eq";

        const type = fieldTypesTable[cat] ?? cat;
        getUniqueItems(cat).forEach((subcat) => {
            const id = `${type}:${subcat}`;
            const label = labelTable[subcat] ?? subcat;

            const category = {
                id,
                type: [type],
                match: "all",
                conditions: [
                    {
                        field: cat,
                        comparison: comp,
                        value: subcat,
                    },
                ],
                label,
            };
            const count = countAnswers(operatorsArr, category);
            category.count = count;
            if (count >= MIN_ANSWERS) {
                categoriesJson.push(category);
            } else {
                smallCat.push(category);
            }
        });
    });
    return { categoriesJson, smallCat };
}
// console.log(JSON.stringify(generateCategories().categoriesJson));
console.log(JSON.stringify(generateCategories().smallCat));
