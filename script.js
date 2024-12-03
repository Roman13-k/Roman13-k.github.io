document.addEventListener("DOMContentLoaded", () => {
  const counter = document.getElementById("counter");
  const incrementButton = document.getElementById("increment");
  const animationContainer = document.getElementById("animation-container");
  let rez = 0;
  let cout = 1;

  incrementButton.addEventListener("click", (e) => {
    const numberElement = document.createElement("div");
    numberElement.textContent = "+" + cout;
    numberElement.classList.add("cliker__number");

    const rect = animationContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    numberElement.style.left = `${x}px`;
    numberElement.style.top = `${y}px`;

    animationContainer.appendChild(numberElement);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        numberElement.classList.add("hidden");
      });
    });

    setTimeout(() => {
      animationContainer.removeChild(numberElement);
    }, 1000);

    rez += cout;
    if (rez < 5e5) counter.textContent = rez;
    else counter.textContent = (rez / 1e6).toFixed(2) + "млн.";
  });

  const upgrades = [
    { elementId: "upper1", increment: 1, cost: 150 },
    { elementId: "upper5", increment: 5, cost: 500 },
    { elementId: "upper20", increment: 20, cost: 1700 },
    { elementId: "upper100", increment: 100, cost: 8000 },
  ];

  upgrades.forEach((upgrade) => {
    const button = document.getElementById(upgrade.elementId);
    button.addEventListener("click", () => {
      if (rez >= upgrade.cost) {
        cout += upgrade.increment;
        rez -= upgrade.cost;
      } else alert("Кликай больше салага");
      if (rez < 5e5) counter.textContent = rez;
      else counter.textContent = (rez / 1e6).toFixed(2) + "млн.";
    });
  });

  const mBusiness = [
    {
      monkey: "Ваш М-бизнес: новичок(0 кл/сек)",
      income: 0,
      business: "Улучшить М-бизнес: 1000кл.",
      cost: 1000,
    },
    {
      monkey: "Ваш М-бизнес: обезьянья подмога(1 кл/сек)",
      income: 1,
      business: "Улучшить М-бизнес: 2500кл.",
      cost: 2500,
    },
    {
      monkey: "Ваш М-бизнес: банановый бизнес(3 кл/сек)",
      income: 3,
      business: "Улучшить М-бизнес: 9000кл.",
      cost: 9000,
    },
    {
      monkey: "Ваш М-бизнес: горилла-бар(10 кл/сек)",
      income: 10,
      business: "Улучшить М-бизнес: 60000кл.",
      cost: 60000,
    },
    {
      monkey: "Ваш М-бизнес: обезьяний кибер клуб(50 кл/сек)",
      income: 50,
      business: "Макс. уровень бизнеса",
      cost: 0,
    },
  ];
  const job = document.getElementById("job__current");
  const jobButton = document.getElementById("job__promotion");
  let intrervalId;

  jobButton.addEventListener("click", () => {
    let curentIndex = mBusiness.findIndex(
      (item) => item.monkey === job.textContent,
    );
    console.log(curentIndex);

    let curentBusiness = mBusiness[curentIndex];
    if (rez >= curentBusiness.cost) {
      rez -= curentBusiness.cost;
      if (rez < 5e5) counter.textContent = rez;
      else counter.textContent = (rez / 1e6).toFixed(2) + "млн.";

      let nextBusiness = mBusiness[curentIndex + 1];

      if (intrervalId) clearInterval(intrervalId);

      if (nextBusiness) {
        job.textContent = nextBusiness.monkey;
        jobButton.textContent = nextBusiness.business;
        intrervalId = setInterval(() => {
          rez += nextBusiness.income;
          if (rez < 5e5) counter.textContent = rez;
          else counter.textContent = (rez / 1e6).toFixed(2) + "млн.";
          let currentStage = stages.find((item) => rez >= item.threshold);
          img.src = currentStage.image;
          progressBar.style.width = (rez / currentStage.final) * 100 + "%";
        }, 1000);
      } else alert("Макс. уровень");
    } else alert("Кликай больше салага");
  });

  const progressBar = document.getElementById("bar");
  const img = document.getElementById("monkey");
  const buttons = document.querySelectorAll(
    ".cliker__button, .cliker__upper, .job__button",
  );
  const stages = [
    { threshold: 500e6, image: "monkey7.png", final: 1e9 },
    { threshold: 50e6, image: "monkey6.png", final: 500e6 },
    { threshold: 5e6, image: "monkey5.png", final: 50e6 },
    { threshold: 5e5, image: "monkey4.png", final: 5e6 },
    { threshold: 50000, image: "monkey3.png", final: 5e5 },
    { threshold: 1000, image: "monkey2.png", final: 50000 },
    { threshold: 0, image: "monkey1.png", final: 1000 },
  ];

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      let currentStage = stages.find((item) => rez >= item.threshold);
      img.src = currentStage.image;
      if (rez <= stages[0].final)
        progressBar.style.width = (rez / currentStage.final) * 100 + "%";
    });
  });
});
