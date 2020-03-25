import Joyride, {Step} from "react-joyride";
import React from "react";

export function Onboarding({run}: { run: boolean }) {
    const steps = [
        {
            target: 'body',
            content: <p>This website lets you keep all the info about the COVID-19 world situation
                in a single place. <strong>Trusted data source. Daily updates.</strong>
            </p>,
            placement: 'center',
        },
        {
            target: '.simple-tab-0',
            content: <p><u>Dashboard</u> has the most reliable <strong>map that contains all
                countries</strong>' data.</p>,
        },
        {
            target: '.simple-tab-1',
            content: <p><u>Analysis</u> has <strong>detailed charts</strong> with granularly picked
                scientific data.</p>,
        },
        {
            target: '.simple-tab-2',
            content: <p><u>Prediction</u> chart shows <strong>how the disease will
                spread</strong> in each country.</p>,
        },
        {
            target: '.simple-tab-last',
            content: <p>You can <strong>add the URL of the website you frequently check</strong> and
                it will be saved as an icon in the top bar of this page.</p>,
        },
    ] as Step[];
    return <Joyride continuous={true} run={run} showSkipButton={true} steps={steps}
                    styles={{options: {zIndex: 10000}}}/>
}