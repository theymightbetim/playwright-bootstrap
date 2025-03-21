import { test, expect } from "@playwright/test";
import Ajv, { Schema } from "ajv"
import addFormats from "ajv-formats";
import { userRequest, ContractSchema } from "./types/tests";

test.describe("API Tests", () => {
    const apiBaseUrl: string = "https://localhost";
    let TOKEN: string;
    const ajv = new Ajv()
    addFormats(ajv)

    test.beforeAll('Authorization Token', async () => {
        const authResponse = await request.get(authUrl, {
            data: {
                client_id: "",
                client_secret: "",
                audience: "",
                scopes: []
            }
        })
        const authBody = await authResponse.json()
        TOKEN = await authBody.access_token
    })


    test("GET endpoint", async ({ request }) => {
        const endpoint = '/'
        const requestUrl = apiBaseUrl + endpoint;
        const response = await request.get(requestUrl);

        await test.step('Validate Response Code', async () => {
            expect(response.status).toBe(200)
        });

        await test.step('Validate Response Body', async () => {
            const expectedBodyResult = { property: "value" }
            const expectedPropertyResult = "value"
            const body = await response.json()

            // assert data is expected
            expect(body.property).toBe(expectedPropertyResult)
            // assert on length of data
            expect(body.property.length).toBe(6)
            // assert entire body is correct
            expect(body).toContainEqual(expect.objectContaining(expectedBodyResult));
        });
    })

    test("POST endpoint", async ({ request }) => {
        const endpoint: string = '/users/login';
        const requestUrl: string = apiBaseUrl + endpoint;
        const requestBody: userRequest = {
            data: {
                email: "",
                password: ""
            }
        }
        const response = await request.post(requestUrl, requestBody);
        expect(response.status).toBe(200);
        const body = await response.json();
        // Make sure the access token exists
        expect(body.access_token).toBeTruthy()
    })

    test('Contact Test', async ({ request }) => {
        const endpoint: string = '/';
        const requestUrl: string = apiBaseUrl + endpoint;
        const response = await request.get(requestUrl,  {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${TOKEN}`
            }
        });
        // Contract          
        const schema: Schema = {
            type: "object",
            properties: {
                email: { type: "string", format: "email" },
                password: { type: "string" }
                }
        }
        const body = await response.json();
        const validate = ajv.compile(schema)
        expect(validate(body)).toBeTruthy()
    })
})

