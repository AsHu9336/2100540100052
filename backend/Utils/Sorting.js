exports.sortResults = (items, sortBy, order) => {
    return items.sort((a, b) => {
        if (order === 'asc') {
            return a[sortBy] > b[sortBy] ? 1 : -1;
        } else {
            return a[sortBy] < b[sortBy] ? 1 : -1;
        }
    });
};