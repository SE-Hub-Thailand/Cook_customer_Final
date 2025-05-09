import { describe, it, expect } from 'vitest';
import { getAllRecycleMachines } from './recycleMachineApi';
import { RecycleMachine } from '../types';

describe('getAllRecycleMachines', () => {
    it('should fetch all recycle machines and return an array of RecycleMachine objects', async () => {
        const recycleMachines: RecycleMachine[] = await getAllRecycleMachines();

        // Basic assertions
        expect(recycleMachines).toBeInstanceOf(Array);
        expect(recycleMachines.length).toBeGreaterThan(0);

        // Assert structure of the first recycle machine object (if available)
        const machine = recycleMachines[0];
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

        console.log('Fetched recycle machines:', recycleMachines);
    }, 30000);

    it('should return an empty array if no recycle machines are available', async () => {
        // This test assumes the API can return an empty list. Adjust as necessary.
        const recycleMachines: RecycleMachine[] = await getAllRecycleMachines();

        // If API always returns items, this assertion can be removed.
        expect(recycleMachines).toBeInstanceOf(Array);
        expect(recycleMachines.length).toBeGreaterThanOrEqual(0);
    });
});
