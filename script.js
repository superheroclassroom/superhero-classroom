document.addEventListener("DOMContentLoaded", function () {

    // ============================================
    // DATA
    // ============================================

    var appData = {
        classes: []
    };

    var selectedClassId = null;
    var editingStudentId = null;


    // ============================================
    // HEROES
    // ============================================

    var heroes = [
        {
            id: "spiderman",
            name: "Spider-Man",
            image: "hero/spiderman.png",
            className: "hero-spiderman"
        },
        {
            id: "superman",
            name: "Superman",
            image: "hero/superman.png",
            className: "hero-superman"
        },
        {
            id: "batman",
            name: "Batman",
            image: "hero/batman.png",
            className: "hero-batman"
        },
        {
            id: "captain-america",
            name: "Captain America",
            image: "hero/captain-america.png",
            className: "hero-captain-america"
        },
        {
            id: "thor",
            name: "Thor",
            image: "hero/thor.png",
            className: "hero-thor"
        },
        {
            id: "hulk",
            name: "Hulk",
            image: "hero/hulk.png",
            className: "hero-hulk"
        },
        {
            id: "iron-man",
            name: "Iron Man",
            image: "hero/iron-man.png",
            className: "hero-iron-man"
        },
        {
            id: "black-widow",
            name: "Black Widow",
            image: "hero/black-widow.png",
            className: "hero-black-widow"
        },
        {
            id: "hawkeye",
            name: "Hawkeye",
            image: "hero/hawkeye.png",
            className: "hero-hawkeye"
        },
        {
            id: "captain-marvel",
            name: "Captain Marvel",
            image: "hero/captain-marvel.png",
            className: "hero-captain-marvel"
        },
        {
            id: "ant-man",
            name: "Ant-Man",
            image: "hero/ant-man.png",
            className: "hero-ant-man"
        },
        {
            id: "black-panther",
            name: "Black Panther",
            image: "hero/black-panther.png",
            className: "hero-black-panther"
        },
        {
            id: "doctor-strange",
            name: "Doctor Strange",
            image: "hero/doctor-strange.png",
            className: "hero-doctor-strange"
        },
        {
            id: "she-hulk",
            name: "She-Hulk",
            image: "hero/she-hulk.png",
            className: "hero-she-hulk"
        },
        {
            id: "wonder-woman",
            name: "Wonder Woman",
            image: "hero/wonder-woman.png",
            className: "hero-wonder-woman"
        },
        {
            id: "flash",
            name: "The Flash",
            image: "hero/flash.png",
            className: "hero-flash"
        },
        {
            id: "supergirl",
            name: "Supergirl",
            image: "hero/supergirl.png",
            className: "hero-supergirl"
        }
    ];


    // ============================================
    // DOM ELEMENTS
    // ============================================

    var classesContainer = document.getElementById("classesContainer");
    var attendanceSection = document.getElementById("attendanceSection");
    var emptyState = document.getElementById("emptyState");

    var selectedClassName = document.getElementById("selectedClassName");
    var selectedClassInfo = document.getElementById("selectedClassInfo");

    var attendanceDate = document.getElementById("attendanceDate");

    var studentsGrid = document.getElementById("studentsGrid");

    var studentNameInput = document.getElementById("studentNameInput");
    var studentSearch = document.getElementById("studentSearch");

    var totalStudents = document.getElementById("totalStudents");
    var presentCount = document.getElementById("presentCount");
    var absentCount = document.getElementById("absentCount");
    var attendancePercentage = document.getElementById("attendancePercentage");

    var classModal = document.getElementById("classModal");
    var classNameInput = document.getElementById("classNameInput");

    var editStudentModal = document.getElementById("editStudentModal");
    var editStudentInput = document.getElementById("editStudentInput");

    var toast = document.getElementById("toast");

    var heroOverlay = document.getElementById("heroOverlay");
    var flyingHero = document.getElementById("flyingHero");
    var heroPopupName = document.getElementById("heroPopupName");
    var heroPopupMessage = document.getElementById("heroPopupMessage");
    var heroPopupPower = document.getElementById("heroPopupPower");


    // ============================================
    // INITIALIZE
    // ============================================

    loadData();
    setupDate();
    renderClasses();


    // ============================================
    // DATE
    // ============================================

    function setupDate() {

        var today = new Date();

        var year = today.getFullYear();
        var month = String(today.getMonth() + 1).padStart(2, "0");
        var day = String(today.getDate()).padStart(2, "0");

        attendanceDate.value = year + "-" + month + "-" + day;
    }


    // ============================================
    // LOCAL STORAGE
    // =========================================== 
    
function saveData() {

        localStorage.setItem(
            "heroAttendanceData",
            JSON.stringify(appData)
        );
    }
    function loadData() {

        var savedData = localStorage.getItem("heroAttendanceData");

        if (savedData) {

            try {

                appData = JSON.parse(savedData);

                if (!appData.classes) {
                    appData.classes = [];
                }

            } catch (error) {

                appData = {
                    classes: []
                };
            }
        }
    }


    // ============================================
    // ID
    // ============================================

    function generateId() {

        return Date.now().toString() +
            Math.random().toString(36).substring(2, 8);
    }


    // ============================================
    // CLASS FUNCTIONS
    // ============================================

    function renderClasses() {

        classesContainer.innerHTML = "";

        if (appData.classes.length === 0) {

            emptyState.classList.remove("hidden");

            return;
        }

        emptyState.classList.add("hidden");


        appData.classes.forEach(function (classItem) {

            var card = document.createElement("div");

            card.className = "class-card";

            card.setAttribute(
                "data-class-id",
                classItem.id
            );


            var emoji = document.createElement("div");

            emoji.className = "class-emoji";
            emoji.textContent = "🦸‍♂️";


            var title = document.createElement("h3");

            title.textContent = classItem.name;


            var info = document.createElement("p");

            info.textContent =
                classItem.students.length +
                " / 30 heroes";


            var arrow = document.createElement("div");

            arrow.className = "class-arrow";
            arrow.textContent = "→";


            card.appendChild(emoji);
            card.appendChild(title);
            card.appendChild(info);
            card.appendChild(arrow);


            card.addEventListener("click", function () {

                openClass(classItem.id);

            });


            classesContainer.appendChild(card);

        });
    }


    function createClass() {

        var name = classNameInput.value.trim();

        if (!name) {

            showToast("Please enter a class name.");

            return;
        }


        var newClass = {

            id: generateId(),

            name: name,

            students: []

        };


        appData.classes.push(newClass);

        saveData();

        classNameInput.value = "";

        closeClassModal();

        renderClasses();

        showToast("Class created successfully! 🎉");
    }


    function openClass(classId) {

        selectedClassId = classId;

        var classItem = getSelectedClass();

        if (!classItem) {
            return;
        }

        attendanceSection.classList.remove("hidden");

        document.querySelector(".classes-section").classList.add("hidden");

        selectedClassName.textContent = classItem.name;

        selectedClassInfo.textContent =
            classItem.students.length +
            " / 30 heroes";

        renderStudents();

        updateStats();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    function getSelectedClass() {

        return appData.classes.find(function (item) {

            return item.id === selectedClassId;

        });
    }


    function closeAttendance() {

        selectedClassId = null;

        attendanceSection.classList.add("hidden");

        document.querySelector(".classes-section").classList.remove("hidden");

        renderClasses();
    }


    function deleteClass() {

        var classItem = getSelectedClass();

        if (!classItem) {
            return;
        }


        var confirmed = confirm(
            'Delete "' +
            classItem.name +
            '" and all its students?'
        );


        if (!confirmed) {
            return;
        }


        appData.classes = appData.classes.filter(function (item) {

            return item.id !== selectedClassId;

        });


        saveData();

        closeAttendance();

        showToast("Class deleted.");
    }


    // ============================================
    // STUDENTS
    // ============================================

    function addStudent() {

        var classItem = getSelectedClass();

        if (!classItem) {
            return;
        }


        var name = studentNameInput.value.trim();


        if (!name) {

            showToast("Enter the hero's name.");

            return;
        }


        if (classItem.students.length >= 30) {

            showToast("This class already has 30 heroes.");

            return;
        }


        var hero = heroes[
            classItem.students.length %
            heroes.length
        ];


        var student = {

            id: generateId(),

            name: name,

            heroId: hero.id,

            attendance: {}

        };


        classItem.students.push(student);


        saveData();

        studentNameInput.value = "";

        renderStudents();

        updateStats();

        selectedClassInfo.textContent =
            classItem.students.length +
            " / 30 heroes";

        showToast(
            name +
            " joined the Hero Team! 🦸"
        );
    }


    function deleteStudent(studentId) {

        var classItem = getSelectedClass();

        if (!classItem) {
            return;
        }


        var student = classItem.students.find(function (item) {

            return item.id === studentId;

        });


        if (!student) {
            return;
        }


        var confirmed = confirm(
            "Remove " +
            student.name +
            " from this class?"
        );


        if (!confirmed) {
            return;
        }


        classItem.students =
            classItem.students.filter(function (item) {

                return item.id !== studentId;

            });


        saveData();

        renderStudents();

        updateStats();

        selectedClassInfo.textContent =
            classItem.students.length +
            " / 30 heroes";

        showToast("Hero removed.");
    }


    function editStudent(studentId) {

        var classItem = getSelectedClass();

        if (!classItem) {
            return;
        }


        var student = classItem.students.find(function (item) {

            return item.id === studentId;

        });


        if (!student) {
            return;
        }


        editingStudentId = studentId;

        editStudentInput.value = student.name;

        editStudentModal.classList.remove("hidden");

        setTimeout(function () {

            editStudentInput.focus();

        }, 100);
    }


    function saveStudentEdit() {

        var classItem = getSelectedClass();

        if (!classItem) {
            return;
        }


        var student = classItem.students.find(function (item) {

            return item.id === editingStudentId;

        });


        if (!student) {
            return;
        }


        var newName = editStudentInput.value.trim();


        if (!newName) {

            showToast("Enter a name.");

            return;
        }


        student.name = newName;

        saveData();

        closeEditModal();

        renderStudents();

        showToast("Hero updated! ✨");
    }


    // ============================================
    // HERO
    // ============================================

    function getHero(heroId) {

        return heroes.find(function (hero) {

            return hero.id === heroId;

        }) || heroes[0];
    }


    function chooseHero(studentId) {

        var classItem = getSelectedClass();

        if (!classItem) {
            return;
        }


        var student = classItem.students.find(function (item) {

            return item.id === studentId;

        });


        if (!student) {
            return;
        }


        var currentIndex = heroes.findIndex(function (hero) {

            return hero.id === student.heroId;

        });


        var nextIndex =
            (currentIndex + 1) %
            heroes.length;


        student.heroId =
            heroes[nextIndex].id;


        saveData();

        renderStudents();

        showToast(
            student.name +
            " is now " +
            heroes[nextIndex].name +
            "!"
        );
    }


    // ============================================
    // RENDER STUDENTS
    // ============================================

    function renderStudents() {

        var classItem = getSelectedClass();

        if (!classItem) {
            return;
        }


        studentsGrid.innerHTML = "";


        var search =
            studentSearch.value
                .trim()
                .toLowerCase();


        var filteredStudents =
            classItem.students.filter(function (student) {

                return student.name
                    .toLowerCase()
                    .includes(search);

            });


        if (filteredStudents.length === 0) {

            var empty = document.createElement("div");

            empty.style.gridColumn = "1 / -1";

            empty.style.textAlign = "center";

            empty.style.padding = "50px";

            empty.innerHTML =
                "<div style='font-size:50px'>🦸</div>" +
                "<h3>No heroes found</h3>";

            studentsGrid.appendChild(empty);

            return;
        }


        filteredStudents.forEach(function (student) {

            createStudentCard(student);

        });
    }


    function createStudentCard(student) {

        var hero = getHero(student.heroId);

        var date = attendanceDate.value;

        var status =
            student.attendance[date] || null;


        var card = document.createElement("div");

        card.className =
            "hero-card " +
            hero.className +
            " " +
            (status === "present"
                ? "present"
                : status === "absent"
                    ? "absent"
                    : "");


        // HERO VISUAL

        var visual = document.createElement("div");

        visual.className = "hero-visual";


        var character = document.createElement("div");

character.className = "hero-character";

var characterImage = document.createElement("img");

characterImage.src = hero.image;

characterImage.alt = hero.name;

characterImage.className = "hero-character-image";

character.appendChild(characterImage);

visual.appendChild(character);


        // ACTION BUTTONS

        var actions = document.createElement("div");

        actions.className = "hero-actions";


        var heroButton = document.createElement("button");

        heroButton.className = "icon-btn";

        heroButton.title = "Change hero";

        heroButton.textContent = "🔄";

        var historyButton = document.createElement("button");

        historyButton.className = "icon-btn";
        
        historyButton.title = "Attendance history";
        
        historyButton.textContent = "📋";
        
        historyButton.addEventListener(
            "click",
            function (event) {
        
                event.stopPropagation();
        
                showAttendanceHistory(student);
        
            }
        );

        heroButton.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                chooseHero(student.id);

            }
        );


        var editButton = document.createElement("button");

        editButton.className = "icon-btn";

        editButton.title = "Edit name";

        editButton.textContent = "✏️";


        editButton.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                editStudent(student.id);

            }
        );


        var deleteButton = document.createElement("button");

        deleteButton.className = "icon-btn";

        deleteButton.title = "Delete";

        deleteButton.textContent = "🗑️";


        deleteButton.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                deleteStudent(student.id);

            }
        );


        actions.appendChild(heroButton);
        actions.appendChild(historyButton);
        actions.appendChild(editButton);
        actions.appendChild(deleteButton);


        visual.appendChild(actions);


        // INFO

        var info = document.createElement("div");

        info.className = "hero-info";


        var name = document.createElement("h3");

        name.textContent = student.name;


        var type = document.createElement("div");

        type.className = "hero-type";

        type.textContent = hero.name;


        // STATUS BUTTONS

        var statusArea = document.createElement("div");

        statusArea.className = "hero-status";


        var presentButton = document.createElement("button");

        presentButton.className =
            "status-btn present-btn";

        presentButton.textContent = "✓ Present";


        presentButton.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                setAttendance(
                    student.id,
                    "present"
                );

            }
        );


        var absentButton = document.createElement("button");

        absentButton.className =
            "status-btn absent-btn";

        absentButton.textContent = "✕ Absent";


        absentButton.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                setAttendance(
                    student.id,
                    "absent"
                );

            }
        );


        statusArea.appendChild(presentButton);
        statusArea.appendChild(absentButton);


        info.appendChild(name);
        info.appendChild(type);
        info.appendChild(statusArea);


        card.appendChild(visual);
        card.appendChild(info);


        // CLICK HERO

        card.addEventListener(
            "click",
            function () {

                showHeroAnimation(
                    student,
                    hero
                );

                setAttendance(
                    student.id,
                    "present",
                    false
                );

            }
        );


        studentsGrid.appendChild(card);
    }


    // ============================================
    // ATTENDANCE
    // ============================================

    function setAttendance(
        studentId,
        status,
        showAnimation
    ) {

        if (showAnimation === undefined) {
            showAnimation = true;
        }


        var classItem = getSelectedClass();

        if (!classItem) {
            return;
        }


        var student = classItem.students.find(function (item) {

            return item.id === studentId;

        });


        if (!student) {
            return;
        }


        var date = attendanceDate.value;


        student.attendance[date] = status;


        saveData();

        renderStudents();

        updateStats();


        if (
            showAnimation &&
            status === "present"
        ) {

            var hero = getHero(student.heroId);

            showHeroAnimation(
                student,
                hero
            );

        }
    }
    function showAttendanceHistory(student) {

        var dates = Object.keys(student.attendance || {}).sort().reverse();
    
        var presentCount = 0;
        var absentCount = 0;
    
        var historyList =
            document.getElementById("attendanceHistoryList");
    
        var summary =
            document.getElementById("attendanceSummary");
    
        var studentName =
            document.getElementById("attendanceStudentName");
    
        var modal =
            document.getElementById("attendanceModal");
    
    
        studentName.textContent =
            "📋 " + student.name + " — Attendance History";
    
    
        dates.forEach(function (date) {
    
            var status = student.attendance[date];
    
            if (status === "present") {
                presentCount++;
            }
    
            if (status === "absent") {
                absentCount++;
            }
    
        });
    
    
        var totalRecords = dates.length;
    
        var percentage =
            totalRecords > 0
                ? Math.round((presentCount / totalRecords) * 100)
                : 0;
    
    
        summary.innerHTML =
    
            '<div class="attendance-summary-card">' +
                '<strong>' + presentCount + '</strong>' +
                '<span>Present</span>' +
            '</div>' +
    
            '<div class="attendance-summary-card">' +
                '<strong>' + absentCount + '</strong>' +
                '<span>Absent</span>' +
            '</div>' +
    
            '<div class="attendance-summary-card">' +
                '<strong>' + percentage + '%</strong>' +
                '<span>Attendance</span>' +
            '</div>';
    
    
        historyList.innerHTML = "";
    
    
        if (dates.length === 0) {
    
            historyList.innerHTML =
                '<div class="attendance-empty">' +
                '📭 No attendance records yet.' +
                '</div>';
    
        } else {
    
            dates.forEach(function (date) {
    
                var status = student.attendance[date];
    
                var statusText =
                    status === "present"
                        ? "✅ Present"
                        : "❌ Absent";
    
                var statusClass =
                    status === "present"
                        ? "attendance-present"
                        : "attendance-absent";
    
    
                var item =
                    document.createElement("div");
    
                item.className =
                    "attendance-history-item";
    
    
                item.innerHTML =
    
                    '<span class="attendance-date">' +
                        date +
                    '</span>' +
    
                    '<span class="attendance-status ' +
                        statusClass +
                        '">' +
                        statusText +
                    '</span>';
    
    
                historyList.appendChild(item);
    
            });
    
        }
    
    
        modal.classList.remove("hidden");
    }
    function updateStats() {

        var classItem = getSelectedClass();

        if (!classItem) {
            return;
        }


        var date = attendanceDate.value;


        var total = classItem.students.length;


        var present = classItem.students.filter(
            function (student) {

                return student.attendance[date] === "present";

            }
        ).length;


        var absent = classItem.students.filter(
            function (student) {

                return student.attendance[date] === "absent";

            }
        ).length;


        var percentage =
            total === 0
                ? 0
                : Math.round(
                    (present / total) * 100
                );


        totalStudents.textContent = total;

        presentCount.textContent = present;

        absentCount.textContent = absent;

        attendancePercentage.textContent =
            percentage + "%";
    }


    function resetToday() {

        var classItem = getSelectedClass();

        if (!classItem) {
            return;
        }


        var date = attendanceDate.value;


        var confirmed = confirm(
            "Reset attendance for today?"
        );


        if (!confirmed) {
            return;
        }


        classItem.students.forEach(
            function (student) {

                delete student.attendance[date];

            }
        );


        saveData();

        renderStudents();

        updateStats();

        showToast("Today's attendance was reset.");
    }


    // ============================================
    // HERO ANIMATION
    // ============================================

    function showHeroAnimation(student, hero) {

        heroOverlay.classList.remove("hidden");


        flyingHero.innerHTML = "";

        var flyingImage = document.createElement("img");
        
        flyingImage.src = hero.image;
        
        flyingImage.alt = hero.name;
        
        flyingImage.className = "flying-hero-image";
        
        flyingHero.appendChild(flyingImage);

        heroPopupName.textContent =
            student.name;


        heroPopupMessage.textContent =
            hero.name +
            " is ready for the mission! 🚀";


        heroPopupPower.textContent =
            "⭐ " +
            hero.name.toUpperCase() +
            " POWER UP!";


        // Restart animation

        flyingHero.style.animation = "none";

        void flyingHero.offsetWidth;

        flyingHero.style.animation =
            "heroFly 1.2s ease-in-out";


        setTimeout(function () {

            closeHeroAnimation();

        }, 1900);
    }


    function closeHeroAnimation() {

        heroOverlay.classList.add("hidden");
    }


    // ============================================
    // CSV EXPORT
    // ============================================

    function exportCSV() {

        var classItem = getSelectedClass();
    
        if (!classItem) {
            return;
        }
    
        var students = classItem.students || [];
    
        var allDates = [];
    
        students.forEach(function (student) {
    
            var attendance =
                student.attendance || {};
    
            Object.keys(attendance).forEach(function (date) {
    
                if (!allDates.includes(date)) {
                    allDates.push(date);
                }
    
            });
    
        });
    
        allDates.sort();
    
    
        var reportWindow =
            window.open("", "_blank");
    
        if (!reportWindow) {
    
            alert(
                "Please allow pop-ups to generate the PDF report."
            );
    
            return;
        }
    
    
        var html = `
    <!DOCTYPE html>
    
    <html>
    
    <head>
    
    <meta charset="UTF-8">
    
    <title>
    ${classItem.name} - Attendance Report
    </title>
    
    <style>
    
    @page {
        size: A4 landscape;
        margin: 12mm;
    }
    
    * {
        box-sizing: border-box;
    }
    
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        color: #222;
    }
    
    .report-header {
        text-align: center;
        margin-bottom: 18px;
    }
    
    .report-header h1 {
        margin: 0 0 6px;
        font-size: 24px;
    }
    
    .report-header h2 {
        margin: 0;
        font-size: 18px;
        font-weight: normal;
    }
    
    .report-header p {
        margin: 6px 0 0;
        font-size: 12px;
        color: #666;
    }
    
    table {
        width: 100%;
        border-collapse: collapse;
        font-size: 10px;
    }
    
    th,
    td {
        border: 1px solid #999;
        padding: 6px 5px;
        text-align: center;
    }
    
    th {
        font-weight: bold;
    }
    
    td.student-name,
    td.hero-name {
        text-align: left;
    }
    
    .present {
        font-weight: bold;
    }
    
    .absent {
        font-weight: bold;
    }
    
    .summary {
        margin-top: 15px;
        display: flex;
        gap: 25px;
        font-size: 12px;
    }
    
    @media print {
    
        body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }
    
    }
    
    </style>
    
    </head>
    
    <body>
    
    <div class="report-header">
    
        <h1>🦸 Hero Attendance</h1>
    
        <h2>
            ${classItem.name} — Attendance Report
        </h2>
    
        <p>
            Generated: ${new Date().toLocaleDateString()}
        </p>
    
    </div>
    
    
    <table>
    
    <thead>
    
    <tr>
    
    <th>#</th>
    
    <th>Student</th>
    
    <th>Hero</th>
    `;
    
    
        allDates.forEach(function (date) {
    
            html += `
    <th>${date}</th>
    `;
    
        });
    
    
        html += `
    
    <th>Present</th>
    
    <th>Absent</th>
    
    <th>Attendance %</th>
    
    </tr>
    
    </thead>
    
    <tbody>
    `;
    
    
        students.forEach(function (student, index) {
    
            var hero =
                getHero(student.heroId);
    
            var presentCount = 0;
    
            var absentCount = 0;
    
    
            html += `
    <tr>
    
    <td>${index + 1}</td>
    
    <td class="student-name">
    ${student.name}
    </td>
    
    <td class="hero-name">
    ${hero.name}
    </td>
    `;
    
    
            allDates.forEach(function (date) {
    
                var status =
                    student.attendance &&
                    student.attendance[date];
    
    
                if (status === "present") {
    
                    presentCount++;
    
                    html += `
    <td class="present">✓</td>
    `;
    
                } else if (status === "absent") {
    
                    absentCount++;
    
                    html += `
    <td class="absent">✗</td>
    `;
    
                } else {
    
                    html += `
    <td>—</td>
    `;
    
                }
    
            });
    
    
            var totalRecords =
                presentCount + absentCount;
    
    
            var percentage =
                totalRecords > 0
                    ? Math.round(
                        (presentCount / totalRecords) * 100
                    )
                    : 0;
    
    
            html += `
    
    <td>${presentCount}</td>
    
    <td>${absentCount}</td>
    
    <td>${percentage}%</td>
    
    </tr>
    `;
    
        });
    
    
        html += `
    
    </tbody>
    
    </table>
    
    
    <div class="summary">
    
        <strong>
            Total Students: ${students.length}
        </strong>
    
        <strong>
            Attendance Report
        </strong>
    
    </div>
    
    
    <script>
    
    window.onload = function () {
    
        setTimeout(function () {
    
            window.print();
    
        }, 500);
    
    };
    
    </script>
    
    </body>
    
    </html>
    `;
    
    
        reportWindow.document.open();
    
        reportWindow.document.write(html);
    
        reportWindow.document.close();
    
    
        showToast(
            "Attendance PDF report ready! 📄"
        );
    
    }

    // ============================================
    // CLEAR ALL DATA
    // ============================================

    function clearAllData() {

        var confirmed = confirm(
            "This will delete ALL classes, students and attendance data. Continue?"
        );


        if (!confirmed) {
            return;
        }


        localStorage.removeItem(
            "heroAttendanceData"
        );


        appData = {
            classes: []
        };


        selectedClassId = null;


        attendanceSection.classList.add("hidden");

        document.querySelector(
            ".classes-section"
        ).classList.remove("hidden");


        renderClasses();

        showToast("All data deleted.");
    }


    // ============================================
    // MODALS
    // ============================================

    function openClassModal() {

        classModal.classList.remove("hidden");

        setTimeout(function () {

            classNameInput.focus();

        }, 100);
    }


    function closeClassModal() {

        classModal.classList.add("hidden");

        classNameInput.value = "";
    }


    function closeEditModal() {

        editStudentModal.classList.add("hidden");

        editStudentInput.value = "";

        editingStudentId = null;
    }


    // ============================================
    // TOAST
    // ============================================

    var toastTimer = null;


    function showToast(message) {

        toast.textContent = message;

        toast.classList.add("show");


        clearTimeout(toastTimer);


        toastTimer = setTimeout(
            function () {

                toast.classList.remove("show");

            },
            2500
        );
    }


    // ============================================
    // EVENT LISTENERS
    // ============================================

    document.getElementById(
        "addClassBtn"
    ).addEventListener(
        "click",
        openClassModal
    );


    document.getElementById(
        "emptyAddClassBtn"
    ).addEventListener(
        "click",
        openClassModal
    );


    document.getElementById(
        "closeClassModal"
    ).addEventListener(
        "click",
        closeClassModal
    );


    document.getElementById(
        "cancelClassBtn"
    ).addEventListener(
        "click",
        closeClassModal
    );


    document.getElementById(
        "saveClassBtn"
    ).addEventListener(
        "click",
        createClass
    );


    document.getElementById(
        "addStudentBtn"
    ).addEventListener(
        "click",
        addStudent
    );


    studentNameInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                addStudent();

            }

        }
    );


    studentSearch.addEventListener(
        "input",
        renderStudents
    );


    attendanceDate.addEventListener(
        "change",
        function () {

            renderStudents();

            updateStats();

        }
    );


    document.getElementById(
        "resetTodayBtn"
    ).addEventListener(
        "click",
        resetToday
    );


    document.getElementById(
        "exportBtn"
    ).addEventListener(
        "click",
        exportCSV
    );


    document.getElementById(
        "deleteClassBtn"
    ).addEventListener(
        "click",
        deleteClass
    );


    document.getElementById(
        "clearDataBtn"
    ).addEventListener(
        "click",
        clearAllData
    );


    document.getElementById(
        "closeEditModal"
    ).addEventListener(
        "click",
        closeEditModal
    );


    document.getElementById(
        "cancelEditBtn"
    ).addEventListener(
        "click",
        closeEditModal
    );


    document.getElementById(
        "saveEditBtn"
    ).addEventListener(
        "click",
        saveStudentEdit
    );


    document.getElementById(
        "backToClassesBtn"
    ).addEventListener(
        "click",
        closeAttendance
    );


    editStudentInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                saveStudentEdit();

            }

        }
    );


    // ============================================
    // CLOSE MODALS BY CLICKING OUTSIDE
    // ============================================

    classModal.addEventListener(
        "click",
        function (event) {

            if (event.target === classModal) {

                closeClassModal();

            }

        }
    );


    editStudentModal.addEventListener(
        "click",
        function (event) {

            if (event.target === editStudentModal) {

                closeEditModal();

            }

        }
    );


    heroOverlay.addEventListener(
        "click",
        function () {

            closeHeroAnimation();

        }
    );


    // ============================================
    // ESCAPE KEY
    // ============================================

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                closeClassModal();

                closeEditModal();

                closeHeroAnimation();

            }

        }
    );

});
var closeAttendanceModal =
    document.getElementById("closeAttendanceModal");

closeAttendanceModal.addEventListener(
    "click",
    function () {

        document
            .getElementById("attendanceModal")
            .classList.add("hidden");

    }
);
// ================================
// BACKUP MY DATA
// ================================

var exportDataBtn =
    document.getElementById("exportDataBtn");

if (exportDataBtn) {

    exportDataBtn.addEventListener(
        "click",
        function () {

            var savedData =
            localStorage.getItem("heroAttendanceData");
        
        if (!savedData) {
        
            alert("There is no data to backup yet.");
        
            return;
        
        }
        
        var dataString = savedData;

            var blob =
                new Blob(
                    [dataString],
                    {
                        type: "application/json"
                    }
                );

            var url =
                URL.createObjectURL(blob);

            var link =
                document.createElement("a");

            link.href = url;

            link.download =
                "superhero-classroom-backup.json";

            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);

            URL.revokeObjectURL(url);

        }
    );

}
console.log("BACKUP TEST");
// ================================
// RESTORE MY DATA
// ================================

var importDataBtn =
    document.getElementById("importDataBtn");

var importDataInput =
    document.getElementById("importDataInput");
    if (importDataBtn && importDataInput) {

        importDataBtn.addEventListener(
            "click",
            function () {
    
                importDataInput.click();
    
            }
        );
    
    }
    if (importDataInput) {

        importDataInput.addEventListener(
            "change",
            function (event) {
    
                var file =
                    event.target.files[0];
    
                if (!file) {
                    return;
                }
    
                var reader =
                    new FileReader();
    
                reader.onload =
                    function (e) {
    
                        try {
    
                            var backupData =
                                JSON.parse(e.target.result);
    
                            if (!backupData.classes) {
    
                                alert(
                                    "❌ This backup file is not compatible."
                                );
    
                                return;
                            }
    
                            var confirmRestore =
                                confirm(
                                    "⚠️ Restore this backup?\n\n" +
                                    "Your current data will be replaced by this backup."
                                );
    
                            if (!confirmRestore) {
    
                                return;
    
                            }
    
                            appData = backupData;
    
                            localStorage.setItem(
                                "heroAttendanceData",
                                JSON.stringify(appData)
                            );
    
                            alert(
                                "✅ Your data has been restored successfully!"
                            );
    
                            location.reload();
    
                        } catch (error) {

                            console.error(
                                "RESTORE ERROR:",
                                error
                            );
                        
                            alert(
                                "❌ Restore failed. Check the Console for the exact error."
                            );
                        
                        }
    
                    };
    
                reader.readAsText(file);
    
            }
        );
    
    }
    
    