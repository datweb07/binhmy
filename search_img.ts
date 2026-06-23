import * as https from 'https';

const searchWiki = (query: string) => {
  return new Promise((resolve) => {
    https.get(`https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=${encodeURIComponent(query)}&gsrlimit=1&prop=imageinfo&iiprop=url&format=json`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          const pages = parsed.query.pages;
          const firstPageId = Object.keys(pages)[0];
          resolve(pages[firstPageId].imageinfo[0].url);
        } catch (e) {
          resolve("Not found");
        }
      });
    });
  });
};

async function run() {
  console.log("Rau:", await searchWiki('pickled vegetables'));
  console.log("Beef:", await searchWiki('vietnamese beef'));
  console.log("Mangosteen:", await searchWiki('mangosteen'));
  console.log("Rice paper:", await searchWiki('banh trang'));
  console.log("Catfish:", await searchWiki('catfish dish'));
  console.log("Coconut:", await searchWiki('coconut drink'));
}

run();
