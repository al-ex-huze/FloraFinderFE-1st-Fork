export const formatDate = (utcStr) => {
    return new Date(utcStr).toString().split(" ").slice(0, 5).join(" ");
};
