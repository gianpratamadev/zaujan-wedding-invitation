(function () {
  const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;

  //I'm adding this section so I don't have to keep updating this pen every year :-)
  //remove this if you don't need it
  let today = new Date(),
    dd = String(today.getDate()).padStart(2, "0"),
    mm = String(today.getMonth() + 1).padStart(2, "0"),
    yyyy = today.getFullYear(),
    nextYear = yyyy + 1,
    dayMonth = "11/12/",
    birthday = dayMonth + yyyy;

  today = mm + "/" + dd + "/" + yyyy;
  //if (today > birthday) {
  //  birthday = dayMonth + nextYear;
  //}
  //end

  const countDown = new Date(birthday).getTime(),
    x = setInterval(function () {
      const now = new Date().getTime(),
        distance = countDown - now;

      (document.getElementById("days").innerText = Math.floor(distance / day)),
        (document.getElementById("hours").innerText = Math.floor(
          (distance % day) / hour
        )),
        (document.getElementById("minutes").innerText = Math.floor(
          (distance % hour) / minute
        )),
        (document.getElementById("seconds").innerText = Math.floor(
          (distance % minute) / second
        ));

      //do something later when date is reached
      if (distance < 0) {
        document.getElementById("headline").innerText = "It's our wedding day!";
        document.getElementById("countdown").style.display = "none";
        document.getElementById("content").style.display = "block";
        clearInterval(x);
      }
      //seconds
    }, 0);
})();

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4nYOvPwPpL6QzOOpsIMT6qRZgtM4CG2M",
  authDomain: "comment-zaujan-130891.firebaseapp.com",
  projectId: "comment-zaujan-130891",
  storageBucket: "comment-zaujan-130891.appspot.com",
  messagingSenderId: "1050319672349",
  appId: "1:1050319672349:web:41448e6b2801d87a9122f4",
  measurementId: "G-0HQZZ0PD6R",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

import {
  getDatabase,
  ref,
  get,
  set,
  child,
  update,
  remove,
} from "https://www.gstatic.com/firebasejs/9.1.2/firebase-database.js";

const db = getDatabase();

//------------------ References -------------------

var nameBox = document.getElementById("nameBox");
var commentBox = document.getElementById("commentBox");
var submitBtn = document.getElementById("submit");

// -------- Function insert data ------------------
function InsertData() {
  nameBox.value == ""
    ? alert("Kolom nama tidak boleh dikosongkan")
    : commentBox.value == ""
    ? alert("Kolom komentar tidak boleh dikosongkan")
    : set(ref(db, nameBox.value), {
        userName: nameBox.value,
        userComment: commentBox.value,
      })
        .then(() => {
          alert("Pesan berhasil dikirim");
          nameBox.value = "";
          commentBox.value = "";
        })
        .catch((error) => {
          alert("Pesan gagal dikirim... " + error);
        });
}

//-------- Select Data Function ------------------

function SelectData() {
  const dbref = ref(db);

  get(child(dbref, nameBox.value))
    .then((snapshot) => {
      if (snapshot.exist()) {
        nameBox.value = snapshot.val().userName;
        commentBox.value = snapshot.val().userComment;
      } else {
        alert("No data found.");
      }
    })
    .catch((error) => {
      alert("unsuccessful " + error);
    });
}

/*
//-------- Update Data Function ------------------

function SelectData() {
  const dbref = ref(db);

  update(ref(db, nameBox.value), {
    userComment: commentBox.value,
  })
    .then(() => {
      alert("Pesan berhasil diupdate");
      nameBox.value = "";
      commentBox.value = "";
    })
    .catch((error) => {
      alert("Pesan gagal dikirim... " + error);
    });
}

//-------- Remove Data Function ------------------

function DeleteData() {
  const dbref = ref(db);

  remove(ref(db, nameBox.value), {})
    .then(() => {
      alert("Pesan berhasil dihapus");
    })
    .catch((error) => {
      alert("Pesan gagal dihapus... " + error);
    });
}
*/

submitBtn.addEventListener("click", InsertData);
