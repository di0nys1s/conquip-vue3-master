var name = 'all-cases';

function view(callback) {
    let rv = [
        { id: 1, title: 'Weston Sparks', case_number: 'CA20-000001', phone_number: '0407819827', email: 'wsparks@gmail.com', dob: '2020-10-18'},
        { id: 2, title: 'Stanford Johnstone', case_number: 'CA20-000002', phone_number: '0408102827', email: 'sjohnstone@gmail.com', dob: '2020-04-01'},
        { id: 3, title: 'Amos Jennings', case_number: 'CA20-000003', phone_number: '0418291000', email: 'ajennings@gmail.com', dob: '2020-12-16'},
        { id: 4, title: 'Janine Johnon', case_number: 'CA20-000004', phone_number: '0444983716', email: 'jjohnson@gmail.com', dob: '2020-02-22'},
        { id: 5, title: 'Azalee Fritz', case_number: 'CA20-000005', phone_number: '0409811877', email: 'afritz@gmail.com', dob: '2020-06-21'},
        { id: 6, title: 'Antoine Page', case_number: 'CA20-000006', phone_number: '0400499981', email: 'apage@gmail.com', dob: '2020-08-11'},
    ];

    return callback(null, rv);
}

exports.name = name;
exports.view = view;