


import { test, expect } from '@playwright/test';


test('Playwright test to search and validate playlist title', async ({ page }) => {
  // Go to YouTube
  await page.goto('https://www.google.com');

//Search with keywords
 await page.getByLabel('Search',{exact:true} ).fill('playwright by testers talk');

 await page.getByLabel('Search',{exact:true} ).press('Enter');


//Click on playlist
 await page.getByRole('link', { name:'Playwright by Testers Talk'}).first().click();
 //Validate playlist title
 // const playlistTitle = page.getByRole('heading', { name: 'Playwright by testers talk' });
  await expect(page).toHaveTitle('Playwright by Testers Talk');

});
  