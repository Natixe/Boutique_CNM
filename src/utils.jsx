let lastReloadTime = 0;
const RELOAD_INTERVAL = 5000; // 5 secondes pour prévenir les boucles infinies

export const reloadMainPage = (navigate) => {
  const now = Date.now();

  if (now - lastReloadTime > RELOAD_INTERVAL) {
    lastReloadTime = now;
    navigate('/');
    navigate(0); // Recharger complètement la page principale
  } else {
    console.warn('Tentative de rechargement trop fréquente.');
  }
};
