import { countAnswers, checkWholeCategory } from "./matcher.js";
import { operatorsArr } from "./data.js";

const gridGame = document.getElementById("grid-game");
const searchOp = document.getElementById("search-op");

const state = {
    activeCell: null,
    guessesLeft: 9,
    usedOperators: new Set(),
    cells: [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ],
    gameOver: false,
};

const rowCategories = [
    {
        id: "profession:Guard",
        type: ["profession"],
        match: "all",
        conditions: [{ field: "profession", comparison: "eq", value: "Guard" }],
        label: "Guard",
        count: 92,
    },
    {
        id: "profession:Sniper",
        type: ["profession"],
        match: "all",
        conditions: [
            { field: "profession", comparison: "eq", value: "Sniper" },
        ],
        label: "Sniper",
        count: 63,
    },
    {
        id: "profession:Caster",
        type: ["profession"],
        match: "all",
        conditions: [
            { field: "profession", comparison: "eq", value: "Caster" },
        ],
        label: "Caster",
        count: 64,
    },
];

const colCategories = [
    {
        id: "nationId:columbia",
        type: ["nationId"],
        match: "all",
        conditions: [
            { field: "nationId", comparison: "eq", value: "columbia" },
        ],
        label: "Columbia",
        count: 49,
    },
    {
        id: "gender:Female",
        type: ["gender"],
        match: "all",
        conditions: [{ field: "gender", comparison: "eq", value: "Female" }],
        label: "Female",
        count: 325,
    },
    {
        id: "modules:Y",
        type: ["modules"],
        match: "all",
        conditions: [{ field: "modules", comparison: "includes", value: "Y" }],
        label: "Has a Y module",
        count: 184,
    },
];

renderGrid();

function renderGrid() {
    const div = document.createElement("div");
    div.classList.add("box");
    gridGame.append(div);
    colCategories.forEach((cat) => {
        const div = document.createElement("div");
        div.classList.add("box");
        div.classList.add("header");
        div.textContent = cat.label;
        gridGame.append(div);
    });

    rowCategories.forEach((rowcat, row) => {
        const div = document.createElement("div");
        div.classList.add("box");
        div.classList.add("header");
        div.textContent = rowcat.label;
        gridGame.append(div);

        colCategories.forEach((colcat, col) => {
            const btn = document.createElement("button");
            btn.classList.add("box");
            btn.classList.add("cell");
            btn.dataset.row = row;
            btn.dataset.col = col;
            btn.addEventListener("click", handleCellClick);
            gridGame.append(btn);
        });
    });
}

function handleCellClick(e) {
    const activeCell = e.currentTarget;
    state.activeCell = {
        row: Number(activeCell.dataset.row),
        col: Number(activeCell.dataset.col),
    };
    document.querySelector(".active")?.classList.remove("active");
    activeCell.classList.add("active");
    searchOp.hidden = false;
    console.log(state.activeCell);
}
searchOp.addEventListener("input");
