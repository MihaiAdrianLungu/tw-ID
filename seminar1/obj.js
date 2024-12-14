const student = {
    name: 'Adrian',
    email: "adrian.lungu@csie.ase.ro",
    yearsOld: 25,
    meet: function () {
        console.log(this.name);
    },
    // meet2: () => {
    //     console.log(this)
    // }
}

console.log(student.name);
console.log(student['name'])
// console.log(student.meet());
