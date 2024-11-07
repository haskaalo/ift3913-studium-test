import { test as setup, expect } from '@playwright/test';
import path from 'path';
import secrets from "../secrets.json";

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
    await page.goto('https://studium.umontreal.ca/');
    await page.getByRole('link', { name: 'Connexion' }).click();

    await page.waitForURL('https://studium.umontreal.ca/my.policy');

    await page.locator('input#username').fill(secrets['username']);
    await page.locator('input#password').fill(secrets['password']);

    await page.getByRole('button', { name: 'Se connecter' }).click();

    await page.waitForURL('https://studium.umontreal.ca/my/');

    await page.context().storageState({ path: authFile });
});