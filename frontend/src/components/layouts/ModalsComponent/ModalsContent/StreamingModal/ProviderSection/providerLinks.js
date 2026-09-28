// Where a click on a streaming service logo goes.
// TMDB only gives one link per country (its own "where to watch" page), not a link per service,
// so for well known services we open a search for the title on the service itself.
// Keys are TMDB provider_id values.

const search = (base) => (title) => base + encodeURIComponent(title);

const PROVIDER_LINKS = {
    // search for the title on the service
    8: search("https://www.netflix.com/search?q="),                         // Netflix
    1796: search("https://www.netflix.com/search?q="),                      // Netflix Standard with Ads
    9: search("https://www.primevideo.com/search?phrase="),                 // Amazon Prime Video
    119: search("https://www.primevideo.com/search?phrase="),               // Amazon Prime Video
    2100: search("https://www.primevideo.com/search?phrase="),              // Amazon Prime Video with Ads
    10: search("https://www.primevideo.com/search?phrase="),                // Amazon Video (rent / buy)
    2: search("https://tv.apple.com/search?term="),                         // Apple TV Store
    350: search("https://tv.apple.com/search?term="),                       // Apple TV+
    3: (title) => `https://play.google.com/store/search?q=${encodeURIComponent(title)}&c=movies`, // Google Play Movies
    192: search("https://www.youtube.com/results?search_query="),           // YouTube
    188: search("https://www.youtube.com/results?search_query="),           // YouTube Premium
    15: search("https://www.hulu.com/search?q="),                           // Hulu
    11: search("https://mubi.com/en/search/films?query="),                  // MUBI
    283: search("https://www.crunchyroll.com/search?q="),                   // Crunchyroll
    73: search("https://tubitv.com/search/"),                               // Tubi TV

    // service home page
    337: () => "https://www.disneyplus.com/",                               // Disney Plus
    1899: () => "https://www.hbomax.com/",                                  // HBO Max
    76: () => "https://viaplay.com/",                                       // Viaplay
    426: () => "https://www.sfanytime.com/",                                // SF Anytime
    35: () => "https://www.rakuten.tv/",                                    // Rakuten TV
    531: () => "https://www.paramountplus.com/",                            // Paramount Plus
    1773: () => "https://www.skyshowtime.com/",                             // SkyShowtime
    386: () => "https://www.peacocktv.com/",                                // Peacock Premium
    538: () => "https://watch.plex.tv/",                                    // Plex
    300: () => "https://pluto.tv/",                                         // Pluto TV
};

// link for a provider logo; unknown services -> TMDB "where to watch" page of the selected country
export const getProviderLink = (providerId, title, fallbackLink) => {
    const buildLink = PROVIDER_LINKS[providerId];
    if (buildLink && title) return buildLink(title);
    return fallbackLink;
};
