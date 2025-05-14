import express from 'express';
import {
    createTrainer,   // POST
    listTrainers,    // GET
    updateTrainer,   // PUT/PATCH
    deleteTrainer    // DELETE
} from '../controllers/trainer.controller.js';

const router = express.Router();

router.post('/', createTrainer);       // Create
router.get('/', listTrainers);        // Read (listar)
router.put('/:id', updateTrainer);       // Update
router.delete('/:id', deleteTrainer);     // Delete

export default router;
