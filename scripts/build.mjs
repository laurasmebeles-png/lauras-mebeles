import { cp, mkdir, rm } from 'node:fs/promises';
const output = new URL('../dist/', import.meta.url);
await rm(output, { recursive:true, force:true });
await mkdir(output, { recursive: true });
await cp(new URL('../public/', import.meta.url), output, {
  recursive: true,
  // Numbered local copies of old gallery HTML are not site pages.
  filter: source => !/[/\\]index \d+\.html$/i.test(source)
});
console.log('Uzmetuma statiskie faili sagatavoti dist/. Nav paredzēti publiskai palaišanai.');
