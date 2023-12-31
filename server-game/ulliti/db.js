const fetchFunction = async (url, option) => {
    const rs = await fetch(url, {
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(option)
    });
    return rs;
}

module.exports = {fetchFunction}