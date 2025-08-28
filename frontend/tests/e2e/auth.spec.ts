import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should open login modal when clicking login button', async ({ page }) => {
    // Cliquer sur le bouton de connexion
    await page.getByRole('button', { name: 'Se connecter' }).click();
    
    // Vérifier que le modal de connexion est ouvert
    await expect(page.getByText('Se connecter')).toBeVisible();
    await expect(page.getByText('Accédez à votre compte VoyagaBagae')).toBeVisible();
  });

  test('should open register modal when clicking register button', async ({ page }) => {
    // Cliquer sur le bouton d'inscription
    await page.getByRole('button', { name: 'S\'inscrire' }).click();
    
    // Vérifier que le modal d'inscription est ouvert
    await expect(page.getByText('S\'inscrire')).toBeVisible();
    await expect(page.getByText('Créez votre compte VoyagaBagae')).toBeVisible();
  });

  test('should switch between login and register modals', async ({ page }) => {
    // Ouvrir le modal de connexion
    await page.getByRole('button', { name: 'Se connecter' }).click();
    
    // Cliquer sur le lien pour s'inscrire
    await page.getByRole('button', { name: 'S\'inscrire' }).click();
    
    // Vérifier que le modal d'inscription est maintenant ouvert
    await expect(page.getByText('S\'inscrire')).toBeVisible();
    await expect(page.getByText('Créez votre compte VoyagaBagae')).toBeVisible();
    
    // Retourner au modal de connexion
    await page.getByRole('button', { name: 'Se connecter' }).click();
    
    // Vérifier que le modal de connexion est ouvert
    await expect(page.getByText('Se connecter')).toBeVisible();
  });

  test('should validate login form fields', async ({ page }) => {
    // Ouvrir le modal de connexion
    await page.getByRole('button', { name: 'Se connecter' }).click();
    
    // Essayer de soumettre le formulaire vide
    await page.getByRole('button', { name: 'Se connecter' }).click();
    
    // Vérifier que les champs sont requis
    const emailInput = page.getByPlaceholder('votre@email.com');
    const passwordInput = page.getByPlaceholder('Votre mot de passe');
    
    await expect(emailInput).toHaveAttribute('required');
    await expect(passwordInput).toHaveAttribute('required');
  });

  test('should validate email format in login form', async ({ page }) => {
    // Ouvrir le modal de connexion
    await page.getByRole('button', { name: 'Se connecter' }).click();
    
    // Remplir avec un email invalide
    await page.getByPlaceholder('votre@email.com').fill('invalid-email');
    await page.getByPlaceholder('Votre mot de passe').fill('password123');
    
    // Soumettre le formulaire
    await page.getByRole('button', { name: 'Se connecter' }).click();
    
    // Vérifier le message d'erreur
    await expect(page.getByText(/adresse email valide/)).toBeVisible();
  });

  test('should show password toggle in login form', async ({ page }) => {
    // Ouvrir le modal de connexion
    await page.getByRole('button', { name: 'Se connecter' }).click();
    
    // Vérifier que le bouton de toggle du mot de passe est présent
    const toggleButton = page.locator('button[type="button"]').filter({ hasText: '' });
    await expect(toggleButton).toBeVisible();
    
    // Cliquer sur le bouton pour afficher le mot de passe
    await toggleButton.click();
    
    // Vérifier que le type du champ mot de passe a changé
    const passwordInput = page.getByPlaceholder('Votre mot de passe');
    await expect(passwordInput).toHaveAttribute('type', 'text');
  });

  test('should close modals when clicking close button', async ({ page }) => {
    // Ouvrir le modal de connexion
    await page.getByRole('button', { name: 'Se connecter' }).click();
    
    // Vérifier que le modal est ouvert
    await expect(page.getByText('Se connecter')).toBeVisible();
    
    // Cliquer sur le bouton de fermeture
    await page.locator('button[aria-label="Close"]').click();
    
    // Vérifier que le modal est fermé
    await expect(page.getByText('Se connecter')).not.toBeVisible();
  });

  test('should close modals when clicking outside', async ({ page }) => {
    // Ouvrir le modal de connexion
    await page.getByRole('button', { name: 'Se connecter' }).click();
    
    // Vérifier que le modal est ouvert
    await expect(page.getByText('Se connecter')).toBeVisible();
    
    // Cliquer en dehors du modal
    await page.click('body', { position: { x: 0, y: 0 } });
    
    // Vérifier que le modal est fermé
    await expect(page.getByText('Se connecter')).not.toBeVisible();
  });

  test('should handle successful login', async ({ page }) => {
    // Ouvrir le modal de connexion
    await page.getByRole('button', { name: 'Se connecter' }).click();
    
    // Remplir le formulaire avec des données valides
    await page.getByPlaceholder('votre@email.com').fill('test@example.com');
    await page.getByPlaceholder('Votre mot de passe').fill('password123');
    
    // Soumettre le formulaire
    await page.getByRole('button', { name: 'Se connecter' }).click();
    
    // Attendre que la connexion soit réussie
    await page.waitForTimeout(1000);
    
    // Vérifier que l'utilisateur est connecté
    await expect(page.getByText('Utilisateur')).toBeVisible();
    await expect(page.getByText('Se déconnecter')).toBeVisible();
  });

  test('should handle successful registration', async ({ page }) => {
    // Ouvrir le modal d'inscription
    await page.getByRole('button', { name: 'S\'inscrire' }).click();
    
    // Remplir le formulaire d'inscription
    await page.getByPlaceholder('Prénom').fill('John');
    await page.getByPlaceholder('Nom').fill('Doe');
    await page.getByPlaceholder('votre@email.com').fill('john@example.com');
    await page.getByPlaceholder('Numéro de téléphone').fill('+212 6XX-XXX-XXX');
    await page.getByPlaceholder('Votre mot de passe').fill('password123');
    await page.getByPlaceholder('Confirmez votre mot de passe').fill('password123');
    
    // Accepter les conditions
    await page.getByRole('checkbox').check();
    
    // Soumettre le formulaire
    await page.getByRole('button', { name: 'S\'inscrire' }).click();
    
    // Attendre que l'inscription soit réussie
    await page.waitForTimeout(1500);
    
    // Vérifier que l'utilisateur est connecté
    await expect(page.getByText('John')).toBeVisible();
    await expect(page.getByText('Se déconnecter')).toBeVisible();
  });

  test('should handle logout', async ({ page }) => {
    // Se connecter d'abord
    await page.getByRole('button', { name: 'Se connecter' }).click();
    await page.getByPlaceholder('votre@email.com').fill('test@example.com');
    await page.getByPlaceholder('Votre mot de passe').fill('password123');
    await page.getByRole('button', { name: 'Se connecter' }).click();
    await page.waitForTimeout(1000);
    
    // Vérifier que l'utilisateur est connecté
    await expect(page.getByText('Utilisateur')).toBeVisible();
    
    // Se déconnecter
    await page.getByRole('button', { name: 'Se déconnecter' }).click();
    
    // Vérifier que l'utilisateur est déconnecté
    await expect(page.getByText('Se connecter')).toBeVisible();
    await expect(page.getByText('S\'inscrire')).toBeVisible();
  });
});

