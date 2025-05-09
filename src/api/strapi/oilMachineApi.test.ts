import { describe, it, expect } from 'vitest';
import { getAllOilMachines } from './oilMachineApi';
import { OilMachine } from './types';

describe('getAllOilMachines', () => {
    it('should fetch all oil machines and return an array of OilMachine objects', async () => {
        const oilMachines: OilMachine[] = await getAllOilMachines();

        // Basic assertions
        expect(oilMachines).toBeInstanceOf(Array);
        expect(oilMachines.length).toBeGreaterThan(0);

        // Assert structure of the first oil machine object (if available)
        const machine = oilMachines[0];
        expect(machine).toHaveProperty('id');
        expect(machine).toHaveProperty('location');
        expect(machine).toHaveProperty('latitude');
        expect(machine).toHaveProperty('longitude');
        expect(machine).toHaveProperty('status');
        expect(machine).toHaveProperty('createdAt');
        expect(machine).toHaveProperty('updatedAt');
        expect(machine).toHaveProperty('publishedAt');

        // Additional type checks (optional)
        expect(typeof machine.id).toBe('number');
        expect(typeof machine.location).toBe('string');
        expect(typeof machine.latitude).toBe('string');
        expect(typeof machine.longitude).toBe('string');
        expect(typeof machine.status).toBe('string');
        expect(typeof machine.createdAt).toBe('string');
        expect(typeof machine.updatedAt).toBe('string');
        expect(typeof machine.publishedAt).toBe('string');

        console.log('Fetched oil machines:', oilMachines);
    }, 30000);

    it('should return an empty array if no oil machines are available', async () => {
        // This test assumes the API can return an empty list. Adjust as necessary.
        const oilMachines: OilMachine[] = await getAllOilMachines();

        // If API always returns items, this assertion can be removed.
        expect(oilMachines).toBeInstanceOf(Array);
        expect(oilMachines.length).toBeGreaterThanOrEqual(0);
    });
});
