import React from 'react';

function Dashboard() {
    return <>
        <iframe title={"Dashboard"}
                src="https://gisanddata.maps.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6"
                style={{width: '100%', height: '100vh', border: 0}}/>
    </>
}

export default Dashboard;
