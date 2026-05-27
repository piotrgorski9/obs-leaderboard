const SHEET_URL =
    "https://docs.google.com/spreadsheets/d/1_UzkJYMvmeVGGY8EqZ-JH2WLmgThxmD13cn7Nu3pVa0/gviz/tq?tqx=out:json";

async function loadTable() {

    const response = await fetch(SHEET_URL, {
        cache: "no-store"
    });

    const text = await response.text();

    const json = JSON.parse(
        text.substring(47).slice(0, -2)
    );

    if (!json.table || !json.table.rows) return;

    let players = json.table.rows.map(r => ({
        name: r.c[0]?.v ?? "",
        points: Number(r.c[1]?.v ?? 0)
    }));

    players.sort((a, b) => b.points - a.points);

    const fullBody = document.querySelector("#fullTable tbody");
    const splitBody = document.querySelector("#splitTable tbody");

    const top32 = players.slice(0, 32);

    /* =========================
       PEŁNA TABELA
    ========================= */
    let fullHTML = "";

    players.forEach((p, i) => {
        fullHTML += `
            <tr>
                <td>${i + 1}</td>
                <td>${p.name}</td>
                <td>${p.points}</td>
            </tr>
        `;
    });

    /* =========================
       SPLIT TABELA (1–16 | 17–32)
    ========================= */
    let splitHTML = "";

    for (let i = 0; i < 16; i++) {

        const left = top32[i];
        const right = top32[i + 16];

        splitHTML += `
        <tr>
            <td>${left ? i + 1 : ""}</td>
            <td style="text-align:left;">${left ? left.name : ""}</td>
            <td>${left ? left.points : ""}</td>

            <td>${right ? i + 17 : ""}</td>
            <td style="text-align:left;">${right ? right.name : ""}</td>
            <td>${right ? right.points : ""}</td>
        </tr>
    `;
    }

    fullBody.innerHTML = fullHTML;
    splitBody.innerHTML = splitHTML;
}

loadTable();
setInterval(loadTable, 3000);