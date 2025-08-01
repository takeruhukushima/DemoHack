const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'components', 'ui');

// Read all files in the components/ui directory
fs.readdir(componentsDir, (err, files) => {
  if (err) {
    console.error('Error reading components directory:', err);
    return;
  }

  // Process each file
  files.forEach(file => {
    if (file.endsWith('.tsx')) {
      const filePath = path.join(componentsDir, file);
      
      // Read the file content
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error(`Error reading file ${file}:`, err);
          return;
        }

        // Remove version numbers from @radix-ui and other imports
        const fixedContent = data.replace(
          /from "(@[\w-]+\/[\w-]+)@[\d.]+/g,
          'from "$1"'
        );

        // Write the fixed content back to the file
        fs.writeFile(filePath, fixedContent, 'utf8', err => {
          if (err) {
            console.error(`Error writing file ${file}:`, err);
            return;
          }
          console.log(`Fixed imports in ${file}`);
        });
      });
    }
  });
});
