//install puppiteer video https://www.youtube.com/watch?v=JA1-eJjrvxw

import puppeteer from "puppeteer";
import { fs } from "fs";

const url1 =
  "https://asgca.org/architects/?filter_country2_3633a=United%20States&filter_continents_3633a=North%20America";
const url2 =
  "https://asgca.org/architects/?page_3633a=2&filter_country2_3633a=United%20States&filter_continents_3633a=North%20America";
const url3 =
  "https://asgca.org/architects/?page_3633a=3&filter_country2_3633a=United%20States&filter_continents_3633a=North%20America";
const url4 =
  "https://asgca.org/architects/?page_3633a=4&filter_states_served_3633a=Florida&filter_country2_3633a=United%20States";
const url5 =
  "https://asgca.org/architects/?page_3633a=5&filter_country2_3633a=United%20States&filter_continents_3633a=North%20America";
const url6 =
  "https://asgca.org/architects/?page_3633a=6&filter_country2_3633a=United%20States&filter_continents_3633a=North%20America";

const url7 =
  "https://asgca.org/architects/?page_3633a=7&filter_country2_3633a=United%20States&filter_continents_3633a=North%20America";
const url8 =
  "https://asgca.org/architects/?page_3633a=8&filter_country2_3633a=United%20States&filter_continents_3633a=North%20America";
const url9 =
  "https://asgca.org/architects/?page_3633a=9&filter_country2_3633a=United%20States&filter_continents_3633a=North%20America";
const url10 =
  "https://asgca.org/architects/?page_3633a=10&filter_country2_3633a=United%20States&filter_continents_3633a=North%20America";
const url11 =
  "https://asgca.org/architects/?page_3633a=11&filter_country2_3633a=United%20States&filter_continents_3633a=North%20America";
const url12 =
  "https://asgca.org/architects/?page_3633a=12&filter_country2_3633a=United%20States&filter_continents_3633a=North%20America";
const url13 =
  "https://asgca.org/architects/?page_3633a=13&filter_country2_3633a=United%20States&filter_continents_3633a=North%20America";

const profileURLsToScrape = [
  url1,
  url2,
  url3,
  url4,
  url5,
  url6,
  url7,
  url8,
  url9,
  url10,
  url11,
  url12,
  url13,
];

const urlsToScrape = [];
const rows = [
  "Profile",
  "Membership Type",
  "Website",
  "Email",
  "Phone Number",
  "Country",
  "Continents Served",
  "State/Province of Residence",
  "Address",
  "Primary States/Provinces Served",
  "Education",
  // "biography",
];
const bios = [];
bios.push(rows);
const browser = await puppeteer.launch();
const page = await browser.newPage();

const pullLinks = async (url) => {
  await page.goto(url);
  await page.waitForSelector(
    "#post-1182 > div > div > div > div > div > div > div > div > div > div.um-members-pagination-box > div.um-members-pagi.uimob340-hide.uimob500-hide > span:nth-child(8) > i"
  );
  const hrefs = await page.$$eval("div.um-member-name a", (as) =>
    as.map((a) => a.href)
  );
  urlsToScrape.push(...hrefs);
  console.log(urlsToScrape);

  // profileURLsToScrape.forEach(async (page_url) => {
  // })

  // await browser.close();
};

const scrapeProfiles = async (urlsToScrape) => {
  for (var url of urlsToScrape) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`${url}`);
    console.log("goto: " + url);
    await page.waitForSelector(
      "#um_field_1177_education2 > div.um-field-label > label"
    );
    const profiles = await page.$$eval(
      "#post-1179 > div > div > div > div > div > div > div > div > div > div > div.um-header > div.um-profile-meta > div.um-main-meta > div.um-name > a",
      (ts) => ts.map((t) => t.innerText)
    );
    const memberType = await page.$$eval("#member_type-1177", (ts) =>
      ts.map((t) => t.innerText)
    );
    const website = await page.$$eval("#website_url-1177 > a", (as) =>
      as.map((a) => a.href)
    );
    const email = await page.$$eval("#user_email-1177 > a", (as) =>
      as.map((a) => a.href)
    );
    const phoneNumber = await page.$$eval("#phone_number-1177 > a", (as) =>
      as.map((a) => a.href)
    );
    const country = await page.$$eval("#country2-1177", (ts) =>
      ts.map((t) => t.innerText)
    );
    const continentsServed = await page.$$eval("#continents-1177", (ts) =>
      ts.map((t) => t.innerText)
    );
    const stateProvinceOfResidence = await page.$$eval(
      "#states_served_29-1177",
      (ts) => ts.map((t) => t.innerText)
    );
    const address = await page.$$eval("#address-1177 > p", (ts) =>
      ts.map((t) => t.innerText)
    ); //watch me
    const primaryStatesOrProvincesServed = await page.$$eval(
      "#states_served-1177",
      (ts) => ts.map((t) => t.innerText)
    ); //watch me
    const education = await page.$$eval("#education2-1177 > p", (ts) =>
      ts.map((t) => t.innerText)
    ); //watch me
    // const biography = await page.$$eval("#bio-1177", (ts) =>
    //   ts.map((t) => t.innerText)
    // );
    await browser.close();

    bios.push([
      profiles,
      memberType,
      website,
      email,
      phoneNumber,
      country,
      continentsServed,
      stateProvinceOfResidence,
      address,
      primaryStatesOrProvincesServed,
      education,
      // biography,
    ]);
  }
  console.log(bios);
  const filename = "data2.csv";
  arrayToCSV(bios, filename);
};

function arrayToCSV(bios, filename) {
  let csvContent = "";
  // Iterate over each element in the array
  bios.forEach((row) => {
    // Convert each element to a CSV row
    csvContent += row.map((element) => `"${element}"`).join(";") + "\n";
  });

  // Save the CSV content to a file
  fs.writeFileSync(filename, csvContent, "utf8");
  console.log("Done!!!!");
}

await pullLinks(url1);
// await pullLinks(url2);
// await pullLinks(url3);
// await pullLinks(url4);
// await pullLinks(url5);
// await pullLinks(url6);
// await pullLinks(url7);
// await pullLinks(url8);
// await pullLinks(url9);
// await pullLinks(url10);
// await pullLinks(url11);
// await pullLinks(url12);
// await pullLinks(url13);
await scrapeProfiles(urlsToScrape);
exit();
