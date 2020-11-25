var name = 'active-tickets';

function view(callback) {
    let rv = [
        { id: 1, analyst: 'John Smith', title: 'Ticket #1', status: '3 - Resolved'},
        { id: 2, analyst: 'John Smith', title: 'Ticket #2', status: '4 - Cancelled'},
        { id: 3, analyst: 'Jane Doe', title: 'Ticket #3', status: '2 - In Progress'},
        { id: 4, analyst: 'Jane Doe', title: 'Ticket #4', status: '2 - In Progress'},
        { id: 5, analyst: 'Ravi Smith', title: 'Ticket #5', status: '2 - In Progress'},
        { id: 6, analyst: 'Burak Seyhan', title: 'Ticket #6', status: '2 - In Progress'}
    ];

    return callback(null, rv);
}

exports.name = name;
exports.view = view;