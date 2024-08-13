const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith, createNote } = require('./helper')

describe('Note app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'Salainen123!',
      },
    })
    await page.goto('/')
  })

  test('front page can be opened', async ({ page }) => {
    const locator = await page.getByText('Notes')
    expect(locator).toBeVisible()
    await expect(
      page.getByText(
        'Note app, Department of Computer Science, University of Helsinki 2024'
      )
    ).toBeVisible()
  })

  test('login form can be opened', async ({ page }) => {
    await loginWith(page, 'mluukkai', 'Salainen123!')

    await expect(page.getByText('Matti Luukkainen logged-in')).toBeVisible()
  })

  test('login fails with wrong password', async ({ page }) => {
    await loginWith(page, 'mluukkai', 'adasdas')

    const errorDiv = await page.locator('.error')
    await expect(errorDiv).toContainText('Wrong Credentials')
    await expect(errorDiv).toHaveCSS('border-style', 'solid')
    await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

    await expect(page.getByText('Matti Luukainen logged in')).not.toBeVisible()
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'Salainen123!')
    })

    test('a new note can be created', async ({ page }) => {
      await page.pause()
      createNote(page, 'A new note is created by playwright')

      await expect(
        page.getByText('A new note is created by playwright')
      ).toBeVisible()
    })

    describe('and a note exists', () => {
      beforeEach(async ({ page }) => {
        await page.pause()
        await createNote(page, 'first note')
        await createNote(page, 'second note')
        await createNote(page, 'third note')
      })

      test('importance can be changed', async ({ page }) => {
        await page.pause()
        const secondElement = await page.getByText('second note')
        const parentElement = await secondElement.locator('..')
        await parentElement
          .getByRole('button', { name: 'make not important' })
          .click()

        await expect(parentElement.getByText('make important')).toBeVisible()
      })
    })

    describe('and several notes exists', () => {
      beforeEach(async ({ page }) => {
        await createNote(page, 'first note', true)
        await createNote(page, 'second note', true)
      })

      test('one of those can be made nonimportant', async ({ page }) => {
        await page.pause()
        const otherNoteText = await page.getByText('first note')
        const otherNoteElement = await otherNoteText.locator('..')
        otherNoteElement
          .getByRole('button', { name: 'make not important' })
          .click()

        await expect(otherNoteElement.getByText('make important')).toBeVisible()
      })
    })
  })
})
