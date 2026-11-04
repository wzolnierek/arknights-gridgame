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

export function countAnswers(operatorList, category) {
    return operatorList.filter((op) => checkWholeCategory(op, category)).length;
}
