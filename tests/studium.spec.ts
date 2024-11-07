import { test, expect } from '@playwright/test';

test.beforeEach(async ({page}) => {
    // Aller à la page Nouvelles de IFT3913
    await page.goto('https://studium.umontreal.ca/mod/forum/view.php?id=5241218');
});

test.describe('Input recherche dans la page Nouvelles', async () => {
    // NOTE: Pas besoin d'authentifier, tout ce qui est dans auth.setup.ts est exécuté en avance

    // Tester lorsque le bouton s'affiche mal
    test("Fonctionnement correcte lorsqu'il n'y a pas de résultat", async ({page}) => {
        const inputRecherche = page.getByPlaceholder('Recherche (forums)');
        await inputRecherche.pressSequentially("Existe_definitivement_pas");
        await inputRecherche.press("Enter");
    
        await expect(page.getByRole('heading', { name: 'Aucun message' })).toBeVisible();
        await expect(page.locator("article")).toHaveCount(0);
    });

    test("Fonctionnement correcte lorsqu'il y a des résultats", async ({page}) => {
        const inputRecherche = page.getByPlaceholder('Recherche (forums)');

        await inputRecherche.pressSequentially("Tâche 3");
        await inputRecherche.press("Enter");
    
        await expect(page.getByRole('heading', { name: 'Aucun message' })).not.toBeVisible();
        await expect(page.locator("article")).not.toHaveCount(0);
    });
});
