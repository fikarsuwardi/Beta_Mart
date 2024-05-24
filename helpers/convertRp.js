function convertRp(salary) {
    return `Rp. ${salary.toLocaleString('id-ID')},00`
}

module.exports = convertRp