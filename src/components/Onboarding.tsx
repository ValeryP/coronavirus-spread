import Joyride, {STATUS, Step} from "react-joyride";
import React from "react";
import {getStorageState, saveStorageState} from "../utils/Storage";
import _ from "lodash";

export enum Onboardings {
    MAIN, USER_TABS_ACTIONS
}

export function Onboarding({run, type}: { run: boolean, type: Onboardings }) {
    const STEPS = {
        MAIN: [
            {
                target: 'body',
                content: <p>This website lets you keep all the info about the COVID-19 world
                    situation
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
                content: <p><u>Analysis</u> has <strong>detailed charts</strong> with granularly
                    picked
                    scientific data.</p>,
            },
            {
                target: '.simple-tab-2',
                content: <p><u>Prediction</u> chart shows <strong>how the disease will
                    spread</strong> in each country.</p>,
            },
            {
                target: '.simple-tab-last',
                content: <p>You can <strong>add the URL of the website you frequently
                    check</strong> and
                    it will be saved as an icon in the top bar of this page.</p>,
            },
        ] as Step[],
        USER_TABS_ACTIONS: [
            {
                target: '.simple-tab-3',
                content: <p>Now you can click the right button of the mouse
                    to <strong>edit</strong> or <strong>remove</strong> the tab you previously
                    created.</p>,
            }
        ] as Step[]
    }

    const handleJoyrideCallback = (data: { status: any; }) => {
        const {status} = data;

        if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
            const storageState = getStorageState();
            saveStorageState({
                ...storageState,
                watchedOnboardings: _.uniq([...storageState.watchedOnboardings, type])
            })
        }
    };


    let steps = STEPS.MAIN;
    if (type === Onboardings.USER_TABS_ACTIONS) {
        steps = STEPS.USER_TABS_ACTIONS;
    }
    return <Joyride continuous={true} run={run} showSkipButton={true} steps={steps}
                    locale={{
                        back: 'Back',
                        close: 'Close',
                        last: 'OK',
                        next: 'Next',
                        skip: 'Skip'
                    }}
                    styles={{options: {zIndex: 10000}}} callback={handleJoyrideCallback}/>;
}