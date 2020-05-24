import React from 'react';

function GenericTab({url}: { url: string }) {
    return <>
        <iframe title={"GenericTab"} src={url} style={{width: '100%', height: '100vh', border: 0}}/>
    </>
}

export default GenericTab;
