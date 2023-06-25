
export const getIndianDate = (date) => {
    let today = new Date(date);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return today.toLocaleString("en-IN", options)
}

export const sortApplications = (applications) => {
    const sorted = applications.sort((a, b) => {
        const d1 = new Date(a.date)
        const d2 = new Date(b.date)
        if (d1 > d2)
            return 1
        else if (d1 < d2)
            return -1

        if (a.slot > b.slot)
            return 1
        else if (a.slot < b.slot)
            return -1

        return 0;
    });
    return sorted
}