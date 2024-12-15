function prefillDropdown() {
    const currentCategory = window.location.pathname.split("/")[2]; // Get category from URL
    const dropdown = document.querySelector(".filter-dropdown");
    dropdown.value = currentCategory || "all"; // Default to "all" if no category is provided
}

function handleDropdownChange() {
    const dropdown = document.querySelector(".filter-dropdown");
    dropdown.addEventListener("change", () => {
        const selectedCategory = dropdown.value;
        window.location.href = `/profile_list/${selectedCategory}`;
    });
}

document.addEventListener("DOMContentLoaded", function () {
    prefillDropdown();
    handleDropdownChange();
    
    const profilesPerPage = 6; 
    let currentPage = 1;
    let filteredProfiles = [];
    let allProfiles = [];  

    let category = window.location.pathname.split("/").pop();
    
    fetch("/static/questionnaire_data.json")
      .then((response) => response.json())
      .then((data) => {
        allProfiles = data;
        if (category === "all") {
            filteredProfiles = allProfiles
        } else {
            filteredProfiles = allProfiles.filter(
                (profile) => profile.category.toLowerCase() === category
            );
        }
        renderProfiles();
      })
      .catch((error) => console.error("Error loading profiles:", error));
  
    const filterDropdown = document.querySelector(".filter-dropdown");
    filterDropdown.addEventListener("change", function () {
      updateUrl(selectedCategory);
    });
  
    const backwardButton = document.querySelector(".btn-backward");
    const forwardButton = document.querySelector(".btn-forward");
  
    backwardButton.addEventListener("click", function () {
      if (currentPage > 1) {
        currentPage--;
        renderProfiles();
      }
    });
  
    forwardButton.addEventListener("click", function () {
      if (currentPage * profilesPerPage < filteredProfiles.length) {
        currentPage++;
        renderProfiles();
      }
    });
  
    function renderProfiles() {
      const start = (currentPage - 1) * profilesPerPage;
      const end = Math.min(start + profilesPerPage, filteredProfiles.length);
      const profilesToDisplay = filteredProfiles.slice(start, end);

      const boxes = document.querySelectorAll('.box2');
  
      profilesToDisplay.forEach((profile, index) => {
        const box = boxes[index];
        box.innerHTML = `
            <p class="name"><b>${profile.working_area}</b></p>
            <div class="profile-card">
              <div class="icon-text"><i class="fas fa-user icon-large"></i> <span>${profile.name}</span></div>
              <div class="icon-text"><i class="fas fa-briefcase icon-large"></i> <span>${profile.current_job}</span></div>
              <div class="icon-text"><i class="fas fa-book icon-large"></i> <span>${profile.major}</span></div>
            </div>
        `;
        box.classList.remove("hidden");
        box.addEventListener("click", () => {
            window.location.href = `/profile/${profile.id}`;
        });
      });

      for (let i = profilesToDisplay.length; i < boxes.length; i++) {
        const box = boxes[i];
        boxes[i].innerHTML = "";
        box.classList.add('hidden');
    }
      updateNavigationButtons();
    }
  
    function updateNavigationButtons() {
      backwardButton.disabled = currentPage === 1;
      forwardButton.disabled = currentPage * profilesPerPage >= filteredProfiles.length;
    }
  
    function updateUrl(category) {
      const newUrl = category ? `/profile_list/${category}` : "/profile_list/all";
      history.pushState(null, "", newUrl);
    }
  
    const backButton = document.querySelector(".btn");
    backButton.addEventListener("click", function () {
      window.location.href = "/career-categories";
    });
  });