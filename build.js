const builder = require('electron-builder');
const fs = require('fs');
const path = require('path');

const Platform = builder.Platform;

async function build() {
  console.log('Building application...');
  
  try {
    const options = {
      config: {
        appId: 'com.webapp.bar',
        productName: 'WebApp Bar',
        directories: {
          output: 'dist',
          buildResources: 'build'
        },
        files: [
          '**/*',
          '!**/node_modules/*/{CHANGELOG.md,README.md,README,readme.md,readme}',
          '!**/node_modules/*/{test,__tests__,tests,powered-test,example,examples}',
          '!**/node_modules/*.d.ts',
          '!**/*.map',
          '!build.js',
          '!*.log'
        ]
      }
    };
    
    // Build for current platform
    await builder.build({
      targets: Platform.current().createTarget(),
      config: options.config
    });
    
    console.log('Build completed successfully!');
    console.log('Output files are in the "dist" folder.');
    
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

build();
