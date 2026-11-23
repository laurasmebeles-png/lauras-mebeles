import { readFile, readdir, rm } from 'node:fs/promises';

// Remove only obsolete generated entry pages. Preserve other local files/copies.
export async function removeStaleGalleryPages(root, currentIds) {
  const directory = new URL('public/musu-darbi/', root);
  const ids = new Set(currentIds);
  const removed = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (!entry.isDirectory() || !/^[a-z0-9-]+$/.test(entry.name) || ids.has(entry.name)) continue;
    const file = new URL(`${entry.name}/index.html`, directory);
    let html;
    try { html = await readFile(file, 'utf8'); }
    catch (error) { if (error.code === 'ENOENT') continue; throw error; }
    if (!html.includes('class="section gallery-detail-intro"')) continue;
    await rm(file);
    removed.push(entry.name);
  }
  return removed;
}
