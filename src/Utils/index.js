export const formatApiData=(apiResponse)=>{
    const {customers, transactions} = apiResponse;
    const formattedData = customers.map(customer =>{
        // Filter the transactions for particular user
        const _transactions = transactions.filter(transaction => transaction.customerId === customer.id);
        return _transactions.map(transaction =>({
            id: customer.id,
            name: customer.customerName,
            amt: transaction.amount,
            transDate: transaction.date
        }))
    });
    return formattedData.reduce((acc, curr) => [...acc, ...curr],[]);
}

const calculatePoints = (val) => {
    let points = 0;
    if (val > 100) {
        points = 2 * (val - 100) + 50;
    } else if (val > 50 && val <= 100) {
        points = val - 50;
    }
    else {
        points = 0;
    }
    return points;
}

export const getTableData = (value, selectedMonth) => {
    // Filter based on the selected date
    // Set the start and end range based on the selected month
    const startMonth = parseInt(selectedMonth);
    const endMonth = parseInt(selectedMonth) > 9 ? 11 : (parseInt(selectedMonth) + 2);
    const dateFilterValue = value.filter(data => new Date(data.transDate).getMonth() >= startMonth && new Date(data.transDate).getMonth() <= endMonth)
    const CustPointsVal = dateFilterValue.map(trans => {
        const points = calculatePoints(trans.amt);
        const month = new Date(trans.transDate).getMonth();
        return { ...trans, points, month };
    });
    const cusData = [];
    // This will sort the array and group customers by their id
    const groupCustomers = CustPointsVal.reduce((prev, acc) => {
        if (prev.hasOwnProperty(acc.id)) {
            prev[acc.id] = [...prev[acc.id], acc]
        } else {
            prev[acc.id] = [acc]
        }
        return prev;
    }, {});

    Object.keys(groupCustomers).forEach(customerId => {
        const _filterData = groupCustomers[customerId].reduce((prev, acc) => {
            const month = new Date(acc.transDate).toLocaleString('en-us', { month: 'long' });
            if (prev) {
                prev = { ...acc, month: prev.month?.includes(month) ? prev.month : prev.month ? `${prev.month}, ${month}` : month, numTransactions: prev.numTransactions + 1 || 1, points: prev.points + acc.points || acc.points, CustPoints: prev.points + acc.points || acc.points }
            }
            return prev
        }, {})
        cusData.push(_filterData)
    })

    return {
        CustUpdate: cusData,
        CustPointsVal
    };
}

export const months = Object.freeze({
    0: "january",
    1: "february",
    2: "march",
    3: "april",
    4: "may",
    5: "june",
    6: "july",
    7: "august",
    8: "september",
    9: "october",
    10: "november",
    11: "december",
});