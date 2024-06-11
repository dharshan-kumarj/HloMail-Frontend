function toggleSidebar(side) {
  var sidebar = document.querySelector(`.sidebar.${side}-sidebar`);
  sidebar.classList.toggle("show");
}
function handleResize() {
  const right_sidebar = document.querySelector(".right-sidebar");
  const left_sidebar = document.querySelector(".left-sidebar");
  if (window.innerWidth >= 992) {
    right_sidebar.classList.add("show");
    left_sidebar.classList.add("show");
  } else {
    right_sidebar.classList.remove("show");
    left_sidebar.classList.remove("show");
  }
}

// Run on initial load
handleResize();

// Add event listener for window resize
window.addEventListener("resize", handleResize);

const ctx = document.getElementById("myChart").getContext("2d");
const myChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: "purple",
        borderColor: "purple",
        borderWidth: 1,
        borderRadius: 10, // Set the border radius here
        borderSkipped: false, // To apply the border radius to all corners
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});
