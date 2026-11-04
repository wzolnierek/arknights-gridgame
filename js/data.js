export const operatorsArr = await fetch("data/operators.json").then((res) =>
    res.json(),
);
export const autoCategoriesArr = await fetch(
    "data/generated-categories.json",
).then((res) => res.json());
export const handCategoriesArr = await fetch(
    "data/handwritten-categories.json",
).then((res) => res.json());
