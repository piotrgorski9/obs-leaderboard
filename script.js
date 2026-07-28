const API_URL =
    "https://script.google.com/macros/s/AKfycbxjERza_-H5D_3AockRci_qpAHGEcnsA3tDwbDCg3Z73uBU75Ru_KS6AlU541koRYvV/exec";
let lastHash = null;



async function checkRanking() {

    try {


        const response = await fetch(
            API_URL + "?t=" + Date.now()
        );


        const data = await response.json();


        console.log(data);



        if (data.hash === lastHash) {

            return;

        }


        lastHash = data.hash;


        renderRanking(data.players);



    }
    catch (error) {

        console.log(
            "Overlay error:",
            error
        );

    }

}





function renderRanking(players) {


    const ranking =
        document.getElementById("ranking");


    const top8 =
        document.getElementById("top8");



    if (!ranking || !top8) {

        console.log(
            "Brak kontenerów tabel"
        );

        return;

    }



    ranking.innerHTML = "";
    top8.innerHTML = "";



    players.forEach(player => {


        let row =
            document.createElement("div");


        row.className = "player";


        row.innerHTML = `

    <div>${player.rank}</div>
    <div class="nick">${player.nick}</div>
    <div>${player.points}</div>
    <div>${player.avg}</div>

`;


        ranking.appendChild(row);


    });





    players.slice(0, 8)
        .forEach((player, index) => {


            let row =
                document.createElement("div");


            row.className = "top-player";


            let medal = "";


            if (index === 0)
                medal = "🥇";

            if (index === 1)
                medal = "🥈";

            if (index === 2)
                medal = "🥉";



            row.innerHTML = `

            <div class="place">
                ${medal || player.rank}
            </div>


            <div class="top-nick">
                ${player.nick}
            </div>


            <div class="top-points">
                ${player.points}
            </div>


        `;



            top8.appendChild(row);


        });


}




checkRanking();


setInterval(
    checkRanking,
    5000
);