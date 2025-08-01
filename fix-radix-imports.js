const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const componentsDir = path.join(__dirname, 'components', 'ui');

// Install missing Radix UI packages
const radixPackages = [
  '@radix-ui/react-context-menu',
  '@radix-ui/react-label',
  '@radix-ui/react-slot',
  '@radix-ui/react-toggle',
  '@radix-ui/react-checkbox',
  '@radix-ui/react-collapsible',
  '@radix-ui/react-menubar',
  '@radix-ui/react-dropdown-menu',
  '@radix-ui/react-toggle-group',
  '@radix-ui/react-dialog',
  '@radix-ui/react-avatar',
  '@radix-ui/react-radio-group',
  '@radix-ui/react-switch',
  '@radix-ui/react-tooltip',
  '@radix-ui/react-accordion',
  '@radix-ui/react-navigation-menu',
  '@radix-ui/react-hover-card',
  '@radix-ui/react-scroll-area',
  '@radix-ui/react-popover',
  '@radix-ui/react-progress',
  '@radix-ui/react-slider',
  '@radix-ui/react-alert-dialog',
  '@radix-ui/react-tabs',
  '@radix-ui/react-aspect-ratio'
];

// Install missing packages
radixPackages.forEach(pkg => {
  try {
    execSync(`npm list ${pkg}`, { stdio: 'ignore' });
  } catch (error) {
    console.log(`Installing ${pkg}...`);
    execSync(`npm install ${pkg}`, { stdio: 'inherit' });
  }
});

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

        // Remove extra quotes and version numbers from Radix UI imports
        const fixedContent = data
          .replace(/from "@radix-ui\/react-[a-z-]+";/g, match => {
            // Remove any trailing quotes and version numbers
            return match.replace(/";$/, '";');
          })
          .replace(/from "@radix-ui\/react-[a-z-]+"";/g, match => {
            // Fix double quotes
            return match.replace(/"";$/, '";');
          });

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
