const fs = require('fs');
const content = fs.readFileSync('apps/web/src/app/api/weton/seed/route.js', 'utf8');
const match = content.match(/const wetonData = (\[[\s\S]*?\]);/);
if (match) {
    fs.mkdirSync('apps/web/src/utils', { recursive: true });
    fs.writeFileSync('apps/web/src/utils/wetonData.js', `export const wetonData = ${match[1]};\n`);
    console.log("Extracted wetonData");
} else {
    console.log("Could not find wetonData");
}
