export default Object.size = obj => {
    var size = 0;

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};
