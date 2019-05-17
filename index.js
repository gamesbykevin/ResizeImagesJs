//used to manipulate images
const sharp = require('sharp');

//required in order to read / create files
const fs = require('fs');

//used to identify the dimensions of an image
const sizeOf = require('image-size');

//list of valid file types we are looking for
const fileTypes = ['.jpg', '.jpeg', '.png', '.gif', '.tif', '.svg'];

//we will search for files in the same directory as this file
const folderSrc = '.';

//update files in the specified directory accordingly
async function update(folderDest, ratio) {

	//we only want to analyze folders, so if this is a file we won't continue
	if (await fs.lstatSync(folderSrc).isFile()) {
		console.log('this is a file and not a folder, exiting');
		return;
	}
	
	//get a list of files in the specified folder
	var files = await fs.readdirSync(folderSrc);

	var valid = false;

	//check to see if we have at least 1 valid file
	for (var i = 0; i < files.length; i++) {
		
		if (isValidFile(files[i])) {
			valid = true;
			break;
		}
	}

	//nothing to do if no files were found
	if (!valid) {
		console.log('No valid files were found of type: ' + fileTypes);
		console.log('');
		return;
	}

	//update each (valid) existing file
	for (var i = 0; i < files.length; i++) {
		
		//only update valid files
		if (isValidFile(files[i])) {
			
			//what are the dimensions of the file
			const dimensions = sizeOf(files[i]);
		
			//create destination directory (if it doesn't already exist)
			if (await !fs.existsSync(folderDest))
				await fs.mkdirSync(folderDest);
		
			//resize our file to the specified ratio
			sharp(files[i])
			.resize(null, (dimensions.height * ratio))
			.toFile(folderDest + '/' + files[i], function(err) {
				if (err)
					console.log(err);
			});
		}
	}
}

//look at the file to determine if it is valid
function isValidFile(filename) {
	
	//if not a file, return false
	if (!fs.lstatSync(filename).isFile())
		return false;
	
	//check all file types to verify if it is a valid file
	for (var j = 0; j < fileTypes.length; j++) {
					
		//if we have an extension match, this file is a valid file
		if (filename.toLowerCase().trim().endsWith(fileTypes[j].toLowerCase()))
			return true;
	}
	
	return false;
}

//here is where we start modifying our files
async function start() {

	console.log('creating files 75% of size');
	await update('75_percent_' + Date.now(), .75);
	
	console.log('creating files 50% of size');
	await update('50_percent_' + Date.now(), .5);
	
	console.log('creating files 25% of size');
	await update('25_percent_' + Date.now(), .25);
	
	//we are done
	console.log('done!!!!');
}

//let's begin
start();
