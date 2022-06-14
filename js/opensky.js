async function getFlights(type) {
    // Get start date
    let begin = new Date();
    begin.setHours(begin.getHours() - 26);
    begin = Math.floor(begin.getTime() / 1000);

    // Get end date
    let end = new Date();
    end.setHours(end.getHours() - 22);
    end = Math.floor(end.getTime() / 1000);

    const submit = document.getElementById(`${type}DateSubmit`);
    
    // Change search dates
    submit.addEventListener('click', async () => {
        let begin = document.getElementById(`${type}Begin`).value;
        let end = document.getElementById(`${type}End`).value;

        begin = new Date(begin);
        begin = Math.floor(begin.getTime() / 1000);

        end = new Date(end);
        end = Math.floor(end.getTime() / 1000);

        const data = await getDataFromAPI(type, begin, end);

        $(`#${type}`).DataTable().clear().rows.add(data).draw();
    });

    const data = await getDataFromAPI(type, begin, end);

    $(`#${type}`).DataTable( {
        pagination: "bootstrap",
        filter:true,
        data: data,
        destroy: true,
        lengthMenu:[5,10,25],
        pageLength: 10,
        "columns":[  
                    {     "data"     :     "icao24"     },  
                    {     "data"     :     "callsign"   }, 
                    {     "data"     :     "estDepartureAirport"     },   
                    {     "data"     :     "estArrivalAirport"  },
                    {     "data"     :     "firstSeen"  },  
                    {     "data"     :     "lastSeen"  }
            ]
    } );
}

async function getDataFromAPI(type, begin, end) {
    const response = await fetch(`https://opensky-network.org/api/flights/${type}?airport=KLAX&begin=${begin}&end=${end}`);
    let data = await response.json();

    for(let item of data) {
        item.firstSeen = new Date(item.firstSeen * 1000).toUTCString();
        item.lastSeen = new Date(item.lastSeen * 1000).toUTCString();
    }

    return data;
}