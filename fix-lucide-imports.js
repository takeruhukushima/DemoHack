const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const componentsDir = path.join(__dirname, 'components', 'ui');

// Install lucide-react if not already installed
try {
  execSync('npm list lucide-react', { stdio: 'ignore' });
} catch (error) {
  console.log('Installing lucide-react...');
  execSync('npm install lucide-react', { stdio: 'inherit' });
}

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

        // Remove version numbers from lucide-react imports
        const fixedContent = data.replace(
          /from "lucide-react@[\d.]+/g,
          'from "lucide-react"'
        );

        // Only write the file if it was modified
        if (fixedContent !== data) {
          // Write the fixed content back to the file
          fs.writeFile(filePath, fixedContent, 'utf8', err => {
            if (err) {
              console.error(`Error writing file ${file}:`, err);
              return;
            }
            console.log(`Fixed imports in ${file}`);
          });
        }
      });
    }
  });
});
