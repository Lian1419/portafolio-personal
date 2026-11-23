
import { test, expect } from '@playwright/test'

test.describe('Pruebas E2E del portafolio', () => {

  test('1. Debe cargar correctamente la página principal', async ({ page }) => {
    await page.goto('/')

    await expect(
      page.getByRole('heading', { name: /Kail Cordero/i })
    ).toBeVisible()
  })

  test('2. Debe mostrar las secciones principales', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByText('Sobre mí', { exact: true }).first()).toBeVisible()
    await expect(page.getByText('Proyectos', { exact: true }).first()).toBeVisible()
    await expect(page.getByText('Contacto', { exact: true }).first()).toBeVisible()
  })

  test('3. Debe permitir completar y enviar el formulario', async ({ page }) => {
    await page.goto('/')

    await page.getByPlaceholder(/nombre/i).fill('Prueba E2E')
    await page.getByPlaceholder(/correo/i).fill('e2e@prueba.com')
    await page.getByPlaceholder(/mensaje/i).fill('Mensaje de prueba automatizada')

    await page.getByRole('button', { name: /enviar/i }).click()

    await expect(page.getByText(/enviado|correctamente|éxito/i)).toBeVisible()
  })

})
