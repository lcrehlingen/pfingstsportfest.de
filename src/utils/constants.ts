import { EDITION_DATE_FROM } from "@/data";

const EVENT_DATE = new Date(EDITION_DATE_FROM + 'T00:00:00.000Z');
const TOTAL_PRIZEMONEY = 78000;
const LIVE_RESULTS = "https://red.laportal.net/Competitions/Details/15155";
const INTERNATIONAL_LIVESTREAM = "https://www.youtube.com/watch?v=nts7TqhqbOM";
const NATIONAL_LIVESTREAM = "https://www.youtube.com/live/9CkmnrTXNPs";
const PHOTOFINISH_LINK = "https://photofinish.lcrehlingen.de/pfingsten2025";

const RESULT_LINKS = [
    {
        "name": "Live-Stream",
        "link": NATIONAL_LIVESTREAM,
        "color": "bg-sky-500"
    },
    /*{
        "name": "Live-Stream (English)",
        "link": INTERNATIONAL_LIVESTREAM,
        "color": "bg-red-500"
    },
    {
        "name": "Photofinish",
        "link": PHOTOFINISH_LINK,
        "color": "bg-green-500"
    }*/
];

export { EVENT_DATE, TOTAL_PRIZEMONEY, LIVE_RESULTS, RESULT_LINKS, INTERNATIONAL_LIVESTREAM, NATIONAL_LIVESTREAM };