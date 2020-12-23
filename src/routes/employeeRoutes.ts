import express from 'express';
import employeeController from '../controllers/employeeController';

const router = express.Router();

router.get('/getAll', employeeController.getAllEmployee);
router.post('/add', employeeController.addNewEmployee);
router.put('/edit', employeeController.editEmployee);
router.delete('/delete', employeeController.deleteEmployee);

export = router;
