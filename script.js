document.addEventListener("DOMContentLoaded", () => {
  const steps = document.querySelectorAll(".step");
  const formSteps = document.querySelectorAll(".form-step");
  const nextButtons = document.querySelectorAll(".next-btn");
  const prevButtons = document.querySelectorAll(".prev-btn");
  const dragArea = document.getElementById("dragArea");
  const fileInput = document.getElementById("fileInput");
  const filePreview = document.getElementById("filePreview");

  let currentStep = 1;

  const updateSteps = () => {
    steps.forEach((step, index) => {
      step.classList.toggle("active", index + 1 === currentStep);
    });
    formSteps.forEach((formStep) => {
      formStep.classList.toggle("active", parseInt(formStep.dataset.step) === currentStep);
    });
  };

  nextButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      currentStep++;
      updateSteps();
    });
  });

  prevButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      currentStep--;
      updateSteps();
    });
  });

  dragArea.addEventListener("click", () => fileInput.click());

  dragArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dragArea.classList.add("hover");
  });

  dragArea.addEventListener("dragleave", () => dragArea.classList.remove("hover"));

  dragArea.addEventListener("drop", (e) => {
    e.preventDefault();
    dragArea.classList.remove("hover");
    handleFiles(e.dataTransfer.files);
  });

  fileInput.addEventListener("change", (e) => {
    handleFiles(e.target.files);
  });

  const handleFiles = (files) => {
    filePreview.innerHTML = Array.from(files)
      .map((file) => `<p>${file.name}</p>`)
      .join("");
  };
});
