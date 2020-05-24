import store from "store";
import {Onboardings} from "../components/Onboarding";
import _ from "lodash";

export interface StorageState {
    readonly isMigrated: boolean,
    readonly tabMain: number,
    readonly userTabs: UserTab[],
    readonly tabAnalysis: number,
    readonly country: string,
    readonly prediction: number,
    readonly type: string,
    readonly watchedOnboardings: number[],
}

export interface UserTab {
    readonly index: number,
    readonly country: string,
    readonly flag: string,
    readonly url: string,
    readonly timestamp: number
}

const IS_MIGRATED = 'is-mimgrated';
const TAB_MAIN = 'tab-main';
const USER_TABS = 'user-tabs';
const TAB_ANALYSIS = 'tab-analysis';
const COUNTRY = 'country';
const PREDICTION = 'prediction';
const TYPE = 'type';
const WATCHED_ONBOARDINGS = 'watched-onboardings';

export function getStorageState() {
    function getCookie(name: string) {
        let nameEQ = name + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    function rebuildStorageFromCookies() {
        saveStorageState({
            isMigrated: true,
            tabMain: Number(getCookie(TAB_MAIN) || 0),
            userTabs: JSON.parse((decodeURIComponent(getCookie(USER_TABS) || '[]'))) as UserTab[],
            tabAnalysis: Number(getCookie(TAB_ANALYSIS) || 0),
            country: getCookie(COUNTRY) || 'Worldwide',
            prediction: Number(getCookie(PREDICTION) || 1),
            type: getCookie(TYPE) || 'Confirmed',
            watchedOnboardings: []
        } as StorageState)
    }

    if (getCookie(TAB_MAIN) && !store.get(IS_MIGRATED)) {
        rebuildStorageFromCookies()
    }
    return {
        isMigrated: store.get(IS_MIGRATED, false),
        tabMain: store.get(TAB_MAIN, 0),
        userTabs: JSON.parse(store.get(USER_TABS, '[]')) as UserTab[],
        tabAnalysis: store.get(TAB_ANALYSIS, 0),
        country: store.get(COUNTRY, 'Worldwide'),
        prediction: store.get(PREDICTION, 1),
        type: store.get(TYPE, 'Confirmed'),
        watchedOnboardings: store.get(WATCHED_ONBOARDINGS, []),
    } as StorageState;
}

export function saveStorageState(data: StorageState) {
    function reindex(userTabs: UserTab[]) {
        return _.map(userTabs, (v: UserTab, i: number) => ({...v, index: i}))
    }

    store.set(IS_MIGRATED, data.isMigrated);
    store.set(TAB_MAIN, data.tabMain);
    store.set(USER_TABS, JSON.stringify(reindex(data.userTabs)));
    store.set(TAB_ANALYSIS, data.tabAnalysis);
    store.set(COUNTRY, data.country);
    store.set(PREDICTION, data.prediction);
    store.set(TYPE, data.type);
    store.set(WATCHED_ONBOARDINGS, data.watchedOnboardings);
}

export function shouldWatchOboarding(onboarding: Onboardings): boolean {
    const isAlreadyWatched = _.indexOf(getStorageState().watchedOnboardings, onboarding) >= 0;
    if (onboarding === Onboardings.MAIN) {
        return !isAlreadyWatched
    } else if (onboarding === Onboardings.USER_TABS_ACTIONS) {
        return !isAlreadyWatched && !shouldWatchOboarding(Onboardings.MAIN)
    }
    return false
}


