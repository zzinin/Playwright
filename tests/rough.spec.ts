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


