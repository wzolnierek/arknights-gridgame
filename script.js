const operatorsArr = await fetch("operators.json").then((res) => res.json());
const autoCategoriesArr = await fetch("generated-categories.json").then((res) =>
    res.json(),
);
const handCategoriesArr = await fetch("handwritten-categories.json").then(
    (res) => res.json(),
);

// for testing
// const operator = operatorsArr.find((op) => op.id === "char_609_acguad");
// const category = categoriesArr.find((con) => con.id === "profession:guard");

function checkOneCondition(operator, condition) {
    return (
        compareCondition(operator[condition.field], condition) ||
        compareCondition(operator.altValues[condition.field], condition)
    );
}

function compareCondition(operatorValue, condition) {
    const conValue = condition.value;
    if (operatorValue == null) return false;
    switch (condition.comparison) {
        case "eq":
            return operatorValue === conValue;
        case "gte":
            return operatorValue >= conValue;
        case "gt":
            return operatorValue > conValue;
        case "lte":
            return operatorValue <= conValue;
        case "lt":
            return operatorValue < conValue;
        case "includes":
            return operatorValue.includes(conValue);
        default:
            console.error(condition.comparison, "is not a valid value");
            return false;
    }
}

function checkWholeCategory(operator, category) {
    if (category.match === "all") {
        return category.conditions.every((con) =>
            checkOneCondition(operator, con),
        );
    } else if (category.match === "any") {
        return category.conditions.some((con) =>
            checkOneCondition(operator, con),
        );
    } else {
        console.error("Something went wrong with:", category.id);
        return false;
    }
}

function countAnswers(operatorList, category) {
    return operatorList.filter((op) => checkWholeCategory(op, category)).length;
}

// GENERATOR
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
            if (count >= MIN_ANSWERS) {
                categoriesJson.push(category);
            } else {
                smallCat.push(category);
            }
        });
    });
    return { categoriesJson, smallCat };
}
