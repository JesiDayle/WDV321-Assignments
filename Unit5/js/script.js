$(document).ready(function() {
    $.getJSON('students.json', function(data) {
        let output = '';
        data.forEach(student => {
            output += `
            <div class="col-md-4 mb-3">
                <div class="card h-100 shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title">${student.student_first_name} ${student.student_last_name}</h5>
                        <p class="card-text"><strong>ID:</strong> ${student.student_id}</p>
                        <p class="card-text"><strong>Major:</strong> ${student.student_major}</p>
                        <p class="card-text"><strong>Credits:</strong> ${student.student_credits}</p>
                        <p class="card-text"><strong>GPA:</strong> ${student.student_gpa}</p>
                        <p class="card-text"><strong>Registered:</strong> ${student.student_registration_date}</p>
                    </div>
                </div>
            </div>
            `;
        });
        $('#studentList').html(output);
    }).fail(function() {
        $('#studentList').html('<p class="text-danger">Unable to load student data.</p>');
    });
});
