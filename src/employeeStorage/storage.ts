import logging from '../config/logging';
import fs from 'fs';

const NAMESPACE = 'Storage';
type employee = { name: string; email: string };

const getAll = (): Array<employee> => {
    const file = fs.readFileSync('src/employeeStorage/employees.txt', 'utf-8');
    let employees: Array<employee> = [];
    file.split('\r\n').map((employee, i) => {
        if (i < file.split('\r\n').length - 1) {
            let toAdd: employee = { name: '', email: '' };
            employee.split('#').map((data, index) => {
                if (index === 0) {
                    toAdd.name = data;
                } else if (index === 1) {
                    toAdd.email = data;
                }
            });
            employees.push(toAdd);
        }
    });
    return employees;
};

const addNew = (employeeToAdd: employee) => {
    let employees: Array<employee> = getAll();
    if (employees.some((employee) => employeeToAdd.name === employee.name && employeeToAdd.email === employee.email)) {
        logging.warn(NAMESPACE, 'This employee already exists');
    } else {
        fs.appendFileSync('src/employeeStorage/employees.txt', employeeToAdd.name + '#' + employeeToAdd.email + '\r\n');
    }
};

const editEmployee = (original: employee, edited: employee) => {
    fs.readFile('src/employeeStorage/employees.txt', 'utf8', function (err, data) {
        var formatted = data.replace(original.name + '#' + original.email, edited.name + '#' + edited.email);
        fs.writeFile('src/employeeStorage/employees.txt', formatted, 'utf8', function (err) {
            if (err) logging.error(NAMESPACE, err.message);
        });
    });
};

const deleteEmployee = (employeesToDelete: Array<employee>) => {
    fs.readFile('src/employeeStorage/employees.txt', 'utf8', function (err, data) {
        let formatted = data;
        employeesToDelete.map((employeeToDelete: employee) => {
            formatted = formatted.replace(employeeToDelete.name + '#' + employeeToDelete.email + '\r\n', '');
        });
        fs.writeFile('src/employeeStorage/employees.txt', formatted, 'utf8', function (err) {
            if (err) logging.error(NAMESPACE, err.message);
        });
    });
};
export default { getAll, addNew, editEmployee, deleteEmployee };
