import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';
import storage from '../employeeStorage/storage';

const NAMESPACE = 'Employee Controller';
type employee = { name: string; email: string };

/* Response: 
{
    "employees":[
        {
            "name":"employeName",
            "email":"employeeEmail"
        },
        {
            "name":"test2",
            "email":"test@test.test2"
        }....
    ]
} 
*/
const getAllEmployee = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Get all employee route called');
    let employees = storage.getAll();
    return res.status(200).json({
        employees
    });
};

const addNewEmployee = (req: Request, res: Response, next: NextFunction) => {
    /* request: 
        {
            "name": "employeeName",
            "email": "employeeEmail"
        }
    */
    logging.info(NAMESPACE, 'Add employee route called');
    let employeeToAdd: employee = req.body;
    storage.addNew(employeeToAdd);
    return res.status(200).json({
        message: employeeToAdd.name + ',' + employeeToAdd.email + ' added'
    });
};

const editEmployee = (req: Request, res: Response, next: NextFunction) => {
    /* request: 
    {
        "original":{
            "name": "employeeName",
            "email": "employeeEmail"
        },
        "edited":{
            "name": "employeeName",
            "email": "employeeEmail"
        }
    }
    */
    logging.info(NAMESPACE, 'Edit employee route called');
    let original: employee = req.body.original;
    let edited: employee = req.body.edited;
    storage.editEmployee(original, edited);
    return res.status(200).json({
        message: original + 'changed to: ' + edited
    });
};

const deleteEmployee = (req: Request, res: Response, next: NextFunction) => {
    /* request: 
    {
        employees:[
            {
                "name": "employeeName",
                "email": "employeeEmail"
            },
            {
                "name": "employeeName",
                "email": "employeeEmail"
            },....
        ]
    }
    */
    logging.info(NAMESPACE, 'Delete employee route called');
    let employeesToDelete: Array<employee> = req.body.employees;
    storage.deleteEmployee(employeesToDelete);
    return res.status(200).json({
        message: 'delete done'
    });
};

export default { getAllEmployee, addNewEmployee, editEmployee, deleteEmployee };
