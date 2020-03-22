import React, {useEffect} from 'react';

function Dashboard() {
    useEffect(() => {
        window.scrollTo(0, document.body.scrollHeight)
        return () => {
            window.scrollTo(0, 0)
        }
    }, [])
    return <>
        <div style={{background: '#000000'}}>
            <iframe title={"Dashboard"}
                    src="https://gisanddata.maps.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6"
                    style={{width: '100%', height: '100vh', border: 0}}/>
        </div>
    </>
}

export default Dashboard;
