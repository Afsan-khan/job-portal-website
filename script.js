const jobs = [
  {title:"Frontend Developer",company:"TechNova Solutions",location:"Noida, India",type:"Full Time",experience:"Entry",salary:"₹4–7 LPA",category:"Technology",logo:"TN"},
  {title:"React Developer Intern",company:"CodeCraft Labs",location:"Remote",type:"Internship",experience:"Entry",salary:"₹15K/month",category:"Technology",logo:"CC"},
  {title:"UI/UX Designer",company:"PixelWorks",location:"Bengaluru, India",type:"Full Time",experience:"Mid",salary:"₹6–10 LPA",category:"Design",logo:"PW"},
  {title:"Digital Marketing Executive",company:"GrowthBox",location:"Delhi, India",type:"Full Time",experience:"Entry",salary:"₹3–5 LPA",category:"Marketing",logo:"GB"},
  {title:"Software Engineer",company:"CloudPeak",location:"Pune, India",type:"Remote",experience:"Senior",salary:"₹12–18 LPA",category:"Technology",logo:"CP"},
  {title:"Finance Analyst",company:"FinEdge",location:"Mumbai, India",type:"Part Time",experience:"Mid",salary:"₹5–8 LPA",category:"Finance",logo:"FE"}
];

const jobsGrid = document.getElementById("jobsGrid");
const resultCount = document.getElementById("resultCount");
const noResults = document.getElementById("noResults");
const searchForm = document.getElementById("searchForm");
const keywordInput = document.getElementById("keywordInput");
const locationInput = document.getElementById("locationInput");
const experienceFilter = document.getElementById("experienceFilter");
const sortSelect = document.getElementById("sortSelect");

function renderJobs(list = jobs) {
  jobsGrid.innerHTML = "";
  resultCount.textContent = `${list.length} job${list.length !== 1 ? "s" : ""} found`;
  noResults.style.display = list.length ? "none" : "block";

  list.forEach((job, index) => {
    const card = document.createElement("article");
    card.className = "job-card";
    card.innerHTML = `
      <div class="company-row">
        <div class="company-logo">${job.logo}</div>
        <button class="save-btn" data-index="${jobs.indexOf(job)}" aria-label="Save job">☆</button>
      </div>
      <h3>${job.title}</h3>
      <p class="company">${job.company}</p>
      <div class="job-meta">
        <span>📍 ${job.location}</span>
        <span>💼 ${job.type}</span>
        <span>⭐ ${job.experience}</span>
      </div>
      <div class="job-bottom">
        <span class="salary">${job.salary}</span>
        <button class="apply-btn" data-title="${job.title}">Apply Now</button>
      </div>
    `;
    jobsGrid.appendChild(card);
  });

  document.querySelectorAll(".save-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("saved");
      btn.textContent = btn.classList.contains("saved") ? "★" : "☆";
    });
  });

  document.querySelectorAll(".apply-btn").forEach(btn => {
    btn.addEventListener("click", () => openModal(`Apply for ${btn.dataset.title}`));
  });
}

function getFilteredJobs() {
  const keyword = keywordInput.value.toLowerCase().trim();
  const location = locationInput.value.toLowerCase().trim();
  const selectedTypes = [...document.querySelectorAll(".type-filter:checked")].map(x => x.value);
  const experience = experienceFilter.value;

  let filtered = jobs.filter(job => {
    const matchesKeyword = !keyword || `${job.title} ${job.company} ${job.category}`.toLowerCase().includes(keyword);
    const matchesLocation = !location || job.location.toLowerCase().includes(location);
    const matchesType = !selectedTypes.length || selectedTypes.includes(job.type);
    const matchesExperience = experience === "all" || job.experience === experience;
    return matchesKeyword && matchesLocation && matchesType && matchesExperience;
  });

  if (sortSelect.value === "salary") {
    filtered.sort((a,b) => parseFloat(b.salary.replace(/[^0-9.]/g,"")) - parseFloat(a.salary.replace(/[^0-9.]/g,"")));
  }
  return filtered;
}

function updateJobs() {
  renderJobs(getFilteredJobs());
}

searchForm.addEventListener("submit", e => {
  e.preventDefault();
  updateJobs();
  document.getElementById("jobs").scrollIntoView({behavior:"smooth"});
});

document.querySelectorAll(".type-filter").forEach(x => x.addEventListener("change", updateJobs));
experienceFilter.addEventListener("change", updateJobs);
sortSelect.addEventListener("change", updateJobs);

document.getElementById("clearFilters").addEventListener("click", () => {
  keywordInput.value = "";
  locationInput.value = "";
  experienceFilter.value = "all";
  document.querySelectorAll(".type-filter").forEach(x => x.checked = false);
  sortSelect.value = "default";
  updateJobs();
});

document.querySelectorAll(".tag-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    keywordInput.value = btn.textContent;
    updateJobs();
    document.getElementById("jobs").scrollIntoView({behavior:"smooth"});
  });
});

document.querySelectorAll(".category-card").forEach(btn => {
  btn.addEventListener("click", () => {
    keywordInput.value = btn.dataset.category;
    updateJobs();
    document.getElementById("jobs").scrollIntoView({behavior:"smooth"});
  });
});

document.getElementById("viewAllBtn").addEventListener("click", () => {
  keywordInput.value = "";
  locationInput.value = "";
  updateJobs();
});

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");

function openModal(title) {
  modalTitle.textContent = title;
  modal.classList.remove("hidden");
}
function closeModal() {
  modal.classList.add("hidden");
}
document.getElementById("loginBtn").addEventListener("click", () => openModal("Login to JobHub"));
document.getElementById("createProfileBtn").addEventListener("click", () => openModal("Create your JobHub Profile"));
document.getElementById("closeModal").addEventListener("click", closeModal);
document.getElementById("modal").addEventListener("click", e => {
  if (e.target === modal) closeModal();
});
document.getElementById("modalAction").addEventListener("click", () => {
  alert("Demo action completed! Connect this form to a backend for real authentication.");
  closeModal();
});

document.getElementById("menuBtn").addEventListener("click", () => {
  document.getElementById("navLinks").classList.toggle("open");
});

renderJobs();
