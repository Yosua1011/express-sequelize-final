module.exports = function checkCodeItem(codeitem) {
    var pattern = /(HP|SW|LP)\d+/
    var kode = codeitem;
    if(kode.match(pattern)) {
        return kode
    }
    else{
        return false
    }
}
