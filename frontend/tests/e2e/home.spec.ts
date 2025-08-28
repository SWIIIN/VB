import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display main hero section', async ({ page }) => {
    // Vérifier que la section héro est visible
    await expect(page.locator('section').first()).toBeVisible();
    
    // Vérifier le titre principal
    await expect(page.getByText(/Transportez et expédiez vos/)).toBeVisible();
    await expect(page.getByText(/colis facilement/)).toBeVisible();
    await expect(page.getByText(/au Maroc/)).toBeVisible();
  });

  test('should show call-to-action buttons', async ({ page }) => {
    // Vérifier les boutons d'action
    const publishButton = page.getByRole('link', { name: 'Publier une annonce' });
    const searchButton = page.getByRole('link', { name: 'Trouver un transporteur' });
    
    await expect(publishButton).toBeVisible();
    await expect(searchButton).toBeVisible();
    
    // Vérifier que les liens sont corrects
    await expect(publishButton).toHaveAttribute('href', '/publier-annonce');
    await expect(searchButton).toHaveAttribute('href', '/rechercher');
  });

  test('should display user satisfaction information', async ({ page }) => {
    // Vérifier l'information sur la satisfaction des utilisateurs
    await expect(page.getByText(/Plus de 50,000 utilisateurs satisfaits/)).toBeVisible();
    
    // Vérifier les étoiles
    const stars = page.locator('svg[class*="text-yellow-400"]');
    await expect(stars).toHaveCount(5);
  });

  test('should show package example with cities', async ({ page }) => {
    // Vérifier l'exemple de colis
    await expect(page.getByText('Casablanca')).toBeVisible();
    await expect(page.getByText('Marrakech')).toBeVisible();
    await expect(page.getByText('Départ')).toBeVisible();
    await expect(page.getByText('Arrivée')).toBeVisible();
    
    // Vérifier les détails du colis
    await expect(page.getByText('Prix suggéré')).toBeVisible();
    await expect(page.getByText('150 MAD')).toBeVisible();
    await expect(page.getByText('Date')).toBeVisible();
    await expect(page.getByText('Aujourd\'hui')).toBeVisible();
  });

  test('should display discount badge and status', async ({ page }) => {
    // Vérifier le badge de réduction
    await expect(page.getByText('-60%')).toBeVisible();
    
    // Vérifier le statut de confirmation
    await expect(page.getByText('Transport confirmé')).toBeVisible();
  });

  test('should have responsive design', async ({ page }) => {
    // Test sur desktop
    await page.setViewportSize({ width: 1280, height: 720 });
    await expect(page.locator('nav').first()).toBeVisible();
    
    // Test sur mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.getByRole('button', { name: /menu/i })).toBeVisible();
  });

  test('should navigate to correct pages from CTA buttons', async ({ page }) => {
    // Cliquer sur "Publier une annonce"
    await page.getByRole('link', { name: 'Publier une annonce' }).click();
    await expect(page).toHaveURL(/.*publier-annonce/);
    
    // Retourner à la page d'accueil
    await page.goto('/');
    
    // Cliquer sur "Trouver un transporteur"
    await page.getByRole('link', { name: 'Trouver un transporteur' }).click();
    await expect(page).toHaveURL(/.*rechercher/);
  });

  test('should display all main sections', async ({ page }) => {
    // Vérifier que toutes les sections principales sont présentes
    const sections = [
      'Comment ça marche',
      'Fonctionnalités',
      'Statistiques',
      'Témoignages'
    ];
    
    for (const section of sections) {
      await expect(page.getByText(section, { exact: false })).toBeVisible();
    }
  });

  test('should have proper meta information', async ({ page }) => {
    // Vérifier le titre de la page
    await expect(page).toHaveTitle(/VoyagaBagae/);
    
    // Vérifier la description meta
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /.*transport.*colis.*Maroc.*/);
  });
});

