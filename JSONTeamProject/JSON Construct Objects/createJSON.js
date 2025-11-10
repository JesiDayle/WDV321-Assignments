// JavaScript Document
/*
	This file will:
	
	- Create a Javascript object including an array
	- Convert the Javascript object into a JSON object
	- Store the JSON object into local storage
	
	Goal: Provide an example of how to create JSON objects in Javascript
	Goal: Provide an example of how to consume JSON objects in Javascript

	Use the following data for your JSON object

		student_id = 332443
		student_gpa = 3.6
		student_courses = ["WDV101","WDV131","WDV105"]

		student_id = 545467
		student_gpa = 2.7
		student_courses = ["WDV101","WDV131","WDV105","WDV221","WDV205"]	
		
		student_id = 128574
		student_gpa = 3.4
		student_courses = ["WDV101","WDV131","WDV105","WDV221","WDV205","WDV341"]	



*/


//JavaScript object with an array of students
let students = [
	{
		student_id: 332443,
		student_gpa: 3.6,
		student_courses: ["WDV101", "WDV131", "WDV105"]
	},
	{
		student_id: 545467,
		student_gpa: 2.7,
		student_courses: ["WDV101", "WDV131", "WDV105", "WDV221", "WDV205"]
	},
	{
		student_id: 128574,
		student_gpa: 3.4,
		student_courses: ["WDV101", "WDV131", "WDV105", "WDV221", "WDV205", "WDV341"]
	}
];

//Convert the JavaScript object into a JSON string
let studentsJSON = JSON.stringify(students);

//Store the JSON string into local storage
localStorage.setItem("studentsData", studentsJSON);

//Retrieve the JSON string from local storage
let retrievedData = localStorage.getItem("studentsData");

//Parse the JSON string back into a JavaScript object
let studentsArray = JSON.parse(retrievedData);

//Log it to the console
console.log(studentsArray);