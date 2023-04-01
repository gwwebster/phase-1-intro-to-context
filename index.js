function createEmployeeRecord(array) {
    let employeeObj = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
    return employeeObj
};

function createEmployeeRecords(arrayOfArrays) {
    let arrayOfEmployeeObjects = []
    arrayOfArrays.forEach((array) => {
        arrayOfEmployeeObjects.push(createEmployeeRecord(array))
    })
    return arrayOfEmployeeObjects
};

function createTimeInEvent(employeeRecordObj, dateStamp) {
    employeeRecordObj['timeInEvents'].push({
        type: "TimeIn",
        hour: Number(dateStamp.slice(-4)),
        date: dateStamp.slice(0, 10),
    })
    return employeeRecordObj
};
 

function createTimeOutEvent(employeeRecordObj, dateStamp) {
    employeeRecordObj['timeOutEvents'].push({
        type: "TimeOut",
        hour: Number(dateStamp.slice(-4)),
        date: dateStamp.slice(0, 10),
    })
    return employeeRecordObj
};

function hoursWorkedOnDate(employeeRecordObj, searchDate) {
    let timeIn
    let indexOfTimeInObj
    employeeRecordObj['timeInEvents'].forEach((timeInObj) => {
        if (timeInObj.date === searchDate) {
            timeIn = timeInObj.hour
            indexOfTimeInObj = employeeRecordObj['timeInEvents'].indexOf(timeInObj)
        }
        })
    let timeOut
    employeeRecordObj['timeOutEvents'].forEach((timeOutObj) => {
        if (timeOutObj.date === searchDate && timeOutObj.hour > Number(timeIn)) {
            timeOut = timeOutObj.hour
        }
        })
        let totalHours = (timeOut - timeIn)/100
        return totalHours
};

function wagesEarnedOnDate(employeeRecordObj, date) {
    return hoursWorkedOnDate(employeeRecordObj, date) * employeeRecordObj.payPerHour
};

function allWagesFor(employeeRecordObj) {
    let totalWages = 0
    employeeRecordObj['timeInEvents'].forEach(timeInObj => {
        totalWages = totalWages + wagesEarnedOnDate(employeeRecordObj, timeInObj.date)
    })
    return totalWages
};

function calculatePayroll(arrayOfEmployeeRecords) {
    let totalPayroll = 0
    arrayOfEmployeeRecords.forEach(employeeRecordObj => {
        totalPayroll = totalPayroll + allWagesFor(employeeRecordObj)
    })
    return totalPayroll
};