import * as https from 'https';

const searchWiki = (query: string): Promise<string> => {
  return new Promise((resolve) => {
    https.get(`https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=${encodeURIComponent(query)}&gsrlimit=1&prop=imageinfo&iiprop=url&format=json&origin=*`, {
      headers: { 'User-Agent': 'NodeBot/1.0' }
    }, (res) => {
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
    }).on('error', () => resolve("Error"));
  });
};

async function run() {
  console.log("Rau_mop:", await searchWiki('sauerkraut food'));
  console.log("Bo_to:", await searchWiki('beef dish'));
  console.log("Mangosteen:", await searchWiki('mangosteen fruit'));
  console.log("Banh_trang:", await searchWiki('rice paper food'));
  console.log("Ca_lang:", await searchWiki('fried fish dish'));
  console.log("Dua_xiem:", await searchWiki('fresh coconut drink'));
}

run();
