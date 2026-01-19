import {test,expect} from '@playwright/test';
import { publicDecrypt } from 'crypto';

test('Test to validate page URL', async ({page})=> {
await page.goto('https://www.login.com');
await page.locator('input[name="username"]').fill("Rahul");
await page.locator('input[name="password"]').fill("Test@123");
await page.getByRole('button',{name:'Login'}).click();
await expect(page).toHaveURL('/.*dashboard/');
})
// POM model
import { Page } from '@playwright/test';


export class LoginPage{
constructor(private page:Page){}

private username = this.page.locator('input[name="username"]');
private password = this.page.locator('input[name="password"]');
private loginButton = this.page.getByRole('button',{name:'Login'});

async login(user:string,pass:string){
  await this.page.goto('https://www.login.com');
  await this.username.fill(user);
  await this.password.fill(pass);
  await this.loginButton.click();


}
}
// Test using POM

import{test, expect} from'@playwright/test';
import { LoginPage } from './tests/rough.spec';

test('login test using POM', async({page})=>{
    await page.goto('https://www.login.com');
    
    const loginPage = new LoginPage(page);
    await loginPage.login('Rahul','Test@123');
    await expect(page).toHaveURL('/.*dashboard/');
});


//BasePage model
import { Page } from '@playwright/test';
export class BasePage{
    constructor(protected page:Page){}  
    async navigateTo(url:string){
        await this.page.goto(url);
    }
    async getTitle(){
        return this.page.title();
    }
} 
//LoginPage extending BasePage
import { BasePage } from './BasePage';
import { Page } from '@playwright/test';  
export class LoginPage extends BasePage{
    private username = this.page.locator('input[name="username"]');
    private password = this.page.locator('input[name="password"]');
    private loginButton = this.page.getByRole('button',{name:'Login'}); 
    constructor(page:Page){
        super(page);
    }   
    async login(user:string,pass:string){
        await this.navigateTo('https://www.login.com');
        await this.username.fill(user);
        await this.password.fill(pass);
        await this.loginButton.click();
    }
}
// Test using BasePage and LoginPage
import { test, expect } from '@playwright/test';
import { LoginPage } from './tests/rough.spec';
test('login test using BasePage and LoginPage', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('Rahul', 'Test@123');
    await expect(page).toHaveURL('/.*dashboard/');
});

// Additional tests for practice
import { test, expect } from '@playwright/test';  
test.describe('Basic Interactions on Playwright Dev Site', () => {
  
  test('should navigate to Playwright site and verify title', async ({ page }) => {
    await page.goto('https://playwright.dev');
    await expect(page).toHaveTitle(/Playwright/);
  }); 
  test('should interact with navigation menu', async ({ page }) => {
    await page.goto('https://playwright.dev');
    await page.click('text=Docs');
    await expect(page).toHaveURL(/.*docs.*/);
  });
  test('should handle search functionality', async ({ page }) => {
    await page.goto('https://playwright.dev');
    const searchButton = page.locator('[aria-label="Search"]').first();     
    if (await searchButton.isVisible()) {
      await searchButton.click();     
      await page.fill('input[type="search"], input[placeholder*="Search"]', 'testing');     
      await page.press('input[type="search"], input[placeholder*="Search"]', 'Enter');     
      await page.waitForLoadState('networkidle');
    } else {
      console.log('Search functionality not found - skipping search test');
    }
  });
});    await firstNameInput.fill('John');
    
    const lastNameInput = page.locator('input[name="lastname"]').first();
    await lastNameInput.fill('Doe');    
    const submitButton = page.locator('input[type="submit"]').first();

    await submitButton.click();
    // Note: Since this is a demo form, there's no actual submission handling.
  });
});   
import { test, expect } from '@playwright/test';

test('Playwright test to search and validate playlist title', async ({ page }) => {
  // Go to YouTube
  await page.goto('https://www.google.com');


  class Animal{
   eat(){
    console.log("Animal is eating");
   }
   sleep(){
    console.log("Animal is sleeping");
   }
   move(){
    console.log("Animal is moving");
   }
   sound(){
    console.log("Animal makes a sound");
   }

  }

  class Dog extends Animal{
    sound(){
        console.log("Dog barks");
    }

  class Lion extends Animal{
        sound(){
            console.log("Lion roars");
        }
        
        power(){
            console.log("Lion has power");
        }
const d=new Dog();
d.eat();  
d.bark();
d.sleep();
d.move();

const l=new Lion();
l.eat();
l.roar();
l.sleep();
l.move();
l.power();
l.
});
