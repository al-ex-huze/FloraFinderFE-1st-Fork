export const timeAgo = (utcStr) => {
    const dateNow = new Date().toString();
    // let isDst = false;
    // dateNow.split(" ").includes("Summer") ? (isDst = true) : (isDst = false);
    const timeNow = new Date().getTime();
    // isDst
    //     ? (timeNow = new Date().getTime() + 3600000)
    //     : (timeNow = new Date().getTime());
    const postedTime = new Date(utcStr).getTime();

    const msecsAgo = timeNow - postedTime - 3600000;
    const secsAgo = msecsAgo / 1000;
    const minsAgo = secsAgo / 60;
    const hoursAgo = minsAgo / 60;
    const daysAgo = hoursAgo / 24;
    const weeksAgo = daysAgo / 7;
    const monthsAgo = weeksAgo / 4;
    const yearsAgo = monthsAgo / 12;

    if (monthsAgo > 11) {
        return Math.round(yearsAgo) === 1
            ? `${Math.round(yearsAgo)} year ago`
            : `${Math.round(yearsAgo)} years ago`;
    } else if (weeksAgo > 3) {
        return Math.round(monthsAgo) === 1
            ? `${Math.round(monthsAgo)} month ago`
            : `${Math.round(monthsAgo)} months ago`;
    } else if (daysAgo > 6) {
        return Math.round(weeksAgo) === 1
            ? `${Math.round(weeksAgo)} week ago`
            : `${Math.round(weeksAgo)} weeks ago`;
    } else if (hoursAgo > 23) {
        return Math.round(daysAgo) === 1
            ? `${Math.round(daysAgo)} day ago`
            : `${Math.round(daysAgo)} days ago`;
    } else if (minsAgo > 59) {
        return Math.round(hoursAgo) === 1
            ? `${Math.round(hoursAgo)} hour ago`
            : `${Math.round(hoursAgo)} hours ago`;
    } else if (secsAgo > 59) {
        return Math.round(minsAgo) === 1
            ? `${Math.round(minsAgo)} minute ago`
            : `${Math.round(minsAgo)} minutes ago`;
    } else if (msecsAgo > 1000) {
        return Math.round(secsAgo) === 1
            ? `${Math.round(secsAgo)} second ago`
            : `${Math.round(secsAgo)} seconds ago`;
    }
};
