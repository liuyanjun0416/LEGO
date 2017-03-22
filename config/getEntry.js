let glob = require('glob');
let path = require('path');
function getEntry(pathDir,releasePath) {
    let files = glob.sync(pathDir),
        entriesObj = {},
        dirname, basename, pathname, extname;
    // console.log(files);
    let pathReg = new RegExp(".+(?="+releasePath+")");
    files.forEach(function (v) {
        dirname = path.dirname(v);
        extname = path.extname(v);
        basename = path.basename(v, extname);
        pathname = path.normalize(path.join(dirname, basename)).replace(pathReg,'');
        entriesObj[pathname] = (function () {
            let array = ['./' + v];
            return array;
        })();
    });
    return entriesObj;
}

module.exports = getEntry;