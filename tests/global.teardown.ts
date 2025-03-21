import { test as teardown } from '@playwright/test';

teardown('Tear Down Tests', async ({ }) => {
    console.log('cleaning up test setup...')
});