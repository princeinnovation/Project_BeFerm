const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        themeIcon.textContent = "☀️";
        localStorage.setItem("befarm-theme", "dark");
    }
    else {
        themeIcon.textContent = "🌙";
        localStorage.setItem("befarm-theme", "light");
    }
});
window.addEventListener("DOMContentLoaded", function () {
    
    const savedTheme = localStorage.getItem("befarm-theme");
  
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        themeIcon.textContent = "☀️";
    }
});
// MOBILE HAMBURGER MENU

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

if (hamburger) {
    hamburger.addEventListener("click", function () {
        navLinks.classList.toggle("active");
 
        hamburger.classList.toggle("active");
    });
    const navLinkItems = document.querySelectorAll(".nav-links a");
    
    navLinkItems.forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("active");
            hamburger.classList.remove("active");
        });
    });
}


//  LOGIN TABS 

const tabButtons = document.querySelectorAll(".tab-btn");
const loginForms = document.querySelectorAll(".login-form");

tabButtons.forEach(function (button) {
    button.addEventListener("click", function () {
            const targetTab = this.getAttribute("data-tab");     // Get which tab was clicked
           tabButtons.forEach(function (btn)   // Remove "active" from ALL tab buttons
        { 
            btn.classList.remove("active");
        });
              
        this.classList.add("active");      // Add "active" to clicked button only
     
        loginForms.forEach(function (form)    // Hide ALL forms
        {
            form.classList.remove("active");
        });
        
       
        const targetForm = document.getElementById(targetTab + "-form");      // Show the matching form       
        if (targetForm) {
            targetForm.classList.add("active");
        }
    });
});


//  FORM SUBMISION HANDLING 

const allForms = document.querySelectorAll(".login-form");

allForms.forEach(function (form) {
    form.addEventListener("submit", function (event) {        
        event.preventDefault();      
        const formId = this.id;     // Get the form's id to know which form was submitted     
        let userType = "";
        
        if (formId === "farmer-form") {
            userType = "Farmer";
        } else if (formId === "admin-form") {
            userType = "Admin";
        } else if (formId === "operator-form") {
            userType = "Operator";
        }
        alert("Login clicked for: " + userType + "\n\nThis is a demo. Backend not connected yet.");
    });
});


// NAVBAR SCROLL EFFECT 
window.addEventListener("scroll", function () {
    
    const navbar = document.getElementById("navbar");
    
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = "var(--shadow-md)";
        } else {
            navbar.style.boxShadow = "none";
        }
    }
});


// OTP BOTON HANDLER 
const otpButtons = document.querySelectorAll(".otp-btn");

otpButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {        
        this.textContent = "OTP Sent ✓";
        this.style.background = "var(--primary-green)";
        this.style.color = "white";
        this.disabled = true;       
        const button = this;     // Re-enable after 30 seconds (simulate cooldown)
              
        let countdown = 30;
        
        const timer = setInterval(function () {
            countdown--;
            button.textContent = "Resend in " + countdown + "s";
            
            if (countdown <= 0) {
                clearInterval(timer);
                button.textContent = "Resend OTP";
                button.style.background = "transparent";
                button.style.color = "var(--primary-green)";
                button.disabled = false;
            }
        }, 1000);
    });
});





let currentStep = 1;

function nextStep(stepNumber) {
    if (currentStep === 1) {
        const name = document.getElementById("reg-name").value.trim();
        const phone = document.getElementById("reg-phone").value.trim();
        const language = document.getElementById("reg-language").value;
        
        if (!name || !phone || !language) {
            alert("Please fill all mandatory fields (Name, Phone, Language)");
            return;
        }
        
        if (phone.length !== 10) {
            alert("Mobile number must be exactly 10 digits");
            return;
        }
    }
    
    if (currentStep === 2) {
        const state = document.getElementById("reg-state").value;
        const district = document.getElementById("reg-district").value;
        const tehsil = document.getElementById("reg-tehsil").value;
        const pincode = document.getElementById("reg-pincode").value.trim();
        
        if (!state || !district || !tehsil || !pincode) {
            alert("Please fill all mandatory location fields");
            return;
        }
    }
    
    document.getElementById("step-" + currentStep).classList.remove("active");

    document.getElementById("progress-" + currentStep).classList.remove("active");
    document.getElementById("progress-" + currentStep).classList.add("completed");
    document.getElementById("progress-" + currentStep).querySelector(".step-circle").textContent = "✓";

    if (currentStep < 3) {
        document.getElementById("line-" + currentStep).classList.add("active");
    }
    
    currentStep = stepNumber;
    document.getElementById("step-" + currentStep).classList.add("active");
    document.getElementById("progress-" + currentStep).classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function prevStep(stepNumber) {
    document.getElementById("step-" + currentStep).classList.remove("active");
    document.getElementById("progress-" + currentStep).classList.remove("active");
    document.getElementById("progress-" + stepNumber).classList.remove("completed");
    document.getElementById("progress-" + stepNumber).classList.add("active");
    document.getElementById("progress-" + stepNumber).querySelector(".step-circle").textContent = stepNumber;
    if (stepNumber < 3) {
        document.getElementById("line-" + stepNumber).classList.remove("active");
    }
    currentStep = stepNumber;
    document.getElementById("step-" + currentStep).classList.add("active");
    
    window.scrollTo({ top: 0, behavior: "smooth" });
}
const locationData = {
    "up": {
        name: "Uttar Pradesh",
        districts: {
            "lucknow": {
                name: "Lucknow",
                tehsils: ["A", "B", "C", "D"]
            },
            "kanpur": {
                name: "Kanpur",
                tehsils: ["A", "B", "C"]
            },
            "agra": {
                name: "Agra",
                tehsils: ["A", "B", "C", "D"]
            },
            "varanasi": {
                name: "Varanasi",
                tehsils: ["ABBSD"]
            }
        }
    },
    "mp": {
        name: "Madhya Pradesh",
        districts: {
            "bhopal": {
                name: "Bhopal",
                tehsils: ["A"]
            },
            "indore": {
                name: "Indore",
                tehsils: ["A"]
            },
            "jabalpur": {
                name: "Jabalpur",
                tehsils: ["A"]
            }
        }
    },
    "mh": {
        name: "Maharashtra",
        districts: {
            "mumbai": {
                name: "Mumbai",
                tehsils: ["A"]
            },
            "pune": {
                name: "Pune",
                tehsils: ["Haveli"]
            },
            "nagpur": {
                name: "Nagpur",
                tehsils: ["Nagpur Rural"]
            }
        }
    },
    "pb": {
        name: "Punjab",
        districts: {
            "ludhiana": {
                name: "Ludhiana",
                tehsils: ["Ludhiana"]
            },
            "amritsar": {
                name: "Amritsar",
                tehsils: ["Amritsar Central"]
            }
        }
    },
    "hr": {
        name: "Haryana",
        districts: {
            "karnal": {
                name: "Karnal",
                tehsils: ["Karnal", "Assandh", "Indri"]
            },
            "hisar": {
                name: "Hisar",
                tehsils: ["Hisar", "Hansi", "Narnaund"]
            }
        }
    },
    "rj": {
        name: "Rajasthan",
        districts: {
            "jaipur": {
                name: "Jaipur",
                tehsils: ["A",]
            },
            "jodhpur": {
                name: "Jodhpur",
                tehsils: ["Jodhpur"]
            }
        }
    },
    "dl": {
        name: "Delhi",
        districts: {
            "new-delhi": {
                name: "New Delhi",
                tehsils: ["A"]
            },
            "north-delhi": {
                name: "North Delhi",
                tehsils: ["A"]
            }
        }
    }
};


function updateDistricts() {
    
    const stateSelect = document.getElementById("reg-state");
    const districtSelect = document.getElementById("reg-district");
    const tehsilSelect = document.getElementById("reg-tehsil");
    
    const selectedState = stateSelect.value;
    districtSelect.innerHTML = '<option value="">-- Select District --</option>';
    tehsilSelect.innerHTML = '<option value="">-- Select Block/Tehsil --</option>';
    document.getElementById("village-group").style.display = "none";
    
    if (!selectedState || !locationData[selectedState]) {
        return;
    }
    
    const districts = locationData[selectedState].districts;
    for (const key in districts) {
        const option = document.createElement("option");
        option.value = key;
        
        option.textContent = districts[key].name;
        
        districtSelect.appendChild(option);
    }
}


function updateTehsils() {
    const stateSelect = document.getElementById("reg-state");
    const districtSelect = document.getElementById("reg-district");
    const tehsilSelect = document.getElementById("reg-tehsil");
    
    const selectedState = stateSelect.value;
    const selectedDistrict = districtSelect.value;
    
    tehsilSelect.innerHTML = '<option value="">-- Select Block/Tehsil --</option>';
    
    if (!selectedState || !selectedDistrict) return;
    
    const tehsils = locationData[selectedState].districts[selectedDistrict].tehsils;
    tehsils.forEach(function (tehsil) {
        const option = document.createElement("option");
        option.value = tehsil.toLowerCase().replace(/\s+/g, "-");
        option.textContent = tehsil;
        tehsilSelect.appendChild(option);
    });
}


// VILLAGE TOGGLE

function toggleVillage() {
    const areaType = document.querySelector('input[name="area-type"]:checked');
    
    const villageGroup = document.getElementById("village-group");
    
    if (areaType && areaType.value === "rural") {
        villageGroup.style.display = "block";
        const villageSelect = document.getElementById("reg-village");
        villageSelect.innerHTML = '<option value="">-- Select Village --</option>';
        
        const sampleVillages = [
            "Rampur", "Shivpur", "Gopalpur", "Krishna Nagar"
        ];
        sampleVillages.forEach(function (village) {
            const option = document.createElement("option");
            option.value = village.toLowerCase();
            option.textContent = village;
            villageSelect.appendChild(option);
        });
        
    } else {
        villageGroup.style.display = "none";
    }
}


//REGISTRATION FORM SUBMISSION

const regForm = document.getElementById("registration-form");

if (regForm) {
    regForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const landStatus = document.querySelector('input[name="land-status"]:checked');
        if (!landStatus) {
            alert("Please select your land ownership status");
            return;
        }
        const farmerId = generateFarmerId();
        document.getElementById("generated-farmer-id").textContent = farmerId;
        document.getElementById("step-3").classList.remove("active");
        document.getElementById("progress-3").classList.remove("active");
        document.getElementById("progress-3").classList.add("completed");
        document.getElementById("progress-3").querySelector(".step-circle").textContent = "✓";
        document.getElementById("line-2").classList.add("active");
        document.getElementById("step-success").classList.add("active");
        
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

function generateFarmerId() {
    
    const year = new Date().getFullYear();
    
    const randomNum = Math.floor(Math.random()) ;
}    
