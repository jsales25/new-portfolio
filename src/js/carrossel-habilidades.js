const carrosselHabilidades = document.querySelector(
  "[data-carrossel-habilidades]",
);

if (carrosselHabilidades) {
  // Seleciona os elementos principais do carrossel.
  const track = carrosselHabilidades.querySelector(".carrossel-track");
  const viewport = carrosselHabilidades.querySelector(".carrossel-viewport");
  const prevButton = carrosselHabilidades.querySelector(
    ".carrossel-botao-anterior",
  );
  const nextButton = carrosselHabilidades.querySelector(
    ".carrossel-botao-proximo",
  );
  const indicatorsContainer = carrosselHabilidades.querySelector(
    ".carrossel-indicadores",
  );
  const cards = Array.from(track.children);

  let cardsPerPage = 3;
  let currentPage = 0;
  let totalPages = 1;

  const getCardsPerPage = () => {
    const larguraTela = window.innerWidth;

    if (larguraTela >= 1024) {
      return 3;
    }

    if (larguraTela >= 768) {
      return 2;
    }

    return 1;
  };

  const atualizarLayout = () => {
    cardsPerPage = getCardsPerPage();
    track.style.setProperty("--cards-per-page", cardsPerPage);

    totalPages = Math.max(1, Math.ceil(cards.length / cardsPerPage));

    if (currentPage >= totalPages) {
      currentPage = totalPages - 1;
    }

    renderizarIndicadores();
    atualizarPosicao();
    atualizarControles();
  };

  const atualizarPosicao = () => {
    const deslocamento = viewport.clientWidth * currentPage;
    track.style.transform = `translateX(-${deslocamento}px)`;
  };

  const atualizarControles = () => {
    prevButton.disabled = currentPage === 0;
    nextButton.disabled = currentPage === totalPages - 1;
  };

  const renderizarIndicadores = () => {
    indicatorsContainer.innerHTML = "";

    for (let index = 0; index < totalPages; index += 1) {
      const indicador = document.createElement("button");
      indicador.type = "button";
      indicador.className = `carrossel-indicador${index === currentPage ? " ativo" : ""}`;
      indicador.setAttribute(
        "aria-label",
        `Ir para a página ${index + 1} de habilidades`,
      );
      indicador.setAttribute(
        "aria-current",
        index === currentPage ? "true" : "false",
      );
      indicador.addEventListener("click", () => irParaPagina(index));
      indicatorsContainer.appendChild(indicador);
    }
  };

  const irParaPagina = (pagina) => {
    currentPage = Math.max(0, Math.min(pagina, totalPages - 1));
    atualizarPosicao();
    renderizarIndicadores();
    atualizarControles();
  };

  prevButton.addEventListener("click", () => irParaPagina(currentPage - 1));
  nextButton.addEventListener("click", () => irParaPagina(currentPage + 1));

  carrosselHabilidades.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      irParaPagina(currentPage - 1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      irParaPagina(currentPage + 1);
    }
  });

  window.addEventListener("resize", atualizarLayout);

  window.addEventListener("load", atualizarLayout);
  atualizarLayout();
}
