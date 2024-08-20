exports.getPaginatedResults = (items, limit, page) => {
    const start = (page - 1) * limit;
    const end = start + limit;
    return items.slice(start, end);
};