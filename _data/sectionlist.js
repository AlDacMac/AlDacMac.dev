var util = require('util');
var fs = require('fs');
var fsPromises = require('fs/promises');

const getDisplayName = function(dir){
    const response = JSON.parse(fs.readFileSync(`./sections/${dir.name}/${dir.name}.json`));
    return response["display_name"];
};

const getDirNames = async function() {
    let files = await fsPromises.readdir("./sections/", {withFileTypes: true});
    let dirs = files
	.filter((file) => file.isDirectory())
	.map((dir) => {
	    return {
		name: dir.name,
		display_name: getDisplayName(dir)
	    }
	});
    console.log(dirs);
    return dirs;
};

module.exports = async function() {
    let dirs = await getDirNames();
    return dirs
};
