function createEmployeeRecord(employeeDetails) {
    return {
        firstName: employeeDetails[0],
        familyName: employeeDetails[1],
        title: employeeDetails[2],
        payPerHour: employeeDetails[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employees) {
    return employees.map(employee => createEmployeeRecord(employee));
}

function createTimeInEvent(employee, dateStamp) {
    const [date, time] = dateStamp.split(' ');

    employee.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(time, 10),
        date: date
    });
    return employee;
}

function createTimeOutEvent(employee, dateStamp) {
    const [date, time] = dateStamp.split(' ');

    employee.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(time, 10),
        date: date
    });
    return employee;
}

function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(e => e.date === date);
    const timeOut = employee.timeOutEvents.find(e => e.date === date);

    const hoursOfWork = (timeOut.hour - timeIn.hour) / 100;

    return hoursOfWork;
}

function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    const payOwedToEmployee = hoursWorked * employee.payPerHour;

    return payOwedToEmployee;
}

function allWagesFor(employee) {
    const dates = employee.timeInEvents.map(e => e.date);
    const totalPay = dates.reduce((accumulator, date) => {
        return accumulator + wagesEarnedOnDate(employee, date);
    }, 0)
    return totalPay;
}

function calculatePayroll(employee) {
    const total = employee.reduce((accumulator, employee) => {
        return accumulator + allWagesFor(employee);
    }, 0)
    return total;
}
