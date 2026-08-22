const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('src');
let fixed = 0;
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const oldContent = content;
  content = content.replace(/\.\.\.(prefs\.\w+)/g, '...($1 as any)');
  content = content.replace(/\.\.\.(data\.features)/g, '...($1 as any)');
  content = content.replace(/\.\.\.(data\.general)/g, '...($1 as any)');
  content = content.replace(/\.\.\.(data\.security)/g, '...($1 as any)');
  if (content !== oldContent) {
    fs.writeFileSync(file, content);
    fixed++;
  }
});
console.log('Fixed files:', fixed);
